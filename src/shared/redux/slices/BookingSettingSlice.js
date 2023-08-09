import { createSlice } from '@reduxjs/toolkit';
import { BookingSetting } from '../action/BookingSetting';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const BookingSettingSlice = createSlice({
  name: 'bookingSetting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BookingSetting.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(BookingSetting.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(BookingSetting.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default BookingSettingSlice.reducer;