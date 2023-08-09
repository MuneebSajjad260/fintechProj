import { createSlice } from '@reduxjs/toolkit';
import { CreditPurchase } from '../action/CreditPurchase';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CreditPurchaseSlice = createSlice({
  name: 'creditPurchase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreditPurchase.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CreditPurchase.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CreditPurchase.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CreditPurchaseSlice.reducer;