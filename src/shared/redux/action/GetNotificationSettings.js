import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const GetNotificationSettings = createAsyncThunk(
  'getNotificationSettings/GetNotificationSettings',
  async (id,thunkAPI) => {
    const endpointName = 'Get Notification Settings';
    // console.log("IN API Fun:--------------------->", id)
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.fintech_backend_url}/users/notification-setting/${id}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
