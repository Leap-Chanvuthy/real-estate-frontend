import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  agents: [], // Corrected key name from 'properties' to 'agents'
  error: null,
  loading: false,
};

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    fetchAgentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAgentsSuccess(state, action) {
      state.loading = false;
      state.agents = action.payload; // Corrected key name from 'properties' to 'agents'
    },
    fetchAgentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default agentsSlice.reducer;
export const {
  fetchAgentsStart,
  fetchAgentsSuccess,
  fetchAgentsFailure,
} = agentsSlice.actions;
