import {createSlice} from '@reduxjs/toolkit';
import {GetQRCodeAccessStatus} from '../action/GetQRCodeAccessStatus';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetQRCodeAccessStatusSlice = createSlice({
  name: 'getQRCodeAccessStatus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetQRCodeAccessStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetQRCodeAccessStatus.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetQRCodeAccessStatus.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetQRCodeAccessStatusSlice.reducer;
