import axios from 'axios';
import users from './users';
import organizations from './organizations';
import products from './products';
import points from './points';

export const AxiosMMMA = axios.create({
  baseURL: 'http://localhost:3000/api/v0/',
  // baseURL: 'http://192.168.31.208:3000/api/v0/',
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
  users,
  organizations,
  products,
  points
};
