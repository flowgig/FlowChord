// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';

// Actions
import {toggleNote} from 'actions/NotesActions';
import {updateSelectedChordNameFromNotes} from 'actions/SelectedChordNameActions';

// Stylesheets
import style from 'components/partials/Note.module.scss';
import {markerColorThemes} from 'theme';


class Note extends Component {
  getHalfSteps(keyNumber, selectedKeyNumber){
		let halfSteps = null;
		if((keyNumber - selectedKeyNumber) % 12 >= 0){
			halfSteps = (keyNumber - selectedKeyNumber) % 12;
		}else{
			halfSteps = (12 + keyNumber - selectedKeyNumber) % 12;
		}
		return halfSteps;
	}

	getKeyName(keyNumber){
		return this.props.notes[keyNumber].name;
	}

  handleNoteOnClick(checked, noteNumber, selectedKeyNumber, chords){
    const newNotes = this.props.toggleNote(noteNumber, checked);
    this.props.updateSelectedChordNameFromNotes(newNotes, selectedKeyNumber, chords);
  }

  render() {
    const keyNumber = this.props.keyNumber;
    const keyName = this.getKeyName(keyNumber);
    const note = this.props.notes[keyNumber];
    const halfSteps = this.getHalfSteps(keyNumber, this.props.selectedKeyNumber);

    const label = () => {
      switch(this.props.selectedLabel) {
        case 'key':
          return keyName;
        case 'interval':
          return this.props.note.interval;
        case 'halfSteps':
          return halfSteps;
        default:
          return '';
      }
    }
    const noteSelection = this.props.selectionType === 'chord' ? this.props.chords : this.props.scales;

    return (<div className={style.note}>
        <ThemeProvider theme={markerColorThemes[halfSteps]}>
          <Button color="primary" disableElevation variant={note.selected ? 'contained' : 'text'} onClick={event => this.handleNoteOnClick(!note.selected, keyNumber, this.props.selectedKeyNumber, noteSelection)}>{label()}</Button>
        </ThemeProvider>
	</div>)
  }
}

Note.propTypes = {
  note: PropTypes.object,
  keyNumber: PropTypes.number
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectionType: state.selectionType,
  selectedLabel: state.selectedLabel,
  selectedKeyNumber: state.selectedKeyNumber
});

const mapDispatchToProps = {
    toggleNote,
    updateSelectedChordNameFromNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);
