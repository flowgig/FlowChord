// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material UI
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Actions
import {updateSelectedKeyNumber} from 'actions/SelectedKeyNumberActions';
import {updateSelectedChordName} from 'actions/SelectedChordNameActions';
import {updateSelectedScaleName} from 'actions/SelectedScaleNameActions';

// Stylesheets
import style from 'components/partials/SideBar.module.scss';

class SideBar extends Component {

  handleKeyChange(keyNumber){
    this.props.updateSelectedKeyNumber(keyNumber);
  }

  handleChordChange(chordName){
    this.props.updateSelectedChordName(chordName);
  }

  handleScaleChange(scaleName){
    this.props.updateSelectedScaleName(scaleName);
  }

  renderKeyOptions(notes){
    return notes.map(note => {
      return <MenuItem value={note.number} key={note.number}>{note.name}</MenuItem>;
    })
  }

  renderChordOptions(chords){
    return Object.keys(chords).map(chordName => {
      return <MenuItem key={chordName} value={chordName}>{chordName}</MenuItem>;
    })
  }

  renderScaleOptions(scales){
    return Object.keys(scales).map(scaleName => {
      return <MenuItem key={scaleName} value={scaleName}>{scaleName}</MenuItem>;
    })
  }

  render() {
    return (<aside className={style.sideBar}>
      <FormControl >
        <InputLabel id="key-select-label">Key</InputLabel>
        <Select labelId="key-select-label" id="key-select" value={this.props.selectedKeyNumber} onChange={event => this.handleKeyChange(parseInt(event.target.value))}>
        {this.renderKeyOptions(this.props.keys)}
        </Select>
      </FormControl>
      <FormControl >
        <InputLabel id="chord-select-label">Chord</InputLabel>
        <Select labelId="chord-select-label" id="chord-select" value={this.props.selectedChordName} onChange={event => this.handleChordChange(event.target.value)}>
        {this.renderChordOptions(this.props.chords)}
        </Select>
      </FormControl>
      <FormControl >
        <InputLabel id="scale-select-label">Scale</InputLabel>
        <Select labelId="scale-select-label" id="scale-select" value={this.props.selectedScaleName} onChange={event => this.handleScaleChange(event.target.value)}>
        {this.renderScaleOptions(this.props.scales)}
        </Select>
      </FormControl>
    </aside>)
  }
}

const mapStateToProps = state => ({
  keys: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName
});

const mapDispatchToProps = {
  updateSelectedKeyNumber,
  updateSelectedChordName,
  updateSelectedScaleName
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
