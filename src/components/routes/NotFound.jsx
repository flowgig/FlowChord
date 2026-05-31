// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';


class NotFound extends Component {

    render() {
        return (<div>
            <h1>404</h1>
            <p>Siden finnes ikke</p>
        </div>)
    }
}

export default connect(null, null)(NotFound);
