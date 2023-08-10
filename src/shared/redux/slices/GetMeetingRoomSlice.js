import { createSlice } from '@reduxjs/toolkit';
import { GetMeetingRoom } from '../action/GetMeetingRoom';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetMeetingRoomSlice = createSlice({
  name: 'getMeetingRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMeetingRoom.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetMeetingRoom.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMeetingRoom.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetMeetingRoomSlice.reducer;