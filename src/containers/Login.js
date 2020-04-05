import React, { useState } from 'react';
import api from '../api/v0/';
import LoginForm from '../components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  let history = useHistory();

  const onSubmit = e => {
    api.users
      .login(e.email, e.password)
      .then(res => {
        if (res.data.jwt) {
          localStorage['tkn'] = res.data.jwt;
          history.push('/zbs');
        }
      })
      .catch(err => {
        console.log(err.response.status);
        if (err.response.status === 403) {
          setErrorMessage('Неверная пара логин-пароль');
        }
      });
  };

  return <LoginForm onFinish={onSubmit} error={errorMessage} />;
};

export default Login;
