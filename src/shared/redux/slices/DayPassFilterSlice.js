import { createSlice } from '@reduxjs/toolkit';
import { DayPassFilter } from '../action/DayPassFilter';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassFilterSlice = createSlice({
  name: 'dayPassFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassFilter.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassFilter.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassFilter.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassFilterSlice.reducer;