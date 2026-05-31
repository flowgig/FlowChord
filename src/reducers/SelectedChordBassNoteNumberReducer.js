import { UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER } from 'constants/types';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
