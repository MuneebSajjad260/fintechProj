import { createSlice } from '@reduxjs/toolkit';
import { BookedSlots } from '../action/BookedSlots';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const BookingSettingSlice = createSlice({
  name: 'bookedSlots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BookedSlots.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(BookedSlots.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(BookedSlots.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default BookingSettingSlice.reducer;