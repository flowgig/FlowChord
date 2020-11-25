import { UPDATE_SETTINGS_GUITAR } from 'constants/types';

import settingsGuitar from 'data/settings-guitar.json';

const initialState = settingsGuitar;

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SETTINGS_GUITAR:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
