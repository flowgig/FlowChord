import {UPDATE_SELECTED_SELECTION_TYPE} from 'constants/types';

export const updateSelectedSelectionType = selectionType => dispatch => {
  dispatch({type: UPDATE_SELECTED_SELECTION_TYPE, payload: selectionType})
}
