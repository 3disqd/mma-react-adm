import { AxiosMMMA } from './index.js';

const route = '/products/';

export default {
  create: (organizationId, product = {}) =>
    AxiosMMMA.post(route, { organizationId, product }),
  update: (organizationId, productId, product) =>
    AxiosMMMA.patch(route + productId, { organizationId, product }),
};
