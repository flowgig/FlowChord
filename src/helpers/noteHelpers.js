export const getNoteByNoteNumber = (notes, noteNumber) => {
  return notes.find(note => {
    return note.number === noteNumber;
  })
}
