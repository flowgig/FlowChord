// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

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
          return <option key={`noteNumber-${note.number}`} value={note.number}>{note.name}</option>
        });
        return (<div key={`${stringNumber}-${tuner.number}`} className={style.tuner}>
          <span className={style.selectListIcon}></span>
          <select value={tuner.number} className={style.string} onChange={(event) => this.handleTunerChange(stringNumber, parseInt(event.target.value))}>
            {optionElements}
          </select>
          <div className={style.fret}>
            <Fret fretNumber={1} tunerNumber={tuner.number} stringNumber={parseInt(stringNumber)} />
          </div>
        </div>)
      })
      : '';
  }

  renderFretNumbers(guitarSettings){
    const numberOfFrets = guitarSettings && guitarSettings.numberOfFrets ? guitarSettings.numberOfFrets : null;
    let fretNumbers = [];
    if (numberOfFrets){
      let fretNumber = 1;
        while (fretNumber <= numberOfFrets){
        fretNumbers.push(<div key={`fretNumber-${fretNumber}`} className={`${style.fret} ${style.fretnumber}`}>{fretNumber - 1}</div>);
        fretNumber++;
      }
    }
    return fretNumbers;
  }

  renderFrets(guitarSettings, tuner, stringNumber){
    const numberOfFrets = guitarSettings && guitarSettings.numberOfFrets ? guitarSettings.numberOfFrets : null;
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

  renderGuitarNeck(guitarSettings, guitarTuners){
    return guitarTuners && guitarTuners.length
      ? guitarTuners.map((tuner, stringNumber) => {
          return (<div key={`${tuner.number}-${stringNumber}`} className={style.string}>{this.renderFrets(guitarSettings, tuner, parseInt(stringNumber))}</div>)
        })
      : '';
  }

  render() {
    return (<div id="guitar" className={`${style.guitar} ${style.active}`}>
		<div className={`${style.instrumentView} ${style.fretboard}`}>
			<div className={style.tuners}>
				<div className={`${style.fret} ${style.fretnumber}`}>
					Fretno.
				</div>
        {this.renderTunerElements(this.props.guitarTuners, this.props.notes)}
			</div>
			<div className={style.frets}>
        {this.renderFretNumbers(this.props.guitarSettings)}
        {this.renderGuitarNeck(this.props.guitarSettings, this.props.guitarTuners)}
			</div>
		</div>
	</div>)
  }
}

const mapStateToProps = state => ({
  guitarSettings: state.settingsGuitar,
  guitarTuners: state.guitarTuners,
  notes: state.notes
});

const mapDispatchToProps = {
    updateTunerNumber,
    updateGuitarTuners
};


export default connect(mapStateToProps, mapDispatchToProps)(Guitar);
