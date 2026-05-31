import { intervals } from '@benjamindehli/music-utils';

const initialState = Object.fromEntries(intervals.map(i => [i.number, i.name]));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
