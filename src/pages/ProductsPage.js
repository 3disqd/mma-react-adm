import React from 'react';
import PointsTable from '../components/PointsTable/PointsTable';

const ProductsPage = ({ ...props }) => {
  return <PointsTable orgId={props.match.params.orgId} />;
};

export default ProductsPage;
