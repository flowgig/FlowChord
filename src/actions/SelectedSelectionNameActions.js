import {
  UPDATE_SELECTED_CHORD_NAME,
	UPDATE_SELECTED_SCALE_NAME,
	UPDATE_SELECTED_KEY_NUMBER,
	UPDATE_ALTERNATIVE_SELECTIONS,
	TOGGLE_SELECTED_NOTES
} from 'constants/types';


// Helpers
import {
  getSelectedNoteNumbersFromNotes,
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

const getSelectionFromName = (selection, selectionName) => {
  return selection[selectionName];
}

const getAlternativeSelections = (single = false, notes, noteSelections, selectedKeyNumber, selectedHalfSteps) => {
  let alternativeSelections = [];
  for (var keyIndex in notes) {
    if (parseInt(keyIndex) !== selectedKeyNumber) {
      let relativeKeyIndex = keyIndex - selectedKeyNumber;
      let relativeParsedHalfSteps = selectedHalfSteps.map(parsedHalfStep => {
        let relativeParsedHalfStep = parsedHalfStep - relativeKeyIndex;
        relativeParsedHalfStep = relativeParsedHalfStep >= 0 ? relativeParsedHalfStep : relativeParsedHalfStep + 12;
        return relativeParsedHalfStep % 12;
      });
      relativeParsedHalfSteps.sort(sortNumber).join(',');
      const matchedSelection = getMatchedSelection(noteSelections, relativeParsedHalfSteps);
      if (matchedSelection) {
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


export const updateSelectedSelectionSelectList = (notes, selectedKeyNumber, selectedSelectionName, noteSelections, selectedSelectionType) => dispatch => {
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
	}
}


export const updateSelectedSelectionNameFromNotes = (notes, selectedKeyNumber, noteSelections, selectedSelectionType) => dispatch => {
  const selectedNoteNumbers = getSelectedNoteNumbersFromNotes(notes);
  let selectedHalfSteps = noteNumbersToHalfSteps(selectedNoteNumbers, selectedKeyNumber);
  selectedHalfSteps.sort(sortNumber).join(',');
  const matchedSelection = getMatchedSelection(noteSelections, selectedHalfSteps);

  if (matchedSelection) {
		const alternativeSelections = getAlternativeSelections(false, notes, noteSelections, selectedKeyNumber, selectedHalfSteps);
    dispatch({
      type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME,
      payload: matchedSelection
    });
		dispatch({
			type: UPDATE_ALTERNATIVE_SELECTIONS,
			payload: alternativeSelections
		});
  }else {
		const alternativeSelection = getAlternativeSelections(true, notes, noteSelections, selectedKeyNumber, selectedHalfSteps);
		if (alternativeSelection){
			const alternativeSelectionsToAlternativeSelection = getAlternativeSelections(false, notes, noteSelections, alternativeSelection.note.number, alternativeSelection.selection.parsedHalfSteps);
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
		}
	}
}
