// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import Fret from 'components/partials/instruments/Guitar/Fret';

// Actions
import { updateTunerNumber, updateGuitarTuners} from 'actions/GuitarTunersActions';

// Stylesheets
import style from 'components/partials/instruments/Guitar.module.scss';

class Guitar extends Component {

  handleTunerChange(stringNumber, tunerNumber){
    this.props.updateTunerNumber(stringNumber, tunerNumber)
  }
  renderTunerElements(guitarTuners, notes){
    return guitarTuners && guitarTuners.length
      ? guitarTuners.map((tuner, stringNumber) => {
        const optionElements = notes.map(note => {
          return <MenuItem key={`noteNumber-${note.number}`} value={note.number}>{note.name}</MenuItem>
        });
        return (<div key={`${stringNumber}-${tuner.number}`} className={style.tuner}>
          <Select value={tuner.number} className={style.tunerSelect} onChange={(event) => this.handleTunerChange(stringNumber, parseInt(event.target.value))}>
            {optionElements}
          </Select>
          <div className={style.fret}>
            <Fret fretNumber={0} tunerNumber={tuner.number} stringNumber={parseInt(stringNumber)} />
          </div>
        </div>)
      })
      : '';
  }

  renderFretNumbers(settingsGuitar){
    const numberOfFrets = settingsGuitar && settingsGuitar.numberOfFrets ? settingsGuitar.numberOfFrets : null;
    let fretNumbers = [];
    if (numberOfFrets){
      let fretNumber = 1;
        while (fretNumber <= numberOfFrets){
        fretNumbers.push(<div key={`fretNumber-${fretNumber}`} className={`${style.fret} ${style.fretnumber}`}>{fretNumber}</div>);
        fretNumber++;
      }
    }
    return fretNumbers;
  }

  renderFrets(settingsGuitar, tuner, stringNumber){
    const numberOfFrets = settingsGuitar && settingsGuitar.numberOfFrets ? settingsGuitar.numberOfFrets : null;
    let frets = [];
    if (numberOfFrets){
      let fretNumber = 1;
        while (fretNumber <= numberOfFrets){
        frets.push(<div key={`fret-${fretNumber}`} className={`${style.fret} ${fretNumber === 1 ? style.firstFret : ''}`}>
          <Fret fretNumber={fretNumber} tunerNumber={tuner.number} stringNumber={stringNumber} />
        </div>);
        fretNumber++;
      }
    }
    return frets;
  }

  renderGuitarNeck(settingsGuitar, guitarTuners){
    return guitarTuners && guitarTuners.length
      ? guitarTuners.map((tuner, stringNumber) => {
          return (<div key={`${tuner.number}-${stringNumber}`} className={style.string}>{this.renderFrets(settingsGuitar, tuner, parseInt(stringNumber))}</div>)
        })
      : '';
  }

  render() {
    return this.props.settingsGuitar && this.props.settingsGuitar.show
      ? (<div id="guitar" className={`${style.guitar} ${style.active}`}>
  		<div className={`${style.instrumentView} ${style.fretboard}`}>
  			<div className={style.tuners}>
  				<div className={`${style.fret} ${style.fretnumber}`}>
  					Tuners
  				</div>
          {this.renderTunerElements(this.props.guitarTuners, this.props.notes)}
  			</div>
  			<div className={style.frets}>
          {this.renderFretNumbers(this.props.settingsGuitar)}
          {this.renderGuitarNeck(this.props.settingsGuitar, this.props.guitarTuners)}
  			</div>
  		</div>
  	</div>) : ''
  }
}

const mapStateToProps = state => ({
  settingsGuitar: state.settingsGuitar,
  guitarTuners: state.guitarTuners,
  notes: state.notes
});

const mapDispatchToProps = {
    updateTunerNumber,
    updateGuitarTuners
};


export default connect(mapStateToProps, mapDispatchToProps)(Guitar);
