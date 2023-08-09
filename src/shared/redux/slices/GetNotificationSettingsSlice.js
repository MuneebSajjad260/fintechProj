import {createSlice} from '@reduxjs/toolkit';
import {GetNotificationSettings} from '../action/GetNotificationSettings';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetNotificationSettingsSlice = createSlice({
  name: 'getNotificationSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetNotificationSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNotificationSettings.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetNotificationSettings.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetNotificationSettingsSlice.reducer;
