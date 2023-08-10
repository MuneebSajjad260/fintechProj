import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';


export const PendingStatus= createAsyncThunk('pendingStatus/PendingStatus', async (data, thunkAPI) => {
  try {
   
    const response = await axios.get(`${API_ENDPOINTS.fintech_backend_url}/plan-pending-requests-status/${data}`,{
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