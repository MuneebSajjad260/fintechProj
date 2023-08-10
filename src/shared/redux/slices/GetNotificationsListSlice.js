import {createSlice} from '@reduxjs/toolkit';
import {GetNotificationsList} from '../action/GetNotificationsList';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetNotificationsListSlice = createSlice({
  name: 'getNotificationsList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetNotificationsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNotificationsList.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetNotificationsList.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetNotificationsListSlice.reducer;
