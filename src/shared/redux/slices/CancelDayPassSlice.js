import { createSlice } from '@reduxjs/toolkit';
import { CancelDayPass } from '../action/CancelDayPass';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CancelDayPassSlice = createSlice({
  name: 'cancelDayPass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CancelDayPass.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CancelDayPass.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CancelDayPass.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CancelDayPassSlice.reducer;