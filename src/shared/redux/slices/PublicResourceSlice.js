import { createSlice } from '@reduxjs/toolkit';
import { PublicResources } from '../action/PublicResources';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const PublicResourceSlice = createSlice({
  name: 'publicResources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PublicResources.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(PublicResources.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PublicResources.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default PublicResourceSlice.reducer;