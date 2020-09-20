// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

// Actions
import {updateSelectedKeyNumber} from 'actions/SelectedKeyNumberActions';
import {updateSelectedChordName} from 'actions/SelectedChordNameActions';

// Stylesheets
import style from 'components/partials/SideBar.module.scss';

class SideBar extends Component {

  getNoteByNoteNumber(noteNumber){
    return this.props.notes.find(note => {
      return note.number === noteNumber;
    })
  }

  handleKeyChange(keyNumber){
    this.props.updateSelectedKeyNumber(keyNumber);
  }

  handleChordChange(chordName){
    this.props.updateSelectedChordName(chordName);
  }

  renderKeyOptions(notes){
    return notes.map(note => {
      return <option value={note.number} key={note.number}>{note.name}</option>;
    })
  }

  renderChordOptions(chords){
    return Object.keys(chords).map(chordName => {
      const chord = chords[chordName];
      return <option key={chordName} value={chordName}>{chordName}</option>;
    })
  }

  render() {
    return (<aside className={style.sideBar}>
      <select onChange={event => this.handleKeyChange(parseInt(event.target.value))}>{this.renderKeyOptions(this.props.keys)}</select>
      <select onChange={event => this.handleChordChange(event.target.value)}>{this.renderChordOptions(this.props.chords)}</select>
    </aside>)
  }
}

const mapStateToProps = state => ({
  keys: state.notes,
  chords: state.chords,
  selectedKeyNumber: state.selectedKeyNumber
});

const mapDispatchToProps = {
  updateSelectedKeyNumber,
  updateSelectedChordName
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
