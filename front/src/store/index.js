import { configureStore } from '@reduxjs/toolkit';
import bestSellersReducer from "../reducers/bestSellersReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import catalogReducer from "../reducers/catalogReducer";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
import orderReducer from "../reducers/orderReducer";

const store = configureStore({
    reducer: {
        bestSellers: bestSellersReducer,
        categories: categoriesReducer,
        catalog: catalogReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store;
