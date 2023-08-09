import { createSlice } from '@reduxjs/toolkit';
import { GetDayPassBookings } from '../action/GetDayPassBookings';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetDayPassBookingsSlice = createSlice({
  name: 'getDayPassBookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDayPassBookings.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetDayPassBookings.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetDayPassBookings.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetDayPassBookingsSlice.reducer;