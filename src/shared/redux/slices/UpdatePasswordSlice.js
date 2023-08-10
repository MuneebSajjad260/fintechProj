import {createSlice} from '@reduxjs/toolkit';
import {UpdatePassword} from '../action/UpdatePassword';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UpdatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UpdatePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UpdatePasswordSlice.reducer;