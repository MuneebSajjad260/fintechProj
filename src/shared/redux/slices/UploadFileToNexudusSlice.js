import {createSlice} from '@reduxjs/toolkit';
import {UploadFileToNexudus} from '../action/UploadFileToNexudus';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UploadFileToNexudusSlice = createSlice({
  name: 'uploadFileToNexudus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UploadFileToNexudus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UploadFileToNexudus.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UploadFileToNexudus.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UploadFileToNexudusSlice.reducer;
