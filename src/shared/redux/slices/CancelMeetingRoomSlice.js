import { createSlice } from '@reduxjs/toolkit';
import { CancelMeetingRoom } from '../action/CancelMeetingRoom';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CancelMeetingRoomSlice = createSlice({
  name: 'cancelMeetingRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CancelMeetingRoom.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CancelMeetingRoom.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CancelMeetingRoom.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CancelMeetingRoomSlice.reducer;