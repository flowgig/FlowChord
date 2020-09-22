import {UPDATE_SELECTED_CHORD_NAME} from 'constants/types';

// Helpers
import { getSelectedNoteNumbersFromNotes, noteNumbersToHalfSteps } from 'helpers/noteHelpers.js';

const sortNumber = (a,b) => {
	return a - b;
}


export const updateSelectedChordName = selectedChordName => dispatch => {
  dispatch({type: UPDATE_SELECTED_CHORD_NAME, payload: selectedChordName})
}

export const updateSelectedChordNameFromNotes = (notes, selectedKeyNumber, noteSelections) => dispatch => {
  const selectedNoteNumbers = getSelectedNoteNumbersFromNotes(notes);
  let selectedHalfSteps = noteNumbersToHalfSteps(selectedNoteNumbers, selectedKeyNumber);
  selectedHalfSteps.sort(sortNumber).join(',');

  const matchedSelection = Object.keys(noteSelections).find(noteSelectionName => {
    const noteSelection = noteSelections[noteSelectionName];
    return noteSelection.parsedHalfSteps.length == selectedHalfSteps.length && noteSelection.parsedHalfSteps.every((element, index) => {
  		return element === selectedHalfSteps[index];
  	});
  });

  if (matchedSelection){
    dispatch({type: UPDATE_SELECTED_CHORD_NAME, payload: matchedSelection})
  }

}
