import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';

export const GetMeetingNewTimeLine = createAsyncThunk(
  'getMeetingNewTimeLine/GetMeetingNewTimeLine',
  async ({id, date},thunkAPI) => {
    const endpointName = 'Meeting Rooms Bookings';
    // console.log("IN API Fun:--------------------->", id, date)
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.fintech_backend_url}/bookings/${id}/${date}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
