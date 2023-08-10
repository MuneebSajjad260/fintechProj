import { createSlice } from '@reduxjs/toolkit';
import { MeetingRoomReschedule } from '../action/MeetingRoomReschedule';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const MeetingRoomRescheduleSlice = createSlice({
  name: 'meetingRoomReschedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MeetingRoomReschedule.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(MeetingRoomReschedule.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(MeetingRoomReschedule.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default MeetingRoomRescheduleSlice.reducer;