import { createSlice } from '@reduxjs/toolkit';
import { TeamSettings } from '../action/TeamSettings';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const TeamSettingsSlice = createSlice({
  name: 'teamSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TeamSettings.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(TeamSettings.fulfilled, (state, action) => {
        // console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(TeamSettings.rejected, (state, action) => {
        // console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default TeamSettingsSlice.reducer;