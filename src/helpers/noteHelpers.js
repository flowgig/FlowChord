export const getNoteByNoteNumber = (notes, noteNumber) => {
  return notes.find(note => {
    return note.number === noteNumber;
  })
}

export const noteNumberToHalfSteps = (noteNumber, selectedKeyNumber) => {
  return (noteNumber - selectedKeyNumber) % 12 >= 0 ? (noteNumber - selectedKeyNumber) % 12 : (12 + noteNumber - selectedKeyNumber) % 12;
}

export const noteNumbersToHalfSteps = (noteNumbers, selectedKeyNumber) => {
  return noteNumbers.map(noteNumber => {
    return noteNumberToHalfSteps(noteNumber, selectedKeyNumber);
  });
}

export const getSelectedNoteNumbersFromNotes = notes => {
  return notes.filter(note => {
    return note.selected;
  }).map(note => {
    return note.number;
  });
}
