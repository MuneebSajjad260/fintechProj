import { createSlice } from '@reduxjs/toolkit';
import { DayPassCheck } from '../action/DayPassCheck';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassCheckSlice = createSlice({
  name: 'dayPassCheck',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassCheck.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassCheck.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassCheck.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassCheckSlice.reducer;