import { AxiosMMMA } from './index.js';

const route = '/products/';

export default {
  create: (organizationId, options = {}) =>
    AxiosMMMA.post(route, { organizationId, ...options }),
};
