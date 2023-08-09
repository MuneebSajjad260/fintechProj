import { createSlice } from '@reduxjs/toolkit';
import { DayPassComment } from '../action/DayPassComment';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassCommentSlice = createSlice({
  name: 'dayPassComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassComment.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassComment.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassComment.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassCommentSlice.reducer;