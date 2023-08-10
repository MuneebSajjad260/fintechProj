import {createSlice} from '@reduxjs/toolkit';
import {GetTeamMemberCredit} from '../action/GetTeamMemberCredit';
const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetTeamMemberCreditSlice = createSlice({
  name: 'getTeamMemberCredit',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetTeamMemberCredit.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTeamMemberCredit.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetTeamMemberCredit.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetTeamMemberCreditSlice.reducer;
