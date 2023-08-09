import { createSlice } from '@reduxjs/toolkit';
import { MeetingRoomRequest } from '../action/MeetingRoomRequest';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const MeetingRoomRequestSlice = createSlice({
  name: 'meetingRoomRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MeetingRoomRequest.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(MeetingRoomRequest.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(MeetingRoomRequest.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default MeetingRoomRequestSlice.reducer;