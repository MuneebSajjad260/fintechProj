import {createSlice} from '@reduxjs/toolkit';
import {GetNexudusResources} from '../action/GetNexudusResources';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetNexudusResourcesSlice = createSlice({
  name: 'getNexudusResources',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetNexudusResources.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNexudusResources.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetNexudusResources.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetNexudusResourcesSlice.reducer;
