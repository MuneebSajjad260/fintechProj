import {createSlice} from '@reduxjs/toolkit';
import {SubmitInvoice} from '../action/SubmitInvoice';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const SubmitInvoiceSlice = createSlice({
  name: 'submitInvoice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(SubmitInvoice.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SubmitInvoice.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(SubmitInvoice.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SubmitInvoiceSlice.reducer;
