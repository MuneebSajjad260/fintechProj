import { createSlice } from '@reduxjs/toolkit';
import { newPassword } from '../action/setPassword';


const initialState = {
  loading: false,
  data: null,
  error: null
};

const setPasswordSlice = createSlice({
  name: 'newPassword',
  initialState,
  reducers: {
    resetPassword:(state)=>{
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPassword.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        console.log('action filfilled', action.payload.data);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(newPassword.rejected, (state, action) => {
        console.log('action rejected', action);
        state.loading = false;
        state.error = action.payload;
      });
   
  }
});

export default setPasswordSlice.reducer;