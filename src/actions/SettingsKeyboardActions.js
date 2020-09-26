import {UPDATE_SETTINGS_KEYBOARD} from 'constants/types';

export const updateSettingsKeyboard = settingsKeyboard => dispatch => {
  dispatch({type: UPDATE_SETTINGS_KEYBOARD, payload: settingsKeyboard})
}
