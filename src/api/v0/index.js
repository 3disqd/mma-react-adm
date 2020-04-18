import axios from 'axios';
import users from './users';
import organizations from './organizations';
import products from './products';
import points from './points';
import tokensService from '../../TokensService';
import api from '../v0';

export const AxiosMMMA = axios.create({
  // baseURL: 'http://localhost:3000/api/v0/',
  baseURL: 'http://192.168.31.208:3000/api/v0/',
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosMMMA.interceptors.request.use(async config => {
  const token = tokensService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

let subscribers = [];

AxiosMMMA.interceptors.response.use(
  res => {
    //TODO возможно сломается
    if (
      res.config.url === '/users/login' ||
      res.config.url === '/users/refresh'
    ) {
      const {
        data: { jwt, rt },
      } = res;
      if (jwt && rt) {
        tokensService.setToken(jwt, rt);
      } else {
        // reject?
      }
    }
    // Do something with response data
    return res;
  },
  err => {
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        api.users.refresh().then(res => {
          isRefreshing = false;
          onRefreshed(res.data.jwt);
          subscribers = [];
        });
      }
      return new Promise(resolve => {
        subscribeTokenRefresh(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }
    if (!err.response) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

const subscribeTokenRefresh = cb => {
  subscribers.push(cb);
};

const onRefreshed = token => {
  subscribers.map(cb => cb(token));
};

export default {
  users,
  organizations,
  products,
  points,
};
