import { createSlice } from '@reduxjs/toolkit';
import { DownloadPdf } from '../action/DownloadPdf';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const DownloadPdfSlice = createSlice({
  name: 'downloadPdf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase( DownloadPdf.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase( DownloadPdf.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase( DownloadPdf.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default DownloadPdfSlice.reducer;