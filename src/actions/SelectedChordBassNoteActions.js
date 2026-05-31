import { UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER } from 'constants/types';

export const updateSelectedChordBassNoteNumber = bassNoteNumber => dispatch => {
  dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: bassNoteNumber });
};
