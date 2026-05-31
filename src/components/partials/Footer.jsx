// Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Assets
import FlowChordLogo from 'assets/svg/flowchord-logo-gray-vertical.svg';

// Stylesheets
import style from 'components/partials/Footer.module.scss';

class Selection extends Component {
  render() {
    return (<div className={style.footer}>
      <div className={style.logo}>
        <img src={FlowChordLogo} alt="FlowChord logo" />
      </div>
      <div className={style.text}>
        <p>FlowChord licensed under <a href="https://github.com/flowgig/FlowChord/blob/master/LICENSE">GNU General Public License</a></p>
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
