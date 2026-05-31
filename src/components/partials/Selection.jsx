// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// Actions
import { updateSelectedKeyNumber } from 'actions/SelectedKeyNumberActions';
import { updateSelectedChordName, updateSelectedScaleName, updateSelectedSelectionSelectList } from 'actions/SelectedSelectionNameActions';
import { updateComputerKeyboardInputEnabled } from 'actions/ComputerKeyboardInputEnabledActions';

// Stylesheets
import style from 'components/partials/Selection.module.scss';

class Selection extends Component {

  handleKeyChange(keyNumber) {
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      keyNumber,
      this.props.selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName,
      this.props.selectedSelectionType === 'scale' ? this.props.scales : this.props.chords,
      'key'
    );
  }

  handleChordChange(chordName) {
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      this.props.selectedKeyNumber,
      chordName,
      this.props.chords,
      'chord'
    );
  }

  handleScaleChange(scaleName) {
    this.props.updateSelectedSelectionSelectList(
      this.props.notes,
      this.props.selectedKeyNumber,
      scaleName,
      this.props.scales,
      'scale'
    );
  }

  renderKeyOptions(notes) {
    return notes.map(note => {
      return <MenuItem value={note.number} key={note.number}>{note.name}</MenuItem>;
    })
  }

  render() {
    return (
      <div className={style.selection}>
        <FormControl variant="standard" className={style.formControl}>
          <InputLabel id="key-select-label">Key</InputLabel>
          <Select className={style.select} labelId="key-select-label" id="key-select" value={this.props.selectedKeyNumber} onChange={event => this.handleKeyChange(parseInt(event.target.value))}>
            {this.renderKeyOptions(this.props.notes)}
          </Select>
        </FormControl>
        {
          this.props.selectedSelectionType === 'chord'
            ? (<FormControl className={`${style.formControl} ${style.wide}`}>
              <Autocomplete
                id="chord-select"
                value={!!this.props.selectedChordName?.length ? this.props.selectedChordName : null}
                onChange={(event, newValue) => this.handleChordChange(newValue)}
                onFocus={() => this.props.updateComputerKeyboardInputEnabled(false)}
                onBlur={() => this.props.updateComputerKeyboardInputEnabled(true)}
                className={style.select}
                options={Object.keys(this.props.chords)}
                renderInput={(params) => <TextField {...params} variant="standard" label="Chord" className={style.input} />}
              />
            </FormControl>)
            : (<FormControl className={`${style.formControl} ${style.wide}`}>
              <Autocomplete
                id="scale-select"
                value={!!this.props.selectedScaleName?.length ? this.props.selectedScaleName : null}
                onChange={(event, newValue) => this.handleScaleChange(newValue)}
                onFocus={() => this.props.updateComputerKeyboardInputEnabled(false)}
                onBlur={() => this.props.updateComputerKeyboardInputEnabled(true)}
                className={style.select}
                options={Object.keys(this.props.scales)}
                renderInput={(params) => <TextField {...params} variant="standard" label="Scale" className={style.input} />}
              />
            </FormControl>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName,
  selectedSelectionType: state.selectedSelectionType
});

const mapDispatchToProps = {
  updateSelectedKeyNumber,
  updateSelectedChordName,
  updateSelectedScaleName,
  updateSelectedSelectionSelectList,
  updateComputerKeyboardInputEnabled
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
