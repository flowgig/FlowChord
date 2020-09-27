// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Note from 'components/partials/Note';

// Stylesheets
import style from 'components/partials/instruments/Keyboard/KeyboardKey.module.scss';


class KeyboardKey extends Component {

	getKeyNumber(keyIndex, lowestNote){
		return (keyIndex + lowestNote) % 12;
	}

  render() {
    const keyNumber = this.getKeyNumber(this.props.keyIndex, this.props.lowestNote);
    const note = this.props.notes[keyNumber];
    const keyColor = note.keycolor;

    return (<div className={`${style.keyboardKey} ${style[keyColor]}`}>
      <div className={style.keyName}>
        <Note note={note} keyNumber={keyNumber} keyColor={keyColor} />
      </div>
      </div>)
  }
}

KeyboardKey.propTypes = {
  keyIndex: PropTypes.number,
  lowestNote: PropTypes.number,
}

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(mapStateToProps, null)(KeyboardKey);
