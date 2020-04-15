import React, { useState } from 'react';
import api from '../api/v0/';
import LoginForm from '../components/LoginForm/LoginForm';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  let history = useHistory();
  let location = useLocation();

  const onSubmit = e => {
    api.users
      .login(e.email, e.password)
      .then(res => {
        if (res.data.jwt) {
          let { from } = location.state || { from: { pathname: '/' } };
          // localStorageService.setToken(res.data.jwt);
          history.replace(from);
        }
      })
      .catch(err => {
        console.log(err);
        // console.log(err.response.status);
        if (err.response.status === 403) {
          setErrorMessage('Неверная пара логин-пароль');
        }
      });
  };

  return (
    <>
      <button
        onClick={() => {
          localStorage.setItem('test', 'test');
        }}
      >
        set some
      </button>
      <LoginForm onFinish={onSubmit} error={errorMessage} />
    </>
  );
};

export default Login;
