import selectionTypes from 'data/selection-types.json';

const initialState = selectionTypes;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
