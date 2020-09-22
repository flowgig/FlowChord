// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {toggleNote} from 'actions/NotesActions';
import {updateSelectedChordNameFromNotes} from 'actions/SelectedChordNameActions';

// Stylesheets
import style from 'components/partials/instruments/Guitar/Fret.module.scss';
import markerStyle from 'style/template/markers.module.scss';


class Fret extends Component {
  componentDidUpdate(prevProps){
  }

  getHalfSteps(fretNumber, tunerNumber, selectedKeyNumber){
		let halfSteps = null;
		if((fretNumber + tunerNumber - selectedKeyNumber - 1) % 12 >= 0){
			halfSteps = (fretNumber + tunerNumber - selectedKeyNumber - 1) % 12;
		}else{
			halfSteps = (12 + fretNumber + tunerNumber - selectedKeyNumber - 1) % 12;
		}
		return halfSteps;
	}
	getKeyNumber(fretNumber, tunerNumber){
		return (fretNumber + tunerNumber - 1) % 12;
	}
	getKeyName(keyNumber){
		return this.props.notes[keyNumber].name;
	}

  handleFretOnChange(checked, noteNumber, selectedKeyNumber, chords){
    const newNotes = this.props.toggleNote(noteNumber, checked);
    this.props.updateSelectedChordNameFromNotes(newNotes, selectedKeyNumber, chords);
  }

  render() {
    const inputId = `select-interval-guitar-${this.props.stringNumber}-${this.props.fretNumber}`;
    const keyNumber = this.getKeyNumber(this.props.fretNumber, this.props.tunerNumber);
    const keyName = this.getKeyName(keyNumber);
    const note = this.props.notes[keyNumber];
    const halfSteps = this.getHalfSteps(this.props.fretNumber, this.props.tunerNumber, this.props.selectedKeyNumber);
    const markerClass = note.selected ? `${markerStyle.marker} ${markerStyle.markerColor} ${markerStyle[halfSteps]}` : `${markerStyle.marker} ${markerStyle.noMarker}`;
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

    return (<div className={style.fret}>
			<label htmlFor={inputId}>
				<span className={markerClass}>
  				{label()}
				</span>
			</label>
			<input id={inputId}
  			type="checkbox"
  			onChange={event => this.handleFretOnChange(event.target.checked, keyNumber, this.props.selectedKeyNumber, noteSelection)}
  			checked={note.selected}  />
	</div>)
  }
}

Fret.propTypes = {
  fretNumber: PropTypes.number,
  tunerNumber: PropTypes.number,
  stringNumber: PropTypes.number
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectionType: state.selectionType,
  selectedLabel: state.selectedLabel,
  selectedHalfSteps: state.selectedHalfSteps,
  selectedKeyNumber: state.selectedKeyNumber
});

const mapDispatchToProps = {
    toggleNote,
    updateSelectedChordNameFromNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(Fret);
