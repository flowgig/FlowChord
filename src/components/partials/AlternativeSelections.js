// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material UI
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

// Actions
import {updateSelectedKeyNumber} from 'actions/SelectedKeyNumberActions';
import {updateSelectedSelectionFromAlternativeSelectionList} from 'actions/SelectedSelectionNameActions';

// Stylesheets
import style from 'components/partials/AlternativeSelections.module.scss';

class AlternativeSelections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      anchorEl: null,
      showSnackbar: false,
      listId: 'alternativeSelectionsList'
    };
    this.handleListOpen = this.handleListOpen.bind(this);
    this.handleListClose = this.handleListClose.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    const hasAlternativeSelections = this.props.alternativeSelections.length;
    const hadAlternativeSelections = prevProps.alternativeSelections.length;
    if (hasAlternativeSelections !== hadAlternativeSelections) {
      if (hasAlternativeSelections) {
        this.setState({showSnackbar: true});
      } else {
        this.setState({showSnackbar: false});
      }
    }
  }

  setAnchorEl(element){
    this.setState({
      anchorEl: element,
      isListOpen: element ? true : false
    });
  }

  handleListOpen(event) {
    this.setAnchorEl(event.currentTarget);
  }

  handleListClose() {
    this.setAnchorEl(null);
  }

  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({showSnackbar: false});
  };

  renderAlternativeSelectionsListItems(alternativeSelections, selectedSelectionType, selectedKeyNumber, selectedSelectionName, noteSelections, notes){
    return alternativeSelections.map(selection => {
      return (<MenuItem
                key={`${selection.note.name}${selection.selectionName}`}
                onClick={() => this.props.updateSelectedSelectionFromAlternativeSelectionList(alternativeSelections, selection, selectedSelectionType, selectedKeyNumber, selectedSelectionName, noteSelections, notes)}>
                {selection.note.name} {selection.selectionName}
             </MenuItem>)
    })
  }

  renderAlternativeSelectionsList(alternativeSelections, selectedSelectionType, selectedKeyNumber, selectedSelectionName, noteSelections, notes){
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={this.state.listId}
        getContentAnchorEl={null}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isListOpen}
        onClose={this.handleListClose}
        >
        {
          alternativeSelections.length
            ? this.renderAlternativeSelectionsListItems(alternativeSelections, selectedSelectionType, selectedKeyNumber, selectedSelectionName, noteSelections, notes)
            : (
              <MenuItem>
                No alternative {selectedSelectionType}s available
              </MenuItem>
            )
        }
      </Menu>
    );
  }

  render() {
    const alternativeSelections = this.props.alternativeSelections;
    const selectedSelectionType = this.props.selectedSelectionType;
    const selectedKeyNumber = this.props.selectedKeyNumber;
    const selectedSelectionName = selectedSelectionType === 'scale' ? this.props.selectedScaleName : this.props.selectedChordName;
    const noteSelections = selectedSelectionType === 'scale' ? this.props.scales : this.props.chords;
    const notes = this.props.notes;

    return (<div className={style.alternativeSelection}>

      <IconButton aria-label="Show more"
                  aria-controls={this.state.listId}
                  aria-haspopup="true"
                  onClick={this.handleListOpen}
                  color="inherit">
        <Badge badgeContent={alternativeSelections.length} color="primary">
          <QueueMusicIcon fontSize="default"/>
        </Badge>
      </IconButton>
      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={this.state.showSnackbar}
        autoHideDuration={6000}
        onClose={this.handleSnackbarClose}
        message={
          <React.Fragment>
            <QueueMusicIcon fontSize="small"/>
            {alternativeSelections.length} alternative {selectedSelectionType}{alternativeSelections.length === 1 ? '' : 's'} available
          </React.Fragment>}
        action={
            <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
          <CloseIcon fontSize="small"/>
        </IconButton>
      </React.Fragment>}
    />
      {this.renderAlternativeSelectionsList(alternativeSelections, selectedSelectionType, selectedKeyNumber, selectedSelectionName, noteSelections, notes)}
    </div>)
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  chords: state.chords,
  scales: state.scales,
  selectedKeyNumber: state.selectedKeyNumber,
  selectedChordName: state.selectedChordName,
  selectedScaleName: state.selectedScaleName,
  selectedSelectionType: state.selectedSelectionType,
  alternativeSelections: state.alternativeSelections
});

const mapDispatchToProps = {
  updateSelectedSelectionFromAlternativeSelectionList
};

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeSelections);
