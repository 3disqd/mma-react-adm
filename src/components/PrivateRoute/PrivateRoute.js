import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { fakeAuth } from '../../App';

const PrivateRoute = ({ children, path, component, render, ...rest }) => (
  <Route
    {...component}
    {...path}
    {...render}
    {...rest}
    render={({ location }) =>
      fakeAuth.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/fakelogin',
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
