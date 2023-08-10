import { createSlice } from '@reduxjs/toolkit';
import { MeetingRoomPrice } from '../action/MeetingRoomPrice';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const MeetingRoomPriceSlice = createSlice({
  name: 'meetingRoomPrice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MeetingRoomPrice.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(MeetingRoomPrice.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(MeetingRoomPrice.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default MeetingRoomPriceSlice.reducer;