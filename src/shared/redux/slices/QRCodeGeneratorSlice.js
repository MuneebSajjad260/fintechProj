import {createSlice} from '@reduxjs/toolkit';
import {QRCodeGenerator} from '../action/QRCodeGenerator';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const QRCodeGeneratorSlice = createSlice({
  name: 'qRCodeGenerator',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(QRCodeGenerator.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(QRCodeGenerator.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(QRCodeGenerator.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default QRCodeGeneratorSlice.reducer;
