import { createSlice } from '@reduxjs/toolkit';
import { GetSinglePlanMember } from '../action/GetSinglePlanMember';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetSinglePlanMemberSlice = createSlice({
  name: 'getSinglePlanMember',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSinglePlanMember.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetSinglePlanMember.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetSinglePlanMember.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetSinglePlanMemberSlice.reducer;