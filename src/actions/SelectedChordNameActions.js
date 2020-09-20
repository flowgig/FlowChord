import {UPDATE_SELECTED_CHORD_NAME} from 'constants/types';

export const updateSelectedChordName = selectedChordName => dispatch => {
  dispatch({type: UPDATE_SELECTED_CHORD_NAME, payload: selectedChordName})
}
