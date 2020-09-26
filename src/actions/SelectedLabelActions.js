import {UPDATE_SELECTED_LABEL} from 'constants/types';

export const updateSelectedLabel = label => dispatch => {
  dispatch({type: UPDATE_SELECTED_LABEL, payload: label})
}
