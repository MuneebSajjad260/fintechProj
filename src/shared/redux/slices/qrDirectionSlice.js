import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  qrDirection: 'right',
  qrTrigger: 'Drag'
};

const qrDirectionSlice = createSlice({
  name: 'qrAsset',
  initialState,
  reducers: {
    setQrDirection: (state, action) => {
      state.qrDirection = action.payload;
    },
    setQrTrigger: (state, action) => {
      state.qrTrigger = action.payload;
    },
  },
});

export const { setQrDirection, setQrTrigger } = qrDirectionSlice.actions;
export default qrDirectionSlice.reducer;