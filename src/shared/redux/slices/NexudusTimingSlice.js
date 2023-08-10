import { createSlice } from '@reduxjs/toolkit';
import { NexudusTiming } from '../action/NexudusTiming';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const NexudusTimingSlice = createSlice({
  name: 'nexudusTiming',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NexudusTiming.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(NexudusTiming.fulfilled, (state, action) => {
        console.log('action fulfilled pending', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(NexudusTiming.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default NexudusTimingSlice.reducer;