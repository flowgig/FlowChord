import {UPDATE_SETTINGS_GUITAR} from 'constants/types';

export const updateSettingsGuitar = settingsGuitar => dispatch => {
  dispatch({type: UPDATE_SETTINGS_GUITAR, payload: settingsGuitar})
}
