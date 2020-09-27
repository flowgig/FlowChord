// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Components
import KeyboardKey from 'components/partials/instruments/Keyboard/KeyboardKey';

// Stylesheets
import style from 'components/partials/instruments/Keyboard.module.scss';

class Keyboard extends Component {
  renderKeys(settingsKeyboard){
    const numberOfKeys = settingsKeyboard && settingsKeyboard.numberOfKeys ? settingsKeyboard.numberOfKeys : 0;
    const lowestNote = settingsKeyboard && settingsKeyboard.lowestNote ? settingsKeyboard.lowestNote : 0;
    let keys = [];
    if (numberOfKeys){
      let keyIndex = 0;
      while (keyIndex < numberOfKeys){
        keys.push(<KeyboardKey key={`key-${keyIndex}`} keyIndex={keyIndex} lowestNote={lowestNote} />);
        keyIndex++;
      }
    }
    return keys;
  }

  render() {
    return this.props.settingsKeyboard && this.props.settingsKeyboard.show
      ? (<div id="keyboard" className={`${style.keyboard} ${style.active}`}>
        {this.renderKeys(this.props.settingsKeyboard)}
	</div>) : ''
  }
}

const mapStateToProps = state => ({
  settingsKeyboard: state.settingsKeyboard,
  notes: state.notes
});

export default connect(mapStateToProps, null)(Keyboard);
