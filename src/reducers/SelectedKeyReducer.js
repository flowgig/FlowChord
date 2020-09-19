import { UPDATE_SELECTED_KEY } from 'constants/types';

const initialState = {"number": 0,  "name": "C",  "selected": false, "interval": "", "keycolor": "white"};

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_SELECTED_KEY:
			return action.payload;
		default:
			return state;
	}
}
