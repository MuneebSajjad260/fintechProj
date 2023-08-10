import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorScheme: undefined,
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
  },
});

export const { setColorScheme } = modeSlice.actions;
export default modeSlice.reducer;