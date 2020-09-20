import {SELECT_NOTE, DESELECT_NOTE} from 'constants/types';

import notes from 'data/notes.json';

const initialState = notes;

export default function(state = initialState, action) {
	switch(action.type) {
		case SELECT_NOTE:
			return action.payload;
    case DESELECT_NOTE:
			return action.payload;
		default:
			return state;
	}
}
