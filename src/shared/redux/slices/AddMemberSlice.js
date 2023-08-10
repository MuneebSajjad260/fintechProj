import { createSlice } from '@reduxjs/toolkit';
import { AddMember } from '../action/AddMember';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const AddMemberSlice = createSlice({
  name: 'addMember',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddMember.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(AddMember.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(AddMember.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default AddMemberSlice.reducer;