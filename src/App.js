// Dependecies
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import WebFont from 'webfontloader';

// Utils
import configureStore, {history} from 'utils/configureStore';

// Routes
import Home from 'components/routes/Home';
import NotFound from 'components/routes/NotFound';

// Partials
import NavigationBar from 'components/partials/NavigationBar';

// Stylesheets
import style from 'App.module.scss';

WebFont.load({
  google: {
    families: ['Roboto:400,700&display=swap']
  }
});

const initialState = {};
const store = configureStore(initialState);

class App extends Component {
  render() {
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={style.app}>
          <NavigationBar />
          <Switch>
            <Route exact={true} path="/" render={(props) => (<Home {...props}/>)}/>
            <Route render={() => (<NotFound/>)}/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>);
  }
}

export default App;
