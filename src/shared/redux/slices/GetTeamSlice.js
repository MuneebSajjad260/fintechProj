import {createSlice} from '@reduxjs/toolkit';
import {GetTeam} from '../action/GetTeam';
const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetTeamSlice = createSlice({
  name: 'getTeam',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetTeam.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTeam.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetTeam.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetTeamSlice.reducer;
