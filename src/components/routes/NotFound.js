// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Stylesheets
import style from 'components/routes/NotFound.module.scss';

class NotFound extends Component {

    render() {
        return (<div>
            <h1>404</h1>
            <p>Siden finnes ikke</p>
        </div>)
    }
}

export default connect(null, null)(NotFound);
