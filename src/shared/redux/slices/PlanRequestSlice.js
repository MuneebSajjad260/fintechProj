import { createSlice } from '@reduxjs/toolkit';
import { PlanRequest } from '../action/PlanRequest';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const PlanRequestSlice = createSlice({
  name: 'planRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PlanRequest.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(PlanRequest.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(PlanRequest.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default PlanRequestSlice.reducer;