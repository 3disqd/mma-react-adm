import React, { useContext, useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { UserContext } from '../contexts/UserContext';
import { Redirect, useLocation } from 'react-router-dom';
import { OrganizationsContext } from '../contexts/OrganizationsContext';

const LoginPage = () => {
  const { getOrganizations } = useContext(OrganizationsContext);
  const { token } = useContext(UserContext);
  let location = useLocation();

  //TODO не свосем правильно, но пока сойдет (
  useEffect(() => {
    if (token) {
      getOrganizations();
    }
  }, [token, getOrganizations]);

  const from = location.state?.from.pathname || '/';

  return token ? <Redirect to={from} /> : <LoginForm />;
};

export default LoginPage;
