import {createSlice} from '@reduxjs/toolkit';
import {DeleteAccount} from '../action/DeleteAccount';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const DeleteAccountSlice = createSlice({
  name: 'deleteAccount',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(DeleteAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteAccount.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DeleteAccount.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DeleteAccountSlice.reducer;
