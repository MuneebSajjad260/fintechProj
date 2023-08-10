import { createSlice } from '@reduxjs/toolkit';
import { GetMeetingNewTimeLine } from '../action/GetMeetingNewTimeLine';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetMeetingNewTimeLineSlice = createSlice({
  name: 'getMeetingNewTimeLine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMeetingNewTimeLine.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetMeetingNewTimeLine.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMeetingNewTimeLine.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetMeetingNewTimeLineSlice.reducer;