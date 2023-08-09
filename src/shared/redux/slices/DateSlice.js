import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  StartDateSelectionPO: {},
  EndDateSelectionPO: {},
  StartDateSelectionDD: {},
  EndDateSelectionDD: {},
  StartDateSelectionHybrid: {},
  EndDateSelectionHybrid: {},
  NoOfMonths: {}
};

export const DateSlice = createSlice({
  name: 'Date',
  initialState,
  reducers: {
    setStartDateSelectionPO: (state, action) => {

      state.StartDateSelectionPO = action.payload;
    },
    setEndDateSelectionPO: (state, action) => {

      state.EndDateSelectionPO = action.payload;
    },


    setStartDateSelectionDD: (state, action) => {

      state.StartDateSelectionDD = action.payload;
    },
    setEndDateSelectionDD: (state, action) => {

      state.EndDateSelectionDD = action.payload;
    },
    setStartDateSelectionHybrid: (state, action) => {

      state.StartDateSelectionHybrid = action.payload;
    },
    setEndDateSelectionHybrid: (state, action) => {

      state.EndDateSelectionHybrid = action.payload;
    },
    setNoOfMonths: (state, action) => {

      state.NoOfMonths = action.payload;
    },

  }
});

export const {
  setStartDateSelectionPO,
  setEndDateSelectionPO,
  setStartDateSelectionDD,
  setEndDateSelectionDD,
  setStartDateSelectionHybrid,
  setEndDateSelectionHybrid,
  setNoOfMonths

} = DateSlice.actions;

export const selectStartDateSelectionPO = (state) => state.Date.StartDateSelectionPO;
export const selectEndDateSelectionPO = (state) => state.Date.EndDateSelectionPO;

export const selectStartDateSelectionDD = (state) => state.Date.StartDateSelectionDD;
export const selectEndDateSelectionDD = (state) => state.Date.EndDateSelectionDD;

export const selectStartDateSelectionHybrid = (state) => state.Date.StartDateSelectionHybrid;
export const selectEndDateSelectionHybrid = (state) => state.Date.EndDateSelectionHybrid;

export const selectNoOfMonths = (state) => state.Date.NoOfMonths;

export default DateSlice.reducer;