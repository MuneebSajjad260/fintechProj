import { createSlice } from '@reduxjs/toolkit';
import { CreditHistory } from '../action/CreditHistory';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CreditHistorySlice = createSlice({
  name: 'creditHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreditHistory.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CreditHistory.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CreditHistory.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CreditHistorySlice.reducer;