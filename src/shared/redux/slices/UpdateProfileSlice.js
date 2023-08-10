import {createSlice} from '@reduxjs/toolkit';
import { UpdateProfile } from '../action/UpdateProfile';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UpdateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UpdateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UpdateProfileSlice.reducer;
