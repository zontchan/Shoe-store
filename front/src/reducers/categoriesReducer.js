import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    categoryId: 0,
    loading: false,
    error: null,
};

export const getCategories = createAsyncThunk(
    'getCategories',
    async (arg, {rejectWithValue}) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}categories`);

            if (response.status !== 200) {
                throw new Error('Server Error!');
            }
            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setActive: (state,action) => {
            state.categoryId = action.payload;
        }
    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});




export const {setActive} = categories.actions;
export default categories.reducer;