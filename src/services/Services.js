import axios from 'axios';


const loginUrl = 'https://';
const headers = {
  'content-Type':
        'application/json'
};

export const login = (email, password) => {

  return axios
    .post(loginUrl, {
      email, password
    }, {
      headers
    })
    .then((response) => response.data)
    .catch((error) => error);
};