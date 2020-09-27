import { UPDATE_SELECTED_LABEL } from 'constants/types';

const initialState = 'key';

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_SELECTED_LABEL:
			return action.payload;
		default:
			return state;
	}
}
