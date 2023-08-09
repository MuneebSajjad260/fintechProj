import { createSlice } from '@reduxjs/toolkit';
import { GetSinglePlan } from '../action/GetSinglePlan';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetSinglePlanSlice = createSlice({
  name: 'getSinglePlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSinglePlan.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetSinglePlan.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetSinglePlan.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetSinglePlanSlice.reducer;