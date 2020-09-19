import chords from 'data/chords.json';

const initialState = chords;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
