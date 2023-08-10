import {createSlice} from '@reduxjs/toolkit';
import {PurchaseCredit} from '../action/PurchaseCredit';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const PurchaseCreditSlice = createSlice({
  name: 'purchaseCredit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(PurchaseCredit.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PurchaseCredit.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PurchaseCredit.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PurchaseCreditSlice.reducer;
