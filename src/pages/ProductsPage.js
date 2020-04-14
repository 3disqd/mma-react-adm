import React from 'react';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import Content from '../components/Content/Content';
import { Card } from 'antd';

const ProductsPage = ({ ...props }) => {
  return (
    <Content>
      <Card bordered={false}>
        <ProductsTable orgId={props.match.params.orgId} />{' '}
      </Card>
    </Content>
  );
};

export default ProductsPage;
