import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const MeetingRoomComment = createAsyncThunk('meetingRoomComment/MeetingRoomComment', async (data, thunkAPI) => {
  try {
   
    const response = await instance.patch(`${API_ENDPOINTS.fintech_backend_url}/meeting-payments/${data?.id}`, data.body, {
      headers: {
        //  'Content-Type': 'multipart/form-data'
      }
    });
  

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});