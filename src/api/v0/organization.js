import { AxiosMMMA } from './index.js';
// import uuid from "uuid";

export default {
  // get: () => API.get('/users.json'),
  getAll: (email, password) =>
    AxiosMMMA.get('/organization/', { email, password }),
  create: name => AxiosMMMA.post('/organization', { name }),
};
