import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetingRoomId: {},
  dayPassId:{}
};

export const bookingResourceSlice = createSlice({
  name: 'bookingResource',
  initialState,
  reducers: {
    setMeetingRoomid: (state, action) => {
      state.meetingRoomId = action.payload;
    },
    setDayPassId: (state, action) => {
      state.dayPassId = action.payload;
    },
   
  }});

export const {
  setMeetingRoomid,
  setDayPassId
  
} = bookingResourceSlice.actions;

export const  selectMeetingRoomid = (state) => state.bookingResource.meetingRoomId;
export const  selectDayPassId = (state) => state.bookingResource.dayPassId;


export default bookingResourceSlice.reducer;