import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import crochetReducer from './Crochet/crochetSlice';
import productReducer from './user/userSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        crochet: crochetReducer,
        products: productReducer,
    },
});

export default store;
