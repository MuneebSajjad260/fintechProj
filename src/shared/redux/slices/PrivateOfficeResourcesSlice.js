import { createSlice } from '@reduxjs/toolkit';
import { PrivateOfficeResources } from '../action/PrivateOfficeResources';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const PrivateOfficeResourcesSlice = createSlice({
  name: 'privateOfficeResources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PrivateOfficeResources.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(PrivateOfficeResources.fulfilled, (state, action) => {
        // console.log("action filfilled", action.payload.data)
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PrivateOfficeResources.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default PrivateOfficeResourcesSlice.reducer;