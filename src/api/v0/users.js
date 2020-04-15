import { AxiosMMMA } from './index.js';
import localStorageService from '../../LocalStorageService'
// import uuid from "uuid";

const route = '/users';

export default {
  // get: () => API.get('/users.json'),
  login: (email, password) => AxiosMMMA.post(route+'/login', { email, password }),
  refresh: () => AxiosMMMA.post(route+'/refresh', {refreshToken: localStorageService.getRefreshToken()})
};
