import {createSlice} from '@reduxjs/toolkit';
import {GetSingleInvoiceDetail} from '../action/GetSingleInvoiceDetail';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetSingleInvoiceDetailSlice = createSlice({
  name: 'getSingleInvoiceDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetSingleInvoiceDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSingleInvoiceDetail.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetSingleInvoiceDetail.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetSingleInvoiceDetailSlice.reducer;
