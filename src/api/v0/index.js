import axios from 'axios';
import user from './user.js';
import organization from './organization.js';

export const AxiosMMMA = axios.create({
  baseURL: 'http://localhost:3000/api/v0/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.tkn}`,
  },
});

AxiosMMMA.interceptors.request.use(conf => {
  // console.log(conf);
  // console.log(localStorage.token);
  return conf;
});

AxiosMMMA.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(err) {
    // Do something with response error

    if (!err.response) {
      return Promise.reject(err);
    }

    // if (err.response.status === 401) {
    //   window.location.href = '/auth';
    //   return Promise.reject(err);
    // }
    return Promise.reject(err);
  }
);

export default {
  user,
  organization,
};
