import { getSpelledNotes } from '@benjamindehli/music-utils';

export const getNoteByNoteNumber = (notes, noteNumber) => {
  return notes.find(note => {
    return note.number === noteNumber;
  })
}

// Context-aware note spelling: given a root note and the selected chord/scale,
// returns a { [pitchClass]: name } map spelling each note from its interval above
// the root (e.g. Bb instead of A# in an F major context). Notes outside the
// selection are absent from the map — callers should fall back to the default name.
export const getSpelledNoteNames = (rootNoteNumber, noteSelection) => {
  const halfSteps = noteSelection?.halfSteps;
  if (!halfSteps?.length) return {};
  return getSpelledNotes(rootNoteNumber, halfSteps).reduce((spelledNoteNames, spelledNote) => {
    spelledNoteNames[spelledNote.number] = spelledNote.name;
    return spelledNoteNames;
  }, {});
}

export const noteNumberToHalfSteps = (noteNumber, selectedKeyNumber, selectedNoteSelection) => {
  const relativeNoteNumber =  (noteNumber - selectedKeyNumber) % 12 >= 0 ? (noteNumber - selectedKeyNumber) % 12 : (12 + noteNumber - selectedKeyNumber) % 12;
  const relativeNoteNumberInSelection = selectedNoteSelection && Object.keys(selectedNoteSelection)?.length 
  ? selectedNoteSelection.halfSteps.find(halfStep => {
    return halfStep % 12 === relativeNoteNumber;
  }) : null;
  return relativeNoteNumberInSelection || relativeNoteNumber;
} 

export const noteNumbersToHalfSteps = (noteNumbers, selectedKeyNumber) => {
  return noteNumbers.map(noteNumber => {
    return noteNumberToHalfSteps(noteNumber, selectedKeyNumber);
  });
}

export const halfStepsToNoteNumber = (halfStep, selectedKeyNumber) => {
  return (halfStep + selectedKeyNumber) % 12;
}

export const halfStepsToNoteNumbers = (halfSteps, selectedKeyNumber) => {
  return halfSteps.map(halfStep => {
    return halfStepsToNoteNumber(halfStep, selectedKeyNumber);
  });
}

export const getSelectedNoteNumbersFromNotes = notes => {
  return notes.filter(note => {
    return note.selected;
  }).map(note => {
    return note.number;
  });
}

export const getSelectedNotes = notes => {
  return notes.filter(note => {
    return note.selected;
  });
}
