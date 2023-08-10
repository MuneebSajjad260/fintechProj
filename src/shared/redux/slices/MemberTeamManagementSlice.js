import { createSlice } from '@reduxjs/toolkit';
import { MemberTeamManagement } from '../action/MemberTeamManagement';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const MemberTeamManagementSlice = createSlice({
  name: 'memberTeamManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MemberTeamManagement.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(MemberTeamManagement.fulfilled, (state, action) => {
        console.log('action fulfilled pending', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(MemberTeamManagement.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default MemberTeamManagementSlice.reducer;