import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import crochetReducer from './Crochet/crochetReducers';

const store = createStore (crochetReducer, applyMiddleware(logger))

export default store