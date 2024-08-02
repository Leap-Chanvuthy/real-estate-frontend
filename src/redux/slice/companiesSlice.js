import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  error: null,
  loading: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    fetchCompaniesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCompaniesSuccess(state, action) {
      state.loading = false;
      state.companies = action.payload; // Corrected property name
    },
    fetchCompaniesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCompaniesStart,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
} = companiesSlice.actions;
export default companiesSlice.reducer; // Corrected the slice name
