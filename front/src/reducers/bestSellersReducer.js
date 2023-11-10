import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: null,
    error: null,
};
export const getBestSellers = createAsyncThunk(
    'getBestSellers',
    async (phoneNumber, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:7070/api/top-sales`);

            if (response.status !== 200) {
                throw new Error('Server Error!');
            }
            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const bestSellers = createSlice({
    name: 'bestSellers',
    initialState,
    reducers: {},
    extraReducers: {
        [getBestSellers.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [getBestSellers.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.data = action.payload;
        },
        [getBestSellers.rejected]: (state, action) => {
            state.error = action.payload;
            state.status = 'rejected';
        },
    }
});



export default  bestSellers.reducer;