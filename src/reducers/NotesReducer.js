import notes from 'data/notes.json';

const initialState = notes;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
