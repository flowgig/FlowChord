import {
  UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER,
  UPDATE_SELECTED_CHORD_NAME,
  UPDATE_SELECTED_SCALE_NAME,
  UPDATE_SELECTED_KEY_NUMBER,
  UPDATE_ALTERNATIVE_SELECTIONS,
  TOGGLE_SELECTED_NOTES
} from 'constants/types';

import { getChordsFromSelectedNotes, getScalesFromSelectedNotes } from '@benjamindehli/music-utils';

import {
  getSelectedNoteNumbersFromNotes,
  getNoteByNoteNumber,
  halfStepsToNoteNumbers
} from 'helpers/noteHelpers';

const sortNumber = (a, b) => a - b;

const chordMatchToAlternative = (match) => ({
  note: match.chord.rootNote,
  selectionName: match.chord.chordType.name,
  matchType: match.matchType,
  ...(match.chord.bassNote ? { bassNote: match.chord.bassNote } : {})
});

const scaleMatchToAlternative = (match) => ({
  note: match.scale.rootNote,
  selectionName: match.scale.scaleType.name,
  matchType: match.matchType
});

const findPrimaryChordMatch = (matches, selectedKeyNumber) => {
  return (
    matches.find(m => m.matchType === 'exactRoot' && m.chord.rootNote.number === selectedKeyNumber) ||
    matches.find(m => m.matchType === 'invertedRoot' && m.chord.rootNote.number === selectedKeyNumber) ||
    matches.find(m => m.matchType === 'exactRoot') ||
    matches.find(m => m.matchType === 'invertedRoot') ||
    matches.find(m => m.matchType === 'nonRoot') ||
    null
  );
};

const findPrimaryScaleMatch = (matches, selectedKeyNumber) => {
  return (
    matches.find(m => m.matchType === 'exactRoot' && m.scale.rootNote.number === selectedKeyNumber) ||
    matches.find(m => m.matchType === 'exactRoot') ||
    matches.find(m => m.matchType === 'nonRoot') ||
    null
  );
};

const isPrimaryChord = (match, primary) =>
  match.chord.rootNote.number === primary.chord.rootNote.number &&
  match.chord.chordType.name === primary.chord.chordType.name &&
  !match.chord.bassNote;

const isPrimaryScale = (match, primary) =>
  match.scale.rootNote.number === primary.scale.rootNote.number &&
  match.scale.scaleType.name === primary.scale.scaleType.name;

export const updateSelectedChordName = selectedChordName => dispatch => {
  dispatch({ type: UPDATE_SELECTED_CHORD_NAME, payload: selectedChordName });
  dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: null });
};

export const updateSelectedScaleName = selectedScaleName => dispatch => {
  dispatch({ type: UPDATE_SELECTED_SCALE_NAME, payload: selectedScaleName });
};

export const updateSelectedSelectionFromAlternativeSelectionList = (alternativeSelections, selectedAlternativeSelection, selectedSelectionType, prevSelectedKeyNumber, prevSelectedSelectionName, notes) => dispatch => {
  const prevSelection = {
    note: getNoteByNoteNumber(notes, prevSelectedKeyNumber),
    selectionName: prevSelectedSelectionName,
    matchType: 'exactRoot'
  };

  const { note, selectionName, bassNote } = selectedAlternativeSelection;

  const newAlternativeSelections = alternativeSelections.filter(alt => {
    const sameRoot = alt.note.number === note.number;
    const sameName = alt.selectionName === selectionName;
    const sameBass = bassNote ? alt.bassNote?.number === bassNote.number : !alt.bassNote;
    return !(sameRoot && sameName && sameBass);
  });
  newAlternativeSelections.push(prevSelection);

  dispatch({ type: UPDATE_SELECTED_KEY_NUMBER, payload: note.number });
  dispatch({ type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME, payload: selectionName });
  dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: bassNote?.number ?? null });
  dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: newAlternativeSelections });
};

export const updateSelectedSelectionSelectList = (notes, selectedKeyNumber, selectedSelectionName, noteSelections, selectedSelectionType) => dispatch => {
  if (selectedSelectionName && selectedSelectionName.length && noteSelections[selectedSelectionName]) {
    const halfSteps = noteSelections[selectedSelectionName].parsedHalfSteps;
    const relativeHalfSteps = halfStepsToNoteNumbers(halfSteps, selectedKeyNumber);
    relativeHalfSteps.sort(sortNumber);
    const newNotes = notes.map(note => ({ ...note, selected: relativeHalfSteps.includes(note.number) }));
    dispatch({ type: TOGGLE_SELECTED_NOTES, payload: newNotes });

    const matches = selectedSelectionType === 'scale'
      ? getScalesFromSelectedNotes(relativeHalfSteps)
      : getChordsFromSelectedNotes(relativeHalfSteps);

    const alternativeSelections = selectedSelectionType === 'scale'
      ? matches
          .filter(m => !(m.scale.rootNote.number === selectedKeyNumber && m.scale.scaleType.name === selectedSelectionName))
          .map(scaleMatchToAlternative)
      : matches
          .filter(m => !(m.chord.rootNote.number === selectedKeyNumber && m.chord.chordType.name === selectedSelectionName && !m.chord.bassNote))
          .map(chordMatchToAlternative);

    dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: alternativeSelections });
  }

  if (selectedSelectionType === 'key') {
    dispatch({ type: UPDATE_SELECTED_KEY_NUMBER, payload: selectedKeyNumber });
  } else {
    dispatch({ type: selectedSelectionType === 'scale' ? UPDATE_SELECTED_SCALE_NAME : UPDATE_SELECTED_CHORD_NAME, payload: selectedSelectionName });
    dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: null });
  }
};

export const updateSelectedSelectionNameFromNotes = (notes, selectedKeyNumber, selectedSelectionType) => dispatch => {
  const selectedNoteNumbers = getSelectedNoteNumbersFromNotes(notes);

  if (!selectedNoteNumbers.length) return;

  if (selectedSelectionType === 'chord') {
    const matches = getChordsFromSelectedNotes(selectedNoteNumbers);
    const primary = findPrimaryChordMatch(matches, selectedKeyNumber);

    if (primary) {
      const alternatives = matches
        .filter(m => !isPrimaryChord(m, primary))
        .map(chordMatchToAlternative);

      dispatch({ type: UPDATE_SELECTED_CHORD_NAME, payload: primary.chord.chordType.name });
      dispatch({ type: UPDATE_SELECTED_KEY_NUMBER, payload: primary.chord.rootNote.number });
      dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: null });
      dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: alternatives });
    } else {
      dispatch({ type: UPDATE_SELECTED_CHORD_NAME, payload: 'custom' });
      dispatch({ type: UPDATE_SELECTED_CHORD_BASS_NOTE_NUMBER, payload: null });
      dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: [] });
    }
  } else {
    const matches = getScalesFromSelectedNotes(selectedNoteNumbers);
    const primary = findPrimaryScaleMatch(matches, selectedKeyNumber);

    if (primary) {
      const alternatives = matches
        .filter(m => !isPrimaryScale(m, primary))
        .map(scaleMatchToAlternative);

      dispatch({ type: UPDATE_SELECTED_SCALE_NAME, payload: primary.scale.scaleType.name });
      dispatch({ type: UPDATE_SELECTED_KEY_NUMBER, payload: primary.scale.rootNote.number });
      dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: alternatives });
    } else {
      dispatch({ type: UPDATE_SELECTED_SCALE_NAME, payload: 'custom' });
      dispatch({ type: UPDATE_ALTERNATIVE_SELECTIONS, payload: [] });
    }
  }
};
