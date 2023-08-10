import { createSlice } from '@reduxjs/toolkit';
import { GetPendingPlan } from '../action/GetPendingPlan';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetPendingPlanSlice = createSlice({
  name: 'getPendingPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPendingPlan.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetPendingPlan.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetPendingPlan.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetPendingPlanSlice.reducer;