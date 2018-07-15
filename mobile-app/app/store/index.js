import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const middleware = applyMiddleware(promise(), thunk);

export default createStore(reducer, composeWithDevTools(middleware));
