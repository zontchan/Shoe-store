import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: null,
    error: null,
};

export const sendOrder = createAsyncThunk(
    'sendOrder',
    async (data, {rejectWithValue}) => {
        try {
            const response = await fetch(`http://localhost:7070/api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.status !== 200) {
               throw new Error('Server Error!');
            }
            try {
                return await response.json();
            } catch {
                return response;
            }

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearSuccess: (state, action) => {
            state.success = null;
        },
        clearOrderState: (state, action) => {
            state.success = null;
            state.error = null;
        }

    },
    extraReducers: {
        [sendOrder.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [sendOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        [sendOrder.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const {clearSuccess, clearOrderState} = order.actions;
export default  order.reducer;