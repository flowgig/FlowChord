import {
  UPDATE_CHORDS,
  UPDATE_SCALES,
  UPDATE_SELECTED_CHORD_NAME,
	UPDATE_SELECTED_SCALE_NAME,
	UPDATE_SELECTED_KEY_NUMBER,
	UPDATE_ALTERNATIVE_SELECTIONS,
	TOGGLE_SELECTED_NOTES
} from 'constants/types';


// Helpers
import {
  getSelectedNoteNumbersFromNotes,
  getNoteByNoteNumber,
  noteNumbersToHalfSteps,
	halfStepsToNoteNumbers
} from 'helpers/noteHelpers.js';

const sortNumber = (a, b) => {
  return a - b;
}

const getMatchedSelection = (noteSelections, selectedHalfSteps) => {
  return Object.keys(noteSelections).find(noteSelectionName => {
    const noteSelection = noteSelections[noteSelectionName];
    return noteSelection.parsedHalfSteps.length === selectedHalfSteps.length && noteSelection.parsedHalfSteps.every((element, index) => {
      return element === selectedHalfSteps[index];
    });
  });
}

const getMatchedSelections = (noteSelections, relativeParsedHalfSteps, isSelectedKey, selectedSelectionName) => {
  return Object.keys(noteSelections).filter(noteSelectionName => {
    const noteSelection = noteSelections[noteSelectionName];
    const isEqualSelection = isSelectedKey && selectedSelectionName === noteSelectionName;
    const isMatchedSelection = noteSelection.parsedHalfSteps.length === relativeParsedHalfSteps.length && noteSelection.parsedHalfSteps.every((parsedHalfStep, index) => {
      return parsedHalfStep === relativeParsedHalfSteps[index];
    });
    const isSelectedChord = isSelectedKey && isEqualSelection;
    return isMatchedSelection && !isSelectedChord;
  });
}

const getSelectionFromName = (selection, selectionName) => {
  return selection[selectionName];
}

const getAlternativeSelections = (single = false, notes, noteSelections, selectedKeyNumber, selectedHalfSteps, selectedSelectionName) => {
  let alternativeSelections = [];
  for (var keyIndex in notes) {
    let relativeKeyIndex = keyIndex - selectedKeyNumber;
    let relativeParsedHalfSteps = selectedHalfSteps.map(parsedHalfStep => {
      let relativeParsedHalfStep = parsedHalfStep - relativeKeyIndex;
      relativeParsedHalfStep = relativeParsedHalfStep >= 0 ? relativeParsedHalfStep : relativeParsedHalfStep + 12;
      return relativeParsedHalfStep % 12;
    });
    relativeParsedHalfSteps.sort(sortNumber).join(',');
      const isSelectedKey = parseInt(keyIndex) === selectedKeyNumber
      const matchedSelections = getMatchedSelections(noteSelections, relativeParsedHalfSteps, isSelectedKey, selectedSelectionName);
      for (const matchedSelection of matchedSelections) {
        if (matchedSelections) {
          const alternativeSelection = {
            note: notes[keyIndex],
            selection: getSelectionFromName(noteSelections, matchedSelection),
            selectionName: matchedSelection
          };
          if (single) return alternativeSelection;
          else alternativeSelections.push(alternativeSelection);
        }
      }
  }
  return single ? null : alternativeSelections;
}

export const updateSelectedChordName = selectedChordName => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_CHORD_NAME,
    payload: selectedChordName
  })
}

export const updateSelectedScaleName = selectedScaleName => dispatch => {
  dispatch({type: UPDATE_SELECTED_SCALE_NAME, payload: selectedScaleName})
}

export const updateSelectedSelectionFromAlternativeSelectionList = (alternativeSelections, selectedAlternativeSelection, selectedSelectionType, prevSelectedKeyNumber, prevSelectedSelectionName, noteSelections, notes) => dispatch => {
  const prevSelection = {
    note: getNoteByNoteNumber(notes, prevSelectedKeyNumber),
    selection: getSelectionFromName(noteSelections, prevSelectedSelectionName),
    selectionName: prevSelectedSelectionName
  };

  const selectedKeyNumber = selectedAlternativeSelection.note.number;
  const selectedSelectionName = selectedAlternativeSelection.selectionName;

  let newAlternativeSelections = alternativeSelections.filter(alternativeSelection => {
    const isSelectedSelection = alternativeSelection.note.number === selectedKeyNumber && alternativeSelection.selectionName === selectedSelectionName;
    return !isSelectedSelection;
  });
  newAlternativeSelections.push(prevSelection);

	dispatch({
		type: UPDATE_SELECTED_KEY_NUMBER,
		payload: selectedKeyNumber
	});
	dispatch({
		type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
		payload: selectedSelectionName
	});
  dispatch({
    type: UPDATE_ALTERNATIVE_SELECTIONS,
    payload: newAlternativeSelections
  });
}

export const updateSelectedSelectionSelectList = (notes, selectedKeyNumber, selectedSelectionName, noteSelections, selectedSelectionType) => dispatch => {
  if (selectedSelectionName && selectedSelectionName.length){
    const halfSteps = noteSelections[selectedSelectionName].parsedHalfSteps;
  	const relativeHalfSteps = halfStepsToNoteNumbers(halfSteps, selectedKeyNumber);
  	relativeHalfSteps.sort(sortNumber).join(',');
  	const newNotes = notes.map(note => {
  		return {...note, selected: relativeHalfSteps.includes(note.number)}
  	});
  	dispatch({
  		type: TOGGLE_SELECTED_NOTES,
  		payload: newNotes
  	});

    const alternativeSelections = getAlternativeSelections(false, notes, noteSelections, selectedKeyNumber, halfSteps, selectedSelectionName);
    dispatch({
      type: UPDATE_ALTERNATIVE_SELECTIONS,
      payload: alternativeSelections
    });
  }

	if (selectedSelectionType === 'key'){
		dispatch({
			type: UPDATE_SELECTED_KEY_NUMBER,
			payload: selectedKeyNumber
		});
	}else {
		dispatch({
			type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
			payload: selectedSelectionName
		});
    if(noteSelections.custom){
      const newNoteSelections = removeCustomSelection(noteSelections);
      dispatch({
        type: selectedSelectionType === 'scale' ? UPDATE_SCALES : UPDATE_CHORDS,
        payload: newNoteSelections
      });
    }
	}
}

const addCustomSelection = (noteSelections, selectedHalfSteps) =>{
  return {
    ...noteSelections,
    custom: {
      halfSteps: selectedHalfSteps,
      parsedHalfSteps: selectedHalfSteps
    }
  };
}

const removeCustomSelection = noteSelections =>{
  if (noteSelections.custom){
      let newNoteSelections = {...noteSelections};
      delete newNoteSelections["custom"];
    	return newNoteSelections;
  }else {
    return noteSelections;
  }
}


export const updateSelectedSelectionNameFromNotes = (notes, selectedKeyNumber, noteSelections, selectedSelectionType) => dispatch => {
  const selectedNoteNumbers = getSelectedNoteNumbersFromNotes(notes);
  let selectedHalfSteps = noteNumbersToHalfSteps(selectedNoteNumbers, selectedKeyNumber);
  selectedHalfSteps.sort(sortNumber).join(',');
  const matchedSelection = getMatchedSelection(noteSelections, selectedHalfSteps);
  if (matchedSelection) {
    const selectedSelectionName = matchedSelection;
		const alternativeSelections = getAlternativeSelections(false, notes, noteSelections, selectedKeyNumber, selectedHalfSteps, selectedSelectionName);
    dispatch({
      type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
      payload: matchedSelection
    });
		dispatch({
			type: UPDATE_ALTERNATIVE_SELECTIONS,
			payload: alternativeSelections
		});
    if(noteSelections.custom){
      const newNoteSelections = removeCustomSelection(noteSelections);
      dispatch({
        type: selectedSelectionType === 'scale' ? UPDATE_SCALES : UPDATE_CHORDS,
        payload: newNoteSelections
      });
    }
  }else {
		const alternativeSelection = getAlternativeSelections(true, notes, noteSelections, selectedKeyNumber, selectedHalfSteps);
		if (alternativeSelection){
      const selectedSelectionName = alternativeSelection.selectionName;
			const alternativeSelectionsToAlternativeSelection = getAlternativeSelections(false, notes, noteSelections, alternativeSelection.note.number, alternativeSelection.selection.parsedHalfSteps, selectedSelectionName);
			dispatch({
	      type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
	      payload: alternativeSelection.selectionName
	    });
			dispatch({
	      type: UPDATE_SELECTED_KEY_NUMBER,
	      payload: alternativeSelection.note.number
	    });
			dispatch({
	      type: UPDATE_ALTERNATIVE_SELECTIONS,
	      payload: alternativeSelectionsToAlternativeSelection
	    });
      if(noteSelections.custom){
        const newNoteSelections = removeCustomSelection(noteSelections);
        dispatch({
          type: selectedSelectionType === 'scale' ? UPDATE_SCALES : UPDATE_CHORDS,
          payload: newNoteSelections
        });
      }
		} else {
      const newNoteSelections = addCustomSelection(noteSelections, selectedHalfSteps, selectedSelectionType);
      dispatch({
        type: selectedSelectionType === 'scale' ? UPDATE_SCALES : UPDATE_CHORDS,
        payload: newNoteSelections
      });
      dispatch({
	      type: UPDATE_ALTERNATIVE_SELECTIONS,
	      payload: []
	    });
      dispatch({
        type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
        payload: 'custom'
      });
    }
	}
}
