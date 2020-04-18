const setToken = (accessToken, refreshToken) => {
  localStorage.setItem('tkn', accessToken);
  localStorage.setItem('rt', refreshToken);
};

const getAccessToken = () => localStorage.getItem('tkn');

const getRefreshToken = () => localStorage.getItem('rt');
const clearToken = () => {
  localStorage.removeItem('tkn');
  localStorage.removeItem('rt');
};

export default {
  setToken,
  getAccessToken,
  getRefreshToken,
  clearToken,
};
