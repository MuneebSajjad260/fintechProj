import { createSlice } from '@reduxjs/toolkit';
import { GetCreditsProducts } from '../action/GetCreditsProducts';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetCreditsProductsSlice = createSlice({
  name: 'getInvoicesDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCreditsProducts.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetCreditsProducts.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetCreditsProducts.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetCreditsProductsSlice.reducer;