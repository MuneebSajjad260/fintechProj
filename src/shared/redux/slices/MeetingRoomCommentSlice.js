import { createSlice } from '@reduxjs/toolkit';
import { MeetingRoomComment } from '../action/MeetingRoomComment';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const MeetingRoomCommentSlice = createSlice({
  name: 'meetingRoomComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(MeetingRoomComment.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(MeetingRoomComment.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(MeetingRoomComment.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default MeetingRoomCommentSlice.reducer;