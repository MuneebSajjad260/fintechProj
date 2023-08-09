import { createSlice } from '@reduxjs/toolkit';
import { DayPassUpload } from '../action/DayPassUpload';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassUploadSlice = createSlice({
  name: 'dayPassUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassUpload.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassUpload.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassUpload.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassUploadSlice.reducer;