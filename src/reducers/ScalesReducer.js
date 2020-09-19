import scales from 'data/scales.json';

const initialState = scales;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
