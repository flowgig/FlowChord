import { UPDATE_TUNER_NUMBER } from 'constants/types';
import guitarTuners from 'data/guitar-tuners.json';

const initialState = guitarTuners;

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_TUNER_NUMBER:
			return action.payload;
		default:
			return state;
	}
}

export default reducer;
