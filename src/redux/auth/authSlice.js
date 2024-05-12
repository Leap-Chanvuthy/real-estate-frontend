import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null ,
    loading : null
}


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers  : {
        signInStart : (state) =>  {
            state.loading = true,
            state.error = null
        },
        singInSuccess : (state , action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        signInFailure : (state , action) => {
            state.error = action.payload,
            state.loading = false
        } 
    }
});

export const {signInStart , singInSuccess , signInFailure} = authSlice.actions;
export default authSlice.reducer;