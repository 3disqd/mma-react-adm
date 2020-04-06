import { AxiosMMMA } from './index.js';

const route = '/points/';

export default {
  getAll: () => AxiosMMMA.get(route),
  getByOrganizationId: organizationId => AxiosMMMA.get(route + organizationId),
  addPointToOrganization: (organizationId, point = {}) =>
    AxiosMMMA.post(route, { organizationId, ...point }),
};
