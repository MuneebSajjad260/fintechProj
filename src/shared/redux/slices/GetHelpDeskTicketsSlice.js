import {createSlice} from '@reduxjs/toolkit';
import {GetHelpDeskTickets} from '../action/GetHelpDeskTickets';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GetHelpDeskTicketsSlice = createSlice({
  name: 'getHelpDeskTickets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(GetHelpDeskTickets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetHelpDeskTickets.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetHelpDeskTickets.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GetHelpDeskTicketsSlice.reducer;
