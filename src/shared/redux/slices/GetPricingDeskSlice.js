import { createSlice } from '@reduxjs/toolkit';
import { GetPricingDesk } from '../action/GetPricingDesk';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetPricingDeskSlice = createSlice({
  name: 'getPricingDesk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPricingDesk.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetPricingDesk.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetPricingDesk.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetPricingDeskSlice.reducer;