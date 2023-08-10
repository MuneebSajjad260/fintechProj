import {createSlice} from '@reduxjs/toolkit';
import {GetMyCredit} from '../action/GetMyCredit';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetMyCreditSlice = createSlice({
  name: 'getMyCredit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetMyCredit.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMyCredit.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMyCredit.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetMyCreditSlice.reducer;
