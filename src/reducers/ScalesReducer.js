import { scaleTypes } from '@benjamindehli/music-utils';

const initialState = Object.fromEntries(
  scaleTypes.map(st => [st.name, {
    halfSteps: st.halfSteps,
    parsedHalfSteps: st.getParsedHalfSteps()
  }])
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
