// Dependencies
import { Component } from 'react';
import { connect } from 'react-redux';
import * as Tone from 'tone';

// Material UI
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Helpers
import { getNoteByNoteNumber } from 'helpers/noteHelpers';


class Synthesizer extends Component {
  constructor(props) {
    super(props);
    this.playSelection = this.playSelection.bind(this);
  }

  getSelectedNotesTriggerNames(halfSteps, selectedKeyNumber, notes) {
    return halfSteps.map(halfStep => {
      const rootOctave = selectedKeyNumber > 5 ? 3 : 4;
      const relativeHalfStep = selectedKeyNumber + halfStep;
      const octave = parseInt(relativeHalfStep / 12) + rootOctave;
      const noteNumber = relativeHalfStep % 12;
      const note = getNoteByNoteNumber(notes, noteNumber);
      return `${note.name}${octave}`;
    })
  };

  getBassNoteTriggerName(bassNoteNumber, selectedKeyNumber, notes) {
    const rootOctave = selectedKeyNumber > 5 ? 3 : 4;
    const bassOctave = bassNoteNumber < selectedKeyNumber ? rootOctave : rootOctave - 1;
    const note = getNoteByNoteNumber(notes, bassNoteNumber);
    return `${note.name}${bassOctave}`;
  }

  playSelection() {
    const synthesizer = this.props.synthesizer;
    const notes = this.props.notes;
    const selectedSelections = this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords;
    const selectedSelectionName = this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName;
    if (selectedSelectionName) {
      const selectedSelection = selectedSelections[selectedSelectionName];
      const selectedHalfSteps = selectedSelection.halfSteps;
      const chordNoteNames = this.getSelectedNotesTriggerNames(selectedHalfSteps, this.props.selectedKeyNumber, notes);

      const bassNoteNumber = this.props.selectedChordBassNoteNumber;
      const bassNoteName = (this.props.selectedSelectionType === 'chord' && bassNoteNumber !== null && bassNoteNumber !== undefined)
        ? this.getBassNoteTriggerName(bassNoteNumber, this.props.selectedKeyNumber, notes)
        : null;

      const now = Tone.now();

      if (this.props.selectedSelectionType === 'chord') {
        const allNotes = bassNoteName ? [bassNoteName, ...chordNoteNames] : chordNoteNames;
        // Trigger simultaneously
        synthesizer.triggerAttackRelease(allNotes, 0.5);
        // Trigger consecutively (bass note first, then chord notes)
        allNotes.forEach((noteName, index) => {
          synthesizer.triggerAttackRelease(noteName, 0.25, now + 0.75 + 0.25 * index);
        });
      } else if (this.props.selectedSelectionType === 'scale') {
        // Trigger consecutively
        chordNoteNames.forEach((noteName, index) => {
          synthesizer.triggerAttackRelease(noteName, 0.25, now + 0.25 * index);
        });
      }
    }
  }

  render() {
    return (
      <Fab color="primary" aria-label={`Listen to ${this.props.selectedSelectionType}`} onClick={this.playSelection}>
        <PlayArrowIcon />
      </Fab>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedChordName: state.selectedChordName,
  selectedChordBassNoteNumber: state.selectedChordBassNoteNumber,
  selectedScaleName: state.selectedScaleName,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedSelectionType: state.selectedSelectionType,
  synthesizer: state.synthesizer
});


export default connect(mapStateToProps, null)(Synthesizer);
