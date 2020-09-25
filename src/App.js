// Dependecies
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import WebFont from 'webfontloader';
import { ThemeProvider } from '@material-ui/styles';

// Utils
import configureStore, {history} from 'utils/configureStore';

// Routes
import Home from 'components/routes/Home';
import NotFound from 'components/routes/NotFound';

// Partials
import MainAppBar from 'components/partials/MainAppBar';

// Stylesheets
import style from 'App.module.scss';
import theme from 'theme';

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
        <ThemeProvider theme={theme}>
        <div className={style.app}>
          <MainAppBar />
          <Switch>
            <Route exact={true} path="/" render={(props) => (<Home {...props}/>)}/>
            <Route render={() => (<NotFound/>)}/>
          </Switch>
        </div>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>);
  }
}

export default App;
