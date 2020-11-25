import { UPDATE_SELECTED_SELECTION_TYPE } from 'constants/types';

const initialState = "chord";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_SELECTION_TYPE:
			return action.payload;
    default:
      return state;
  }
}

export default reducer;
