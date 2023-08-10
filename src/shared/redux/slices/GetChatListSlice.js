import {createSlice} from '@reduxjs/toolkit';
import {GetChatList} from '../action/GetChatList';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetChatListSlice = createSlice({
  name: 'getChatList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetChatList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetChatList.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetChatList.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetChatListSlice.reducer;
