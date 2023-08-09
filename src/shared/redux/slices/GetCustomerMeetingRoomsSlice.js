import { createSlice } from '@reduxjs/toolkit';
import { GetCustomerMeetingRooms } from '../action/GetCustomerMeetingRooms';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const GetCustomerMeetingRoomsSlice = createSlice({
  name: 'getCustomerMeetingRooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCustomerMeetingRooms.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(GetCustomerMeetingRooms.fulfilled, (state, action) => {
        console.log('action fulfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetCustomerMeetingRooms.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default GetCustomerMeetingRoomsSlice.reducer;