// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Note from 'components/partials/Note';

// Actions
import {toggleNote} from 'actions/NotesActions';
import {updateSelectedChordNameFromNotes} from 'actions/SelectedChordNameActions';

// Stylesheets
import style from 'components/partials/instruments/Guitar/Fret.module.scss';


class Fret extends Component {

	getKeyNumber(fretNumber, tunerNumber){
		return (fretNumber + tunerNumber) % 12;
	}

  render() {
    const keyNumber = this.getKeyNumber(this.props.fretNumber, this.props.tunerNumber);
    const note = this.props.notes[keyNumber];

    return (<div className={style.fret}>
        <Note note={note} keyNumber={keyNumber} />
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
});

const mapDispatchToProps = {
    toggleNote,
    updateSelectedChordNameFromNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(Fret);
