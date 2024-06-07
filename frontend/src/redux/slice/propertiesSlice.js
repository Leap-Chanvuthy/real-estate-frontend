import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  error: null, 
  loading: false, 
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    fetchPropertiesStart(state) {
      state.loading = true; 
      state.error = null; 
    },
    fetchPropertiesSuccess(state, action) {
      state.loading = false; 
      state.properties = action.payload; 
    },
    fetchPropertiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload; 
    },
  },
});

export default propertiesSlice.reducer;
export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
} = propertiesSlice.actions;
