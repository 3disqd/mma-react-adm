import { AxiosMMMA } from './index.js';

const route = '/points/';

export default {
  getAll: () => AxiosMMMA.get(route),
};
