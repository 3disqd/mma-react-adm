import { AxiosMMMA } from './index.js';
// import uuid from "uuid";

const route = '/users';

export default {
  // get: () => API.get('/users.json'),
  login: (email, password) => AxiosMMMA.post(route+'/login', { email, password }),
};
