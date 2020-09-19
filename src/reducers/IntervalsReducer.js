import intervals from 'data/intervals.json';

const initialState = intervals;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
