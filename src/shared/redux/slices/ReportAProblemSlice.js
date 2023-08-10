import {createSlice} from '@reduxjs/toolkit';
import {ReportAProblem} from '../action/ReportAProblem';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ReportAProblemSlice = createSlice({
  name: 'reportAProblem',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ReportAProblem.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ReportAProblem.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ReportAProblem.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ReportAProblemSlice.reducer;
