import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const PatchNotificationSettings = createAsyncThunk(
  'patchNotificationSettings/PatchNotificationSettings',
  async (craftedData,thunkAPI) => {
    const endpointName = 'Patch Notification Settings';
    // console.log("IN API Fun:--------------------->", id)
    try {
      const response = await axios.patch(
        `${API_ENDPOINTS.fintech_backend_url}/users/notification-setting/${craftedData.Id}`,
        craftedData.body
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
