import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPrivateOfficeMembers: {},
  selectedDedicatedDeskMembers: {},
  selectedMemberHybrid: {},
  unselectedMemberHybrid: {},
  filteredPackages: {},
  selectedPrivateOfficeMembersHybrid: {},
  selectedDedicatedDeskMembersHybrid: {},
  teamMembersMeetingRoom: {},
  otherInviteeMeetingRoom: {}
};

export const memberSelectionSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {

    setSelectedPrivateOfficeMembers: (state, action) => {

      state.selectedPrivateOfficeMembers = action.payload;
    },
    setSelectedDedicatedDeskMembers: (state, action) => {

      state.selectedDedicatedDeskMembers = action.payload;
    },

    setSelectedMembersHybrid: (state, action) => {

      state.selectedMemberHybrid = action.payload;
    },
    setSelectedPrivateOfficeMembersHybrid: (state, action) => {

      state.selectedPrivateOfficeMembersHybrid = action.payload;
    },
    setSelectedDedicatedDeskMembersHybrid: (state, action) => {

      state.selectedDedicatedDeskMembersHybrid = action.payload;
    },
    setUnselectedMembersHybrid: (state, action) => {

      state.unselectedMemberHybrid = action.payload;
    },

    setTeamMembersMeetingRoom: (state, action) => {

      state.teamMembersMeetingRoom = action.payload;
    },
    setOtherInviteeMeetingRoom: (state, action) => {

      state.otherInviteeMeetingRoom = action.payload;
    },

    setFilteredPackages: (state, action) => {
      state.filteredPackages = action.payload;
    },

  }
});

export const {
  setSelectedPrivateOfficeMembers,
  setSelectedDedicatedDeskMembers,
  setSelectedMembersHybrid,
  setUnselectedMembersHybrid,
  setFilteredPackages,
  setSelectedPrivateOfficeMembersHybrid,
  setSelectedDedicatedDeskMembersHybrid,
  setTeamMembersMeetingRoom,
  setOtherInviteeMeetingRoom

} = memberSelectionSlice.actions;

//selector
export const selectSelectedPrivateOfficeMembers = (state) => state.selectedItems.selectedPrivateOfficeMembers;
export const selectSelectedDedicatedDeskMembers = (state) => state.selectedItems.selectedDedicatedDeskMembers;
export const selectSelectedMembersHybrid = (state) => state.selectedItems.selectedMemberHybrid;
export const selectSelectedPrivateOfficeMembersHybrid = (state) => state.selectedItems.selectedPrivateOfficeMembersHybrid;
export const selectSelectedDedicatedDeskMembersHybrid = (state) => state.selectedItems.selectedDedicatedDeskMembersHybrid;
export const selectUnselectedMembersHybrid = (state) => state.selectedItems.unselectedMemberHybrid;
export const selectTeamMembersMeetingRoom = (state) => state.selectedItems.teamMembersMeetingRoom;
export const selectOtherInviteeMeetingRoom = (state) => state.selectedItems.otherInviteeMeetingRoom;

export const filterPackages = (state) => state.selectedItems.filteredPackages;


export default memberSelectionSlice.reducer;