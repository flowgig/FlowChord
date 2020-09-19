import settingsGuitar from 'data/settings-guitar.json';

const initialState = settingsGuitar;

export default function(state = initialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}
