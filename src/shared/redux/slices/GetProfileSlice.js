import { createSlice } from '@reduxjs/toolkit';
import { GetProfile } from '../action/GetProfile';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetProfileSlice = createSlice({
  name: 'getProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProfile.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetProfileSlice.reducer;