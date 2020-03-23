import { AxiosMMMA } from './index.js';
// import uuid from "uuid";

export default {
  // get: () => API.get('/users.json'),
  login: (email, password) => AxiosMMMA.post('/user/login', { email, password }),
};
