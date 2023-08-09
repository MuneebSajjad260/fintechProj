import {createSlice} from '@reduxjs/toolkit';
import {ForgotPassword} from '../action/ForgotPassword';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ForgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ForgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ForgotPasswordSlice.reducer;
