import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const PoolTeamCredit = createAsyncThunk('poolTeamCredit/PoolTeamCredit', async (data, thunkAPI) => {
  try {
   
    const response = await instance.patch(`${API_ENDPOINTS.fintech_backend_url}/teams-pool/${data.teamId}`,{poolCredits:data.poolCredit},{
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${data}`
      }
    });
  

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});