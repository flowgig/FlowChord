import { UPDATE_SETTINGS_GUITAR } from 'constants/types';

import settingsGuitar from 'data/settings-guitar.json';

const initialState = settingsGuitar;

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_SETTINGS_GUITAR:
			return action.payload;
		default:
			return state;
	}
}
