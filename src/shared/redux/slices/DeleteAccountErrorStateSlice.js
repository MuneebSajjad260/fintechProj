import {createSlice} from '@reduxjs/toolkit';
import {DeleteAccountErrorState} from '../action/DeleteAccountErrorState';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const DeleteAccountErrorStateSlice = createSlice({
  name: 'deleteAccountErrorState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(DeleteAccountErrorState.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteAccountErrorState.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DeleteAccountErrorState.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DeleteAccountErrorStateSlice.reducer;
