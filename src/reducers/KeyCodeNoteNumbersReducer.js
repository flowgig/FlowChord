import keyCodeNoteNumbers from 'data/keyCodeNoteNumbers.json';

const initialState = keyCodeNoteNumbers;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
