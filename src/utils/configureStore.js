// Dependencies
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { thunk } from 'redux-thunk';

// Reducers
import createRootReducer from 'reducers';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  createRootReducer(routerReducer),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware))
);

export const history = createReduxHistory(store);
export default store;
