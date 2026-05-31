// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Guitar from 'components/partials/instruments/Guitar';
import Keyboard from 'components/partials/instruments/Keyboard';


class Home extends Component {

    render() {
        return (<div>
            <Guitar />
            <Keyboard />
        </div>)
    }
}

export default connect(null, null)(Home);
