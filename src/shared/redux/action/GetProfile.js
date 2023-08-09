import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';

export const GetProfile = createAsyncThunk(
  'getProfile/GetProfile',
  async (data, token, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.nexudus_url}/en/coworker/profiles`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data}`,
          },
        },
      );
      console.log('response.data1 get profile-',response.data);
      return response.data;
    } catch (error) {
      console.log('error get profile-', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
