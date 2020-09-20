import {UPDATE_SELECTED_KEY_NUMBER} from 'constants/types';

export const updateSelectedKeyNumber = selectedKeyNumber => dispatch => {
  dispatch({type: UPDATE_SELECTED_KEY_NUMBER, payload: selectedKeyNumber})
}
