import { createSlice } from '@reduxjs/toolkit';
import { PoolTeamCredit } from '../action/PoolTeamCredit';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const PoolTeamCreditSlice = createSlice({
  name: 'poolTeamCredit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PoolTeamCredit.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(PoolTeamCredit.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PoolTeamCredit.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default PoolTeamCreditSlice.reducer;