import React from 'react';
import { Link } from 'react-router-dom';

const BreadcrumbItemRender = (route, params, routes, paths) =>
  routes.indexOf(route) === routes.length - 1 ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
  );

export default BreadcrumbItemRender;
