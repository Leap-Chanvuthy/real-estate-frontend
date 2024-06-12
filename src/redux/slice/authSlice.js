import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,  // Ensure loading is initially set to false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    updateUserProfile(state, action) {
      state.currentUser = { ...state.currentUser.authorisation, ...action.payload };
    },
  },
});

export default authSlice.reducer;
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  updateUserProfile,
} = authSlice.actions;
