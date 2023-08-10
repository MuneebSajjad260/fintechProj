import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resource: {},

};

export const planResourceDataSlice = createSlice({
  name: 'resourceData',
  initialState,
  reducers: {
    setResourceData: (state, action) => {

      state.resource = action.payload;
    },

  }
});

export const {
  setResourceData

} = planResourceDataSlice.actions;

export const selectResourceData = (state) => state.resourceData.resource;


export default planResourceDataSlice.reducer;