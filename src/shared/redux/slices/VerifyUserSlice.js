import {createSlice} from '@reduxjs/toolkit';
import {VerifyUser} from '../action/VerifyUser';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const VerifyUserSlice = createSlice({
  name: 'verifyUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(VerifyUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(VerifyUser.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default VerifyUserSlice.reducer;
