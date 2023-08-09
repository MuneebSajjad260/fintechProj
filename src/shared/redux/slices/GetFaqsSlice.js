import {createSlice} from '@reduxjs/toolkit';
import {GetFaqs} from '../action/GetFaqs';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetFaqsSlice = createSlice({
  name: 'getFaqs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetFaqs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFaqs.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetFaqs.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetFaqsSlice.reducer;