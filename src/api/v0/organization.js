import { AxiosMMMA } from './index.js';
// import uuid from "uuid";

const route = '/organizations/';

export default {
  // get: () => API.get('/users.json'),
  getAll: () => AxiosMMMA.get(route),
  getById: id => AxiosMMMA.get(route + id),
  create: name => AxiosMMMA.post(route, { name }),
  update: (id, update = {}) => AxiosMMMA.patch(route, { id, update }),
};
