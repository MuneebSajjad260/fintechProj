import { createSlice } from '@reduxjs/toolkit';
import { DayPassProduct } from '../action/DayPassProduct';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const DayPassProductSlice = createSlice({
  name: 'dayPassProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DayPassProduct.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(DayPassProduct.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(DayPassProduct.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DayPassProductSlice.reducer;