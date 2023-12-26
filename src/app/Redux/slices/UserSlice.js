import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name : "",
    email : "",
    status : false
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state, action) =>{
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.status = true;
        },

        logout : (state) =>{
            state.name = "";
            state.email = "";
            state.status = false;
        }
    }
})

export const {login, logout} = userSlice.actions;   

export default userSlice.reducer;   