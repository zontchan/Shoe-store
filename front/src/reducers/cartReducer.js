import {createSlice} from "@reduxjs/toolkit";
import {getCartFromLocalStorage} from "../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../utils/calcTotalPrice";

const {items, totalPrice} = getCartFromLocalStorage();

const initialState = {
    items,
    totalPrice,
    loading: false,
    error: null,
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.items.findIndex((o) => o.id === action.payload.id && o.selectedSize === action.payload.selectedSize);
            if(itemIndex !== -1){
                if(state.items[itemIndex].selectedSize === action.payload.selectedSize) {
                    state.items[itemIndex].amount += action.payload.amount;
                    state.items[itemIndex].totalItemPrice = state.items[itemIndex].amount * state.items[itemIndex].price;
                }
                else{
                    state.items.push({...action.payload, totalItemPrice: action.payload.price * action.payload.amount});
                }
            }
            else{
                state.items.push({...action.payload, totalItemPrice: action.payload.price * action.payload.amount});
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((o) => !(o.id === action.payload.id && o.selectedSize === action.payload.size));
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearCart: (state, action) => {
            state.items = [];
            state.totalPrice = calcTotalPrice(state.items);
        }
    },
});


export const {addItem, deleteItem, clearCart} = cart.actions;
export default  cart.reducer;