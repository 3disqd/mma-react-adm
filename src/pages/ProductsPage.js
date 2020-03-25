import React from 'react';
import Products from '../containers/Products';

const ProductsPage = ({ ...props }) => {
  return <Products orgId={props.match.params.orgId} />;
};

export default ProductsPage;
