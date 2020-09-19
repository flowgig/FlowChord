// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Guitar from 'components/partials/instruments/Guitar';

// Stylesheets
import style from 'components/routes/Home.module.scss';

class Home extends Component {

    render() {
        return (<div>
            <h1>Home</h1>
            <Guitar />
        </div>)
    }
}

export default connect(null, null)(Home);
