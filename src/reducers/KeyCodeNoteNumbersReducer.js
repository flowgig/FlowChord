import keyCodeNoteNumbers from 'data/keyCodeNoteNumbers.json';

const initialState = keyCodeNoteNumbers;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
