import { createSlice } from '@reduxjs/toolkit';
import { ParticipantReschedule } from '../action/ParticipantReschedule';
const initialState = {
  loading: false,
  data: null,
  error: null
};

const ParticipantRescheduleSlice = createSlice({
  name: 'participantReschedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ParticipantReschedule.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(ParticipantReschedule.fulfilled, (state, action) => {
        console.log('action11', action.payload.status);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(ParticipantReschedule.rejected, (state, action) => {
        console.log('action22', action.payload.error);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default ParticipantRescheduleSlice.reducer;