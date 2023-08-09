import { createSlice } from '@reduxjs/toolkit';
import { PendingStatus } from '../action/PendingStatus';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const PendingStatusSlice = createSlice({
  name: 'pendingStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PendingStatus.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(PendingStatus.fulfilled, (state, action) => {
        console.log('action fulfilled pending', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PendingStatus.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default PendingStatusSlice.reducer;