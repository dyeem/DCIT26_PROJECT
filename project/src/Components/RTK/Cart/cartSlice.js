import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userCart: [],
};

const userCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addedCart: (state, action) => {
            state.userCart.push(action.payload);
        },
        removedCart: (state, action) => {
            state.userCart = state.userCart.filter(item => item.id !== action.payload.id);
        },
    },
});

export const cartActions = userCartSlice.actions;
export default userCartSlice.reducer;
