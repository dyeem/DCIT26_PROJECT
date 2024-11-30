import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numOfCrochet: 5,
};

const crochetSlice = createSlice({
    name: 'crochet',
    initialState,
    reducers: {
        ordered: (state, action) => {
            state.numOfCrochet -= action.payload;
        },
        restocked: (state, action) => {
            state.numOfCrochet += action.payload;
        },
    },
});

export const crochetActions = crochetSlice.actions;
export default crochetSlice.reducer;
