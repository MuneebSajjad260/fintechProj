import { createSlice } from '@reduxjs/toolkit';
import { OtpGenerate } from '../action/OtpGenerate';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const OtpGenerateSlice = createSlice({
  name: 'otpGenerate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OtpGenerate.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(OtpGenerate.fulfilled, (state, action) => {
        console.log('action fulfilled pending', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(OtpGenerate.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default OtpGenerateSlice.reducer;