import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory, createHashHistory } from 'history';
import thunkMiddleWare from 'redux-thunk';
import { getIEVersion } from '~/logic/common/browser/getIEVersion';
import reducer from './reducer';

let history = getIEVersion() < 10 ? createHashHistory() : createBrowserHistory();

const middlewares = [
  routerMiddleware(history),
  thunkMiddleWare
];
const REDUX_DEVTOOLS_EXTENSION = (process.env.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer(history), REDUX_DEVTOOLS_EXTENSION);

export default store;
