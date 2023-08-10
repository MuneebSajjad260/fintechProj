import { createSlice } from '@reduxjs/toolkit';
import { CheckVisitor } from '../action/CheckVisitor';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CheckVisitorSlice = createSlice({
  name: 'checkVisitor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CheckVisitor.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CheckVisitor.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CheckVisitor.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CheckVisitorSlice.reducer;