import { UPDATE_SCALES } from 'constants/types';

import scales from 'data/scales.json';

const initialState = scales;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SCALES:
			return action.payload;
    default:
      return state;
  }
}

export default reducer;
