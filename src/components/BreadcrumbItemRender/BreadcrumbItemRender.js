import React from 'react';
import { Link } from 'react-router-dom';

const BreadcrumbItemRender = route =>
  route.disabled ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.globalPath}>
      {route.breadcrumbName + '||' + route.globalPath}
    </Link>
  );
export default BreadcrumbItemRender;

// const BreadcrumbItemRender = (route, params, routes, paths) => {
//
//   return routes.indexOf(route) === routes.length - 1 ? (
//     <span>{route.breadcrumbName}</span>
//   ) : (
//     <Link to={'/' + paths.join('/')}>
//       {route.breadcrumbName + '||' + paths.join('+')}
//     </Link>
//   );
// }
