import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import localStorageService from '../../LocalStorageService';

const PrivateRoute = ({ children, path, component, render, ...rest }) => (
  <Route
    {...component}
    {...path}
    {...render}
    {...rest}
    render={({ location }) =>
      localStorageService.getAccessToken() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
