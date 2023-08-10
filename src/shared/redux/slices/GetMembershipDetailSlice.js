import {createSlice} from '@reduxjs/toolkit';
import {GetMembershipDetail} from '../action/GetMembershipDetail';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetMembershipDetailSlice = createSlice({
  name: 'getMembershipDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetMembershipDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMembershipDetail.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetMembershipDetail.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetMembershipDetailSlice.reducer;
