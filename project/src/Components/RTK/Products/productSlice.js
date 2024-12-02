import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    crochet: [],
    error: '',
};

// Async Thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:4000/Products');
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.crochet = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.crochet = [];
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
