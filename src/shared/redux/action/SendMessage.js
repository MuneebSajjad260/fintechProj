import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINTS} from '../../config/api-endpoints';
import {handleErrors} from '../../utils/apiErrorState';


export const SendMessage = createAsyncThunk(
  'sendMessage/SendMessage',
  async ({token, id, text}, thunkAPI) => {
    const endpointName = '(Send Message)';
    console.log('IN API Fun:--------------------->', token, id, text);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const data = {
      HelpDeskMessage: id,
      MessageText: text,
    };
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.nexudus_url}/en/support/newcomment`,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleErrors(error, endpointName));
    }
  },
);
