import { chordTypes } from '@benjamindehli/music-utils';

const initialState = Object.fromEntries(
  chordTypes.map(ct => [ct.name, {
    halfSteps: ct.halfSteps,
    parsedHalfSteps: ct.getParsedHalfSteps()
  }])
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
