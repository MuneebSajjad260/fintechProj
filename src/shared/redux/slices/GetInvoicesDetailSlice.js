import { createSlice } from '@reduxjs/toolkit';
import { GetInvoicesDetail } from '../action/GetInvoicesDetail';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetInvoicesDetailSlice = createSlice({
  name: 'getInvoicesDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetInvoicesDetail.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetInvoicesDetail.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetInvoicesDetail.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetInvoicesDetailSlice.reducer;