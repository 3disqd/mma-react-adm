import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AutoComplete, Button, Popconfirm } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ProductSelector from './ProductSelector/ProductSelector';
import { OrganizationsContext } from '../../../contexts/OrganizationsContext';

const TabContent = ({
  title,
  onRemove,
  onChange,
  moveTabLeft,
  moveTabRight,
  groups,
  products = [],
  addProduct = () => {},
  selectProduct = () => {},
}) => {
  const { orgId } = useParams();
  const { [orgId]: organization } = useContext(OrganizationsContext);
  const { products: availableProducts } = organization || { products: [] };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button
          type="link"
          disabled={!moveTabLeft}
          icon={<ArrowLeftOutlined />}
          onClick={moveTabLeft}
        />
        <Button
          type="link"
          disabled={!moveTabRight}
          icon={<ArrowRightOutlined />}
          onClick={moveTabRight}
        />
        <AutoComplete
          options={groups}
          value={title}
          onChange={val => {
            onChange({ title: val });
          }}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <Popconfirm title="Sure to cancel?" onConfirm={onRemove}>
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
      {/*TODO key fix*/}
      {products.map((product, n) => (
        <ProductSelector
          key={n}
          options={availableProducts}
          selectedProducts={products}
          onChange={productId => {
            console.log(productId);
            selectProduct(n, productId);
          }}
        />
      ))}
      <Button icon={<PlusOutlined />} type="dashed" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
};

export default TabContent;
