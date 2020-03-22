import axios from 'axios';
import users from './users.js';
import points from './points.js';

export const API = axios.create({
  baseURL: '/fakeApi',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.token}`
  },
});

API.interceptors.request.use(conf => {
  // console.log(conf);
  // console.log(localStorage.token);
  return conf;
});

API.interceptors.response.use(
  response => response,
  error => error
);

export default {
  users,
  points,
};
