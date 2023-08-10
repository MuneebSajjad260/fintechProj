import { createSlice } from '@reduxjs/toolkit';
import { ScheduleFilter } from '../action/ScheduleFilter';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const ScheduleFilterSlice = createSlice({
  name: 'scheduleFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ScheduleFilter.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(ScheduleFilter.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ScheduleFilter.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default ScheduleFilterSlice.reducer;