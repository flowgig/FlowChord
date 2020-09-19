import {UPDATE_TUNER_NUMBER} from 'constants/types';

export const updateTunerNumber = (stringNumber, tunerNumber) => (dispatch, getState) => {
  const guitarTuners = getState() && getState().guitarTuners;
  let newGuitarTuners = [...guitarTuners];
  newGuitarTuners[stringNumber].number = tunerNumber;
  dispatch({type: UPDATE_TUNER_NUMBER, payload: newGuitarTuners})
}

export const updateGuitarTuners = guitarTuners => dispatch => {
  dispatch({type: UPDATE_TUNER_NUMBER, payload: guitarTuners})
}
