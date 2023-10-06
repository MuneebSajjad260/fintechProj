import { createSlice } from '@reduxjs/toolkit';
import { CancelMeetingRoomOnBack } from '../action/CancelMeetingRoomOnBack';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CancelMeetingRoomOnBackSlice = createSlice({
  name: 'cancelMeetingRoomOnBack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CancelMeetingRoomOnBack.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CancelMeetingRoomOnBack.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CancelMeetingRoomOnBack.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CancelMeetingRoomOnBackSlice.reducer;