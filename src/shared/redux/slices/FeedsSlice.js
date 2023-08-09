import { createSlice } from '@reduxjs/toolkit';
import { Feeds } from '../action/Feeds';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const FeedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase( Feeds.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase( Feeds.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase( Feeds.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default FeedsSlice.reducer;