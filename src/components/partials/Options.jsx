// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material UI
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';


// Actions
import {updateSelectedSelectionType} from 'actions/SelectedSelectionTypeActions';
import {updateSelectedLabel} from 'actions/SelectedLabelActions';
import {updateSettingsGuitar} from 'actions/SettingsGuitarActions';
import {updateSettingsKeyboard} from 'actions/SettingsKeyboardActions';

// Stylesheets
import style from 'components/partials/Options.module.scss';

class Options extends Component {

  handleSelectionTypeChange(selectionType){
    this.props.updateSelectedSelectionType(selectionType);
  }

  handleLabelChange(label){
    this.props.updateSelectedLabel(label);
  }

  handleToggleGuitar(show){
    const newSettingsGuitar = {...this.props.settingsGuitar};
    newSettingsGuitar.show = show;
    this.props.updateSettingsGuitar(newSettingsGuitar)
  }

  handleNumberOfFretsChange(numberOfFrets){
    const newSettingsGuitar = {...this.props.settingsGuitar};
    newSettingsGuitar.numberOfFrets = numberOfFrets;
    this.props.updateSettingsGuitar(newSettingsGuitar)
  }

  handleToggleKeyboard(show){
    const newSettingsKeyboard = {...this.props.settingsKeyboard};
    newSettingsKeyboard.show = show;
    this.props.updateSettingsKeyboard(newSettingsKeyboard)
  }

  handleNumberOfKeysChange(numberOfKeys){
    const newSettingsKeyboard = {...this.props.settingsKeyboard};
    newSettingsKeyboard.numberOfKeys = numberOfKeys;
    this.props.updateSettingsKeyboard(newSettingsKeyboard)
  }

  handleLowestNoteChange(lowestNote){
    const newSettingsKeyboard = {...this.props.settingsKeyboard};
    newSettingsKeyboard.lowestNote = lowestNote;
    this.props.updateSettingsKeyboard(newSettingsKeyboard)
  }

  renderSelectionTypeOptions(selectionTypes){
    return selectionTypes.map(selectionType => {
      return <MenuItem key={selectionType.value} value={selectionType.value}>{selectionType.label}</MenuItem>;
    })
  }

  renderLabelOptions(labels){
    return labels.map(label => {
      return <MenuItem key={label.value} value={label.value}>{label.label}</MenuItem>;
    })
  }

  renderLowestNoteOptions(notes){
    return notes.map(note => {
      return <MenuItem key={note.number} value={note.number}>{note.name}</MenuItem>;
    })
  }

  render() {
    return (<React.Fragment>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={style.options}>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="selection-type-select-label">Selection type</InputLabel>
            <Select labelId="selection-type-select-label" id="selection-type-select" value={this.props.selectedSelectionType} onChange={event => this.handleSelectionTypeChange(event.target.value)}>
            {this.renderSelectionTypeOptions(this.props.selectionTypes)}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="label-select-label">Label</InputLabel>
            <Select labelId="label-select-label" id="label-select" value={this.props.selectedLabel} onChange={event => this.handleLabelChange(event.target.value)}>
            {this.renderLabelOptions(this.props.labels)}
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText id="switch-list-label-guitar" primary="Guitar" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => this.handleToggleGuitar(event.target.checked)}
              checked={this.props.settingsGuitar.show}
              color="primary"
              inputProps={{ 'aria-labelledby': 'switch-list-label-guitar' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={this.props.settingsGuitar.show} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <TextField value={this.props.settingsGuitar.numberOfFrets} onChange={event => this.handleNumberOfFretsChange(event.target.value)} fullWidth id="number-of-frets" label="Number of frets" type="number" inputProps={{min: 0, max: 50}} InputLabelProps={{shrink: true}} />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText id="switch-list-label-keyboard" primary="Keyboard" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => this.handleToggleKeyboard(event.target.checked)}
              checked={this.props.settingsKeyboard.show}
              color="primary"
              inputProps={{ 'aria-labelledby': 'switch-list-label-keyboard' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={this.props.settingsKeyboard.show} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <TextField value={this.props.settingsKeyboard.numberOfKeys} onChange={event => this.handleNumberOfKeysChange(event.target.value)} fullWidth id="number-of-keys" label="Number of keys" type="number" inputProps={{min: 0, max: 120}} InputLabelProps={{shrink: true}} />
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="lowestNote-select-label">Lowest note</InputLabel>
                <Select labelId="lowestNote-select-label" id="lowestNote-select" value={this.props.settingsKeyboard.lowestNote} onChange={event => this.handleLowestNoteChange(event.target.value)}>
                {this.renderLowestNoteOptions(this.props.notes)}
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </React.Fragment>)
  }
}

const mapStateToProps = state => ({
  selectionTypes: state.selectionTypes,
  labels: state.labels,
  scales: state.scales,
  notes: state.notes,
  selectedSelectionType: state.selectedSelectionType,
  selectedLabel: state.selectedLabel,
  settingsGuitar: state.settingsGuitar,
  settingsKeyboard: state.settingsKeyboard
});

const mapDispatchToProps = {
  updateSelectedSelectionType,
  updateSelectedLabel,
  updateSettingsGuitar,
  updateSettingsKeyboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
