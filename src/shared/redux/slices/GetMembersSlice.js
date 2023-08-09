import {createSlice} from '@reduxjs/toolkit';
import { GetMembers } from '../action/GetMembers';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetMembersSlice = createSlice({
  name: 'getMembers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetMembers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMembers.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMembers.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetMembersSlice.reducer;
