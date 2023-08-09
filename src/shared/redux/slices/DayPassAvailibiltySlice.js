import { createSlice } from '@reduxjs/toolkit';
import { DayPassAvailibilty } from '../action/DayPassAvailibility';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassAvailibilitySlice = createSlice({
  name: 'dayPassAvailibilty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassAvailibilty.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassAvailibilty.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassAvailibilty.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassAvailibilitySlice.reducer;