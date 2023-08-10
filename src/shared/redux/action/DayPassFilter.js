import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const DayPassFilter = createAsyncThunk('dayPassFilter/DayPassFilter', async (data, thunkAPI) => {
  try {
    // console.log('hellouu=>>>>', data);
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/coworker-all-upcoming-bookings-filtered/${data}`,
      {
        headers: {
          // 'Content-Type': 'application/json'
        }
      }
    );
    console.log('resource plans action--', response.data);

    return response.data;
  } catch (error) {
    console.log(' resource plan error--', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});