import {createSlice} from '@reduxjs/toolkit';
import {PatchNotificationSettings} from '../action/PatchNotificationSettings';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const PatchNotificationSettingsSlice = createSlice({
  name: 'patchNotificationSettings',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(PatchNotificationSettings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PatchNotificationSettings.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PatchNotificationSettings.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PatchNotificationSettingsSlice.reducer;
