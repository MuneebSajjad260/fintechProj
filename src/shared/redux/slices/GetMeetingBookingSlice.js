import { createSlice } from '@reduxjs/toolkit';
import { GetMeetingBooking } from '../action/GetMeetingBooking';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetMeetingBookingSlice = createSlice({
  name: 'getMeetingBooking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMeetingBooking.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetMeetingBooking.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMeetingBooking.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetMeetingBookingSlice.reducer;