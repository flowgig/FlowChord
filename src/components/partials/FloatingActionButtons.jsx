// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// OutputAudio
import Synthesizer from 'components/outputAudio/Synthesizer';

// Stylesheets
import style from 'components/partials/FloatingActionButtons.module.scss';

class FloatingActionButtons extends Component {
    render() {
        return (<div className={style.floatingActionButtons}>
            <Synthesizer />
        </div>)
    }
}



export default connect(null, null)(FloatingActionButtons);
