import { AxiosMMMA } from './index.js';

const route = '/points/';

export default {
  getAll: () => AxiosMMMA.get(route),
  getByOrganizationId: organizationId => AxiosMMMA.get(route + organizationId),
  addPointToOrganization: (organizationId, options = {}) =>
    AxiosMMMA.post(route, { organizationId, options }),
  updatePoint: (id, update = {}) => AxiosMMMA.patch(route + id, { update }),
};
