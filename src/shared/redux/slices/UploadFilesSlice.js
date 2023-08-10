import {createSlice} from '@reduxjs/toolkit';
import {UploadFiles} from '../action/UploadFiles';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UploadFilesSlice = createSlice({
  name: 'uploadFiles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UploadFiles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UploadFiles.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(UploadFiles.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UploadFilesSlice.reducer;
