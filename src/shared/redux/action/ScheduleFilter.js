import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const ScheduleFilter = createAsyncThunk('scheduleFilter/ScheduleFilter', async (data, thunkAPI) => {
  try {
   
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/coworker-team-bookings-upcoming/${data}`,
      {
        headers: {
          // 'Content-Type': 'application/json'
        }
      }
    );
   

    return response.data;
  } catch (error) {
    console.log(' resource plan error--', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});