import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count : 0,
    cartItems : [],
}

const CartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        setcart : (state, action) => {
            state.cartItems = [...action.payload];
            state.count = state.cartItems.length;
        },

        AddToCart : (state) => {
            state.count += 1;
        },

        DeleteCart : (state) => {
            state.count = 0;
            state.cartItems = [];
        }

    }
})

export const {setcart, AddToCart, DeleteCart} = CartSlice.actions;

export default CartSlice.reducer;