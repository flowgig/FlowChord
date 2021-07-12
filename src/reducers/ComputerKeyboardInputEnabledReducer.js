import { UPDATE_COMPUTER_KEYBOARD_INPUT_ENABLED } from 'constants/types';

const initialState = true;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COMPUTER_KEYBOARD_INPUT_ENABLED:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
