import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const GetNotificationsList = createAsyncThunk(
  'getNotificationsList/GetNotificationsList',
  async (token, thunkAPI) => {
    const endpointName = '(Notifications)';
    // console.log("IN API Fun:--------------------->", token)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(
        `https://fintechhub.spaces.nexudus.com/en/coworker/notifications`,
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
