import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';
//import instance from '../../utils/interceptor';

export const ForgotPassword = createAsyncThunk(
  'forgotPassword/ForgotPassword',
  async (email, thunkAPI) => {
    const endpointName = '(Forgot Password)';
    console.log('IN API Fun:--------------------->', email);

    try {
      // TODO tell Haider to add it "Authorization" its important
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // };

      const response = await axios.patch(
        `${API_ENDPOINTS.fintech_backend_url}/forget-password/${email}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
