import { UPDATE_ALTERNATIVE_SELECTIONS } from 'constants/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ALTERNATIVE_SELECTIONS:
			return action.payload;
    default:
      return state;
  }
}
