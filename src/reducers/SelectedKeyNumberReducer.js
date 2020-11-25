import { UPDATE_SELECTED_KEY_NUMBER } from 'constants/types';

const initialState = 0;

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SELECTED_KEY_NUMBER:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
