import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyTypes: [],
  error: null,
  loading: false,
};

const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState,
  reducers: {
    fetchPropertyTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPropertyTypesSuccess(state, action) {
      state.loading = false;
      state.propertyTypes = action.payload; // Corrected property name
    },
    fetchPropertyTypesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPropertyTypesStart,
  fetchPropertyTypesSuccess,
  fetchPropertyTypesFailure,
} = propertyTypesSlice.actions;
export default propertyTypesSlice.reducer; // Corrected the slice name
