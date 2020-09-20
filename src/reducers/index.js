// Dependencies
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// Reducers
import ChordsReducer from 'reducers/ChordsReducer';
import GuitarTunersReducer from 'reducers/GuitarTunersReducer';
import IntervalsReducer from 'reducers/IntervalsReducer';
import NotesReducer from 'reducers/NotesReducer';
import ScalesReducer from 'reducers/ScalesReducer';
import SelectedChordNameReducer from 'reducers/SelectedChordNameReducer';
import SelectedKeyNumberReducer from 'reducers/SelectedKeyNumberReducer';
import SelectedLabelReducer from 'reducers/SelectedLabelReducer';
import SelectionTypeReducer from 'reducers/SelectionTypeReducer';
import SettingsGuitarReducer from 'reducers/SettingsGuitarReducer';
import SettingsKeyboardReducer from 'reducers/SettingsKeyboardReducer';

export default(history) => combineReducers({
  router: connectRouter(history),
  chords: ChordsReducer,
  guitarTuners: GuitarTunersReducer,
  intervals: IntervalsReducer,
  notes: NotesReducer,
  scales: ScalesReducer,
  selectedChordName: SelectedChordNameReducer,
  selectedKeyNumber: SelectedKeyNumberReducer,
  selectedLabel: SelectedLabelReducer,
  selectionType: SelectionTypeReducer,
  settingsGuitar: SettingsGuitarReducer,
  settingsKeyboard: SettingsKeyboardReducer
});
