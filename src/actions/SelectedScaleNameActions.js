import {UPDATE_SELECTED_SCALE_NAME} from 'constants/types';

export const updateSelectedScaleName = selectedScaleName => dispatch => {
  dispatch({type: UPDATE_SELECTED_SCALE_NAME, payload: selectedScaleName})
}
