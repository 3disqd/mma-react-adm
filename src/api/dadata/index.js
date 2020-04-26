import axios from 'axios';
const CancelToken = axios.CancelToken;
let cancel;
let prevCancel;

export const DaData = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
  headers: {
    'Content-Type': 'application/json',
  },
});

DaData.interceptors.request.use(async config => {
  if (prevCancel){
    prevCancel()
  }
  prevCancel = cancel;
  config.headers.Authorization = `Token `;
  return config;
});

export default {
  suggest: {
    address: query =>
      DaData.post(
        '/suggest/address',
        { query, count: 7 },
        {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        }
      ),
  },
};
