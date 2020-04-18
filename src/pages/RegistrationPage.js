import React, { useContext } from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { UserContext } from '../contexts/UserContext';
import { Redirect, useLocation } from 'react-router-dom';

const RegistrationPage = () => {
  const { token } = useContext(UserContext);
  let location = useLocation();

  const from = location.state?.from.pathname || '/';

  return token ? <Redirect to={from} /> : <RegistrationForm />;
};

export default RegistrationPage;
