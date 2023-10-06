import { createSlice } from '@reduxjs/toolkit';
import { CancelDayPassOnBack } from '../action/CancelDayPassOnBack';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const CancelDayPassOnBackSlice = createSlice({
  name: 'cancelDayPassOnBack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CancelDayPassOnBack.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(CancelDayPassOnBack.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CancelDayPassOnBack.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default CancelDayPassOnBackSlice.reducer;