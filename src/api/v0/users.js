import { AxiosMMMA } from './index.js';
import tokensService from '../../TokensService';

const route = '/users';

export default {
  login: (email, password) =>
    AxiosMMMA.post(route + '/login', { email, password }),
  refresh: () =>
    AxiosMMMA.post(route + '/refresh', {
      refreshToken: tokensService.getRefreshToken(),
    }),
  registration: (email, password) =>
    AxiosMMMA.post(route + '/registration', { email, password }),
  endSession: () =>
    AxiosMMMA.post(route + '/endSession', {
      refreshToken: tokensService.getRefreshToken(),
    }),
};
