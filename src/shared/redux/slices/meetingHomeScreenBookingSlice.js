import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  confirmBooking: {},

};

export const meetingHomeScreenBookingSlice = createSlice({
  name: 'Booking',
  initialState,
  reducers: {
    setConfirmBooking: (state, action) => {

      state.confirmBooking = action.payload;
    },

  }
});

export const {
  setConfirmBooking

} = meetingHomeScreenBookingSlice.actions;

export const selectConfirmBooking = (state) => state.Booking.confirmBooking;


export default meetingHomeScreenBookingSlice.reducer;