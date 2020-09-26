import labels from 'data/labels.json';

const initialState = labels;

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
