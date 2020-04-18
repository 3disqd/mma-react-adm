import React, { useCallback, useState } from 'react';
import api from '../api/v0';
import tokensService from '../TokensService';

export const UserContext = React.createContext({
  loading: false,
  loadPointByOrganizationId: () => {},
});

export const UserProvider = props => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [token, setToken] = useState(tokensService.getAccessToken());

  const logout = useCallback(() => {
    console.log('logout');
    api.users.endSession().then(() => {});
    setToken('');
    tokensService.clearToken();
  }, []);

  const registration = useCallback((email, pass) => {
    setLoading(true);
    api.users
      .registration(email, pass)
      .then(res => {
        setUser({ email: res.data.email });
        setRegistrationError('');
        setLoading(false);
        if (res.data.jwt) {
          setToken(res.data.jwt);
        }
      })
      .catch(err => {
        console.log(err);
        // if (err.response.status === 403) {
        setRegistrationError('ОШИБКА РЕГСТРАЦИИ');
        // }
        setLoading(false);
      });
  }, []);

  const login = useCallback((email, pass) => {
    setLoading(true);
    api.users
      .login(email, pass)
      .then(res => {
        setUser({ email: res.data.email });
        setLoginError('');
        setLoading(false);
        if (res.data.jwt) {
          setToken(res.data.jwt);
          // let { from } = location.state || { from: { pathname: '/' } };
          // history.replace(from);
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 403) {
          setLoginError('Неверная пара логин-пароль');
        }
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        token,
        user,
        loginError,
        registrationError,
        login,
        registration,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
