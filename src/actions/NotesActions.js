import {SELECT_NOTE, DESELECT_NOTE} from 'constants/types';

export const selectNote = noteNumber => (dispatch, getState) => {
  const notes = getState() && getState().notes;
  let newNotes = [...notes];
  newNotes[noteNumber].selected = true;
  dispatch({type: SELECT_NOTE, payload: newNotes})
}

export const deSelectNote = noteNumber => (dispatch, getState) => {
  const notes = getState() && getState().notes;
  let newNotes = [...notes];
  newNotes[noteNumber].selected = false;
  dispatch({type: DESELECT_NOTE, payload: newNotes})
}
