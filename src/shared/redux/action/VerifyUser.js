import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api-endpoints';

export const VerifyUser = createAsyncThunk('verifyUser/VerifyUser', async (data, thunkAPI) => {
  const endpointName = 'Verifying User';

  try {
    const response = await axios.post(`${API_ENDPOINTS.nexudus_url}/api/token`, data);
    return response.data;
  } catch (error) {
    console.log(`Error while getting ${endpointName}:`, error);

    if (error.response) {
      const { status, data: response } = error.response;
      const responseMsg = response ? JSON.stringify(response) : undefined;
      const message = `Error while checking user details 'response': ${responseMsg}`;
      return thunkAPI.rejectWithValue({ message, status });
    }

    const message = `Error while getting ${endpointName}: ${error.message}`;
    return thunkAPI.rejectWithValue({ message });
  }
});
