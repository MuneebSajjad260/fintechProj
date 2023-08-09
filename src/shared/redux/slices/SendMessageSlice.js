import {createSlice} from '@reduxjs/toolkit';
import {SendMessage} from '../action/SendMessage';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const SendMessageSlice = createSlice({
  name: 'sendMessage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(SendMessage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SendMessage.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(SendMessage.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SendMessageSlice.reducer;
