import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
    reducer: {
        user : UserSlice,
        cart : CartSlice
    }
})

export default store;