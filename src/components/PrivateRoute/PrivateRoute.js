import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const PrivateRoute = ({
  path,
  component: Component,
  location,
  children,
  ...rest
}) => {
  const { token } = useContext(UserContext);

  return (
    <Route
      {...path}
      {...rest}
      render={({ location, ...props }) => {
        return token ? (
          children || <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
