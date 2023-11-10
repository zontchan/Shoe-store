import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const getProduct = createAsyncThunk(
    'getProduct',
    async (id, {rejectWithValue}) => {
        try {
            const response = await fetch(` http://localhost:7070/api/items/${id}`);

            if (response.status !== 200) {
                throw new Error('Server Error!');
            }
            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getProduct.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [getProduct.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});


export default product.reducer;