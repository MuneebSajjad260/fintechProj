import {createSlice} from '@reduxjs/toolkit';
import {UpdatePlanRequest} from '../action/UpdatePlanRequest';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UpdatePlanRequestSlice = createSlice({
  name: 'updatePlanRequest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UpdatePlanRequest.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePlanRequest.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UpdatePlanRequest.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UpdatePlanRequestSlice.reducer;
