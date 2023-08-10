import {createSlice} from '@reduxjs/toolkit';
import {RegisterFCM} from '../action/RegisterFCM';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const RegisterFCMSlice = createSlice({
  name: 'registerFCM',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(RegisterFCM.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterFCM.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RegisterFCM.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RegisterFCMSlice.reducer;