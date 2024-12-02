import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import productReducer from './Products/productSlice';
import cartReducer from './Cart/cartSlice';
import userReducer from './user/userSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        products: productReducer,
        carts: cartReducer,
        user: userReducer
    },
});

export default store;
