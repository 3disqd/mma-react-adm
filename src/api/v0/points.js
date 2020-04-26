import { AxiosMMMA } from './index.js';

const route = '/points/';

export default {
  getAll: () => AxiosMMMA.get(route),
  getById: id => AxiosMMMA.get(route + id),
  getByOrganizationId: organizationId =>
    AxiosMMMA.get(route + 'byOrgId/' + organizationId),
  addPointToOrganization: (organizationId, options = {}) =>
    AxiosMMMA.post(route, { organizationId, options }),
  updatePoint: (id, update = {}) => AxiosMMMA.patch(route + id, { update }),
};
