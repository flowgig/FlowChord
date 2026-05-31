// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import Button from '@material-ui/core/Button';

// Actions
import {toggleNote} from 'actions/NotesActions';
import {updateSelectedSelectionNameFromNotes} from 'actions/SelectedSelectionNameActions';

// Helpers
import {noteNumberToHalfSteps} from 'helpers/noteHelpers';

// Stylesheets
import style from 'components/partials/Note.module.scss';

class Note extends Component {
	getKeyName(keyNumber){
		return this.props.notes[keyNumber].name;
	}

  getInterval(halfSteps){
		return this.props.intervals[halfSteps];
	}

  handleNoteOnClick(checked, noteNumber, selectedKeyNumber, noteSelections, selectedSelectionType){
    const newNotes = this.props.toggleNote(noteNumber, checked);
    this.props.updateSelectedSelectionNameFromNotes(newNotes, selectedKeyNumber, noteSelections, selectedSelectionType);
  }

  render() {
    const noteSelections = this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords;
    const selectedSelectionName = this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName;
    const selectedNoteSelection = noteSelections[selectedSelectionName];

    const keyNumber = this.props.keyNumber;
    const keyName = this.getKeyName(keyNumber);
    const note = this.props.note;
    const halfSteps = noteNumberToHalfSteps(keyNumber, this.props.selectedKeyNumber, selectedNoteSelection);
    const interval = this.getInterval(halfSteps);

    const label = () => {
      switch(this.props.selectedLabel) {
        case 'key':
          return keyName;
        case 'interval':
          return interval;
        case 'halfSteps':
          return halfSteps;
        default:
          return '';
      }
    }
   
    

    return (<div className={style.note}>
          <Button color="default"
                  disableElevation
                  variant={note.selected ? 'contained' : 'text'}
                  onClick={event => this.handleNoteOnClick(!note.selected, keyNumber, this.props.selectedKeyNumber, noteSelections, this.props.selectedSelectionType)}
                  className={`${style.button} ${note.selected ? style[halfSteps] : style.notSelected} ${this.props.keyColor ? style[this.props.keyColor] : ''}`}
                  >
                    {label()}
          </Button>
	</div>)
  }
}

Note.propTypes = {
  note: PropTypes.object,
  keyNumber: PropTypes.number,
	keyColor: PropTypes.string
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  intervals: state.intervals,
  selectedSelectionType: state.selectedSelectionType,
  selectedLabel: state.selectedLabel,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName
});

const mapDispatchToProps = {
    toggleNote,
    updateSelectedSelectionNameFromNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
