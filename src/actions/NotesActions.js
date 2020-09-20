import {SELECT_NOTE, DESELECT_NOTE} from 'constants/types';

export const toggleNote = (noteNumber, checked) => (dispatch, getState) => {
  const notes = getState() && getState().notes;
  let newNotes = [...notes];
  newNotes[noteNumber].selected = checked;
  dispatch({type: checked ? SELECT_NOTE : DESELECT_NOTE, payload: newNotes});
  return newNotes;
}
