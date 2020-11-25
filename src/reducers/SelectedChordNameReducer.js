import { UPDATE_SELECTED_CHORD_NAME } from 'constants/types';

const initialState = '';

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SELECTED_CHORD_NAME:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
