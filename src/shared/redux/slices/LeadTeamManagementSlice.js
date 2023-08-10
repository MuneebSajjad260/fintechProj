import { createSlice } from '@reduxjs/toolkit';
import { LeadTeamManagement } from '../action/LeadTeamManagement';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const LeadTeamManagementSlice = createSlice({
  name: 'leadTeamManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LeadTeamManagement.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(LeadTeamManagement.fulfilled, (state, action) => {
        console.log('action fulfilled pending', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(LeadTeamManagement.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default LeadTeamManagementSlice.reducer;