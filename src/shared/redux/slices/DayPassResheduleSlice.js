import { createSlice } from '@reduxjs/toolkit';
import { DayPassReschedule } from '../action/DayPassReschedule';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassRescheduleSlice = createSlice({
  name: 'dayPassReschedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassReschedule.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassReschedule.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassReschedule.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassRescheduleSlice.reducer;