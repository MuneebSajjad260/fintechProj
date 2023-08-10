import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const ParticipantReschedule = createAsyncThunk('participantReschedule/ParticipantReschedule', async (data, thunkAPI) => {
  try {
  
    const response = await instance.post(`${API_ENDPOINTS.fintech_backend_url}/meetings-reschedule-members`, data, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
   

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});