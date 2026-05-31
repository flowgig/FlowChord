// Dependencies
import { Component } from 'react';
import { connect } from 'react-redux';
import * as Tone from 'tone';

// Material UI
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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

  playSelection() {
    const synthesizer = this.props.synthesizer;
    const notes = this.props.notes;
    const selectedSelections = this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords;
    const selectedSelectionName = this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName;
    if (selectedSelectionName) {
      const selectedSelection = selectedSelections[selectedSelectionName];
      const selectedHalfSteps = selectedSelection.halfSteps;
      const selectedNotesTriggerNames = this.getSelectedNotesTriggerNames(selectedHalfSteps, this.props.selectedKeyNumber, notes);
      const now = Tone.now()

      if (this.props.selectedSelectionType === 'chord') {
        // Trigger simultaneously
        synthesizer.triggerAttackRelease(selectedNotesTriggerNames, 0.5);
        // Trigger consecutively
        selectedNotesTriggerNames.forEach((selectedNotesTriggerName, index) => {
          const noteLength = 0.25;
          const noteStart = now + 0.75 + 0.25 * index;
          synthesizer.triggerAttackRelease(selectedNotesTriggerName, noteLength, noteStart);
        })
      } else if (this.props.selectedSelectionType === 'scale') {
        // Trigger consecutively
        selectedNotesTriggerNames.forEach((selectedNotesTriggerName, index) => {
          const noteLength = 0.25;
          const noteStart = now + 0.25 * index;
          synthesizer.triggerAttackRelease(selectedNotesTriggerName, noteLength, noteStart);
        })
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
  selectedScaleName: state.selectedScaleName,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedSelectionType: state.selectedSelectionType,
  synthesizer: state.synthesizer
});


export default connect(mapStateToProps, null)(Synthesizer);
