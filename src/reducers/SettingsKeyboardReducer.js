import settingsKeyboard from 'data/settings-keyboard.json';

const initialState = settingsKeyboard;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
