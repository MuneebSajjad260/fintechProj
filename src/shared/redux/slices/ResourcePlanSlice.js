import { createSlice } from '@reduxjs/toolkit';
import { ResourcePlan } from '../action/ResourcePlan';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const ResourcePlanSlice = createSlice({
  name: 'resourcePlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ResourcePlan.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(ResourcePlan.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ResourcePlan.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default ResourcePlanSlice.reducer;