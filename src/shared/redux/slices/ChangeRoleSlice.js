import { createSlice } from '@reduxjs/toolkit';
import { ChangeRole } from '../action/ChangeRole';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const ChangeRoleSlice = createSlice({
  name: 'changeRole',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChangeRole.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(ChangeRole.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ChangeRole.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default ChangeRoleSlice.reducer;