import {createSlice} from '@reduxjs/toolkit';
import { RemoveMember } from '../action/RemoveMember';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const RemoveMemberSlice = createSlice({
  name: 'removeMember',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(RemoveMember.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveMember.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RemoveMember.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default RemoveMemberSlice.reducer;
