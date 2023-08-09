import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';
import instance from '../../utils/interceptor';

export const UpdateProfile = createAsyncThunk('updateProfile/UpdateProfile', async (data, thunkAPI) => {
  try {
   
    const response = await instance.patch(`${API_ENDPOINTS.fintech_backend_url}/update-customer/${data?.teamId}/${data?.userId}`,{

      fullName: data?.body?.Name,
      email: data?.body?.email,
      phoneNumber: data?.body?.phone,
      companyName: data?.body?.companyName,
    },{
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