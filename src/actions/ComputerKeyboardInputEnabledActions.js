import { UPDATE_COMPUTER_KEYBOARD_INPUT_ENABLED } from 'constants/types';

export const updateComputerKeyboardInputEnabled = enabled => dispatch => {
    dispatch({ type: UPDATE_COMPUTER_KEYBOARD_INPUT_ENABLED, payload: enabled })
}
