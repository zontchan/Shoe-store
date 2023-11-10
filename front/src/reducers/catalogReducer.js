import {createSlice} from "@reduxjs/toolkit";
import queryString from 'query-string';

const initialState = {
    data: [],
    loading: false,
    error: null,
    getMoreError: null,
    offset: 0,
    isMore: true,
    searchValue: '',
};

export const catalog = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setIsMore: (state, action) => {
            state.isMore = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        getProductsRequest: (state, action) => {
          state.loading = action.payload;
          state.error = null;
          state.getMoreError = null;
        },
        getProductsSuccess: (state, action) => {
          state.loading = false;
          if(action.payload.length < 6) state.isMore = false;
          state.data = action.payload;
        },
        getMoreProductsSuccess: (state, action) => {
            state.loading = false;
            if (action.payload.length === 0 || action.payload.length < 6) state.isMore = false;
            state.data.push(...action.payload);
        },
        getMoreProductsFailure: (state, action) => {
            state.loading = false;
            state.getMoreError = action.payload;
        },
        getProductsFailure: (state, action) => {
           state.loading = false;
           state.error = action.payload;
        },
        clearProducts: (state, action) => {
            state.data = [];
        }
    },
});

const baseUrl = 'http://localhost:7070/api/';
export const getProducts = (offset) => async (dispatch, getState) => {
    const { catalog: { searchValue }, categories: { categoryId },  } = getState();
    dispatch(getProductsRequest(true));
    if(!offset) dispatch(clearProducts());

    const params = queryString.stringify({ offset, categoryId, q: searchValue });
    const fetchUrl = `${baseUrl}items?${params}`;

    try {
        const response = await fetch(fetchUrl);

        const data = await response.json();

        if (offset === 0) {
            dispatch(getProductsSuccess(data));
        }
        if (offset > 0) {
            dispatch(getMoreProductsSuccess(data));
        }
    } catch (error) {
        if (offset > 0) {
            dispatch(getMoreProductsFailure(error.message));
        }
        else {
            dispatch(getProductsFailure(error.message));
        }
    }
};


export const {setIsMore,
              setSearchValue,
              getProductsSuccess,
              getMoreProductsSuccess,
              getMoreProductsFailure,
              getProductsFailure,
              getProductsRequest,
              clearProducts} = catalog.actions;
export default catalog.reducer;
