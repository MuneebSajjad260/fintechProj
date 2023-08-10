import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const GetMeetingBooking = createAsyncThunk(
  'getMeetingBooking/GetMeetingBooking',
  async (id,thunkAPI) => {
    const endpointName = 'Meeting Rooms Bookings';
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.fintech_backend_url}/bookings/${id}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
