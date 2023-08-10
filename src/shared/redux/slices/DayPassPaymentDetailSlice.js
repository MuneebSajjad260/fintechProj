import { createSlice } from '@reduxjs/toolkit';
import { DayPassPaymentDetail } from '../action/DayPassPaymentDetail';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassPaymentDetailSlice = createSlice({
  name: 'dayPassPaymentDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassPaymentDetail.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassPaymentDetail.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassPaymentDetail.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassPaymentDetailSlice.reducer;