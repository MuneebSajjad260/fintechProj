import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const MeetingRoomPrice = createAsyncThunk('meetingRoomPrice/MeetingRoomPrice', async (data, thunkAPI) => {
  try {
   
    const response = await instance.get(`${API_ENDPOINTS.fintech_backend_url}/resource-pice/${data}`,{
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