import { createSlice } from '@reduxjs/toolkit';
import { DayPassPrice } from '../action/DayPassPrice';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassPriceSlice = createSlice({
  name: 'dayPassPrice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassPrice.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassPrice.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassPrice.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassPriceSlice.reducer;