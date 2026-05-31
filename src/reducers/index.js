// Dependencies
import { combineReducers } from 'redux';

// Reducers
import AlternativeSelectionsReducer from 'reducers/AlternativeSelectionsReducer';
import ChordsReducer from 'reducers/ChordsReducer';
import ComputerKeyboardInputEnabledReducer from 'reducers/ComputerKeyboardInputEnabledReducer';
import GuitarTunersReducer from 'reducers/GuitarTunersReducer';
import IntervalsReducer from 'reducers/IntervalsReducer';
import KeyCodeNoteNumbersReducer from 'reducers/KeyCodeNoteNumbersReducer';
import LabelsReducer from 'reducers/LabelsReducer';
import NotesReducer from 'reducers/NotesReducer';
import ScalesReducer from 'reducers/ScalesReducer';
import SelectedChordBassNoteNumberReducer from 'reducers/SelectedChordBassNoteNumberReducer';
import SelectedChordNameReducer from 'reducers/SelectedChordNameReducer';
import SelectedKeyNumberReducer from 'reducers/SelectedKeyNumberReducer';
import SelectedLabelReducer from 'reducers/SelectedLabelReducer';
import SelectedScaleNameReducer from 'reducers/SelectedScaleNameReducer';
import SelectedSelectionTypeReducer from 'reducers/SelectedSelectionTypeReducer';
import SelectionTypesReducer from 'reducers/SelectionTypesReducer';
import SettingsGuitarReducer from 'reducers/SettingsGuitarReducer';
import SettingsKeyboardReducer from 'reducers/SettingsKeyboardReducer';
import SynthesizerReducer from 'reducers/SynthesizerReducer';

const reducers = routerReducer => combineReducers({
  router: routerReducer,
  alternativeSelections: AlternativeSelectionsReducer,
  chords: ChordsReducer,
  computerKeyboardInputEnabled: ComputerKeyboardInputEnabledReducer,
  guitarTuners: GuitarTunersReducer,
  intervals: IntervalsReducer,
  keyCodeNoteNumbers: KeyCodeNoteNumbersReducer,
  labels: LabelsReducer,
  notes: NotesReducer,
  scales: ScalesReducer,
  selectedChordBassNoteNumber: SelectedChordBassNoteNumberReducer,
  selectedChordName: SelectedChordNameReducer,
  selectedKeyNumber: SelectedKeyNumberReducer,
  selectedLabel: SelectedLabelReducer,
  selectedScaleName: SelectedScaleNameReducer,
  selectedSelectionType: SelectedSelectionTypeReducer,
  selectionTypes: SelectionTypesReducer,
  settingsGuitar: SettingsGuitarReducer,
  settingsKeyboard: SettingsKeyboardReducer,
  synthesizer: SynthesizerReducer
});

export default reducers;
