import {createSlice} from '@reduxjs/toolkit';
import { Tax } from '../action/Tax';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const TaxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Tax.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Tax.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(Tax.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TaxSlice.reducer;
