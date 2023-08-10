import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dayPassData: {},

};

export const dayPassProductData = createSlice({
  name: 'dayPassData',
  initialState,
  reducers: {
    setdayPassProductData: (state, action) => {

      state.dayPassData = action.payload;
    },

  }
});

export const {
  setdayPassProductData

} = dayPassProductData.actions;

export const  selectdayPassProductData = (state) => state.dayPassData.dayPassData;


export default dayPassProductData.reducer;