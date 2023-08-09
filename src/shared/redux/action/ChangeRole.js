import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const ChangeRole = createAsyncThunk('changeRole/ChangeRole', async (data, thunkAPI) => {
  try {
    // // console.log('hellouu=>>>>', data);
    const response = await instance.patch(`${API_ENDPOINTS.fintech_backend_url}/teams-member-request/${data.teamId}/${data.userId}`,{memberRequest:data.memberRequest , otp:data.otp },{
      headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${data}`
      }
    });
    // console.log('--333--', response.data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error.response.data);

  }
});