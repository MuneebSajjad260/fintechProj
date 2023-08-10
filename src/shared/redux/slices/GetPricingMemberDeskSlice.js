import { createSlice } from '@reduxjs/toolkit';
import { GetPricingMemberDesk } from '../action/GetPricingMemberDesk';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetPricingMemberDeskSlice = createSlice({
  name: 'getPricingMemberDesk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPricingMemberDesk.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetPricingMemberDesk.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetPricingMemberDesk.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetPricingMemberDeskSlice.reducer;