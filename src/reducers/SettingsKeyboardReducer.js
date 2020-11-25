import { UPDATE_SETTINGS_KEYBOARD } from 'constants/types';

import settingsKeyboard from 'data/settings-keyboard.json';

const initialState = settingsKeyboard;

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_SETTINGS_KEYBOARD:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
