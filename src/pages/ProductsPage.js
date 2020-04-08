import React from 'react';
import ProductsTable from '../components/ProductsTable/ProductsTable';

const ProductsPage = ({ ...props }) => {
  return <ProductsTable orgId={props.match.params.orgId} />;
};

export default ProductsPage;
