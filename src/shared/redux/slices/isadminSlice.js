import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  administrator: {},
  loginId: {},
  loginUserName: {},
  teamName: {},
  userData: {},
  email: {},
};

export const isadminSlice = createSlice({
  name: 'administrator',
  initialState,
  reducers: {
    setAdministrator: (state, action) => {
      state.administrator = action.payload;
    },
    setLoginUserId: (state, action) => {
      state.loginId = action.payload;
    },
    setLoginUserName: (state, action) => {
      state.loginUserName = action.payload;
    },
    setTeamName: (state, action) => {
      state.teamName = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  setAdministrator,
  setLoginUserId,
  setLoginUserName,
  setTeamName,
  setUserData,
  setEmail,
} = isadminSlice.actions;

export const selectAdministrator = state => state.administrator.administrator;
export const selectLoginUserId = state => state.administrator.loginId;
export const selectLoginUserName = state => state.administrator.loginUserName;
export const selectTeamName = state => state.administrator.teamName;
export const selectUserData = state => state.administrator.userData;
export const selectEmail = state => state.administrator.email;

export default isadminSlice.reducer;