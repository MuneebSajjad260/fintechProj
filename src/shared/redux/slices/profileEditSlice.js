import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},

};

export const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setProfileEdit: (state, action) => {

      state.profile = action.payload;
    },

  }
});

export const {
  setProfileEdit

} = profileEditSlice.actions;

export const selectProfileEdit = (state) => state.profileEdit.profile;


export default profileEditSlice.reducer;