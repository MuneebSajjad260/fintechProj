import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';


export const RegisterFCM = createAsyncThunk(
  'registerFCM/RegisterFCM',
  async ({fcmToke, id}, thunkAPI) => {
    const endpointName = '(Register FCM Token)';
    console.log('IN API Fun:--------------------->', fcmToke, id);

    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.fintech_backend_url}/user-fcm/${id}`,
        {
          FCMToken: fcmToke,
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
