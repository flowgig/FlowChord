import { SELECT_NOTE, DESELECT_NOTE, RESET_SELECTED_NOTES } from 'constants/types';

export const toggleNote = (noteNumber, checked) => (dispatch, getState) => {
  const notes = getState() && getState().notes;
  let newNotes = [...notes];
  newNotes[noteNumber].selected = checked;
  dispatch({ type: checked ? SELECT_NOTE : DESELECT_NOTE, payload: newNotes });
  return newNotes;
}

export const resetSelectedNotes = () => (dispatch, getState) => {
  const newNotes = getState().notes.map(note => {
    return { ...note, selected: false }
  });
  dispatch({
    type: RESET_SELECTED_NOTES,
    payload: newNotes
  });
  return newNotes;
}