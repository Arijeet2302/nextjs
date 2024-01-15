import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0,
    cartItems : [],
}

const CartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        AddToCart : (state, action) => {
            state.count += 1;
            state.cartItems.push(action.payload);
        },

        DeleteItem : (state, action) => {
            state.count -= 1;
            const item = state.cartItems.indexOf(action.payload);
            state.cartItems.splice(item, 1);
        },

        DeleteCart : (state) => {
            state.count = 0;
            state.cartItems = [];
        }

    }
})

export const {AddToCart, DeleteItem, DeleteCart} = CartSlice.actions;

export default CartSlice.reducer;