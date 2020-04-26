import React from 'react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Select } from 'antd';
import ProductSelectInner from '../../../ProductSelectInner/ProductSelectInner';
import ProductSelectLabel from '../../../ProductSelectLabel/ProductSelectLabel';

const { Option } = Select;

const ProductSelector = ({
  options = [],
  onChange = () => {},
  selectedProducts,
}) => {
  return (
    <div>
      <Button type={'link'} icon={<ArrowUpOutlined />} />
      <Button type={'link'} icon={<ArrowDownOutlined />} />
      <Select
        // defaultValue="5e9255eb1e520cec3b8eee1a"
        showSearch
        style={{ width: 300 }}
        onChange={onChange}
        optionLabelProp="label"
        filterOption={(input, option) =>
          !selectedProducts.includes(option.value) &&
          option.string.includes(input.toLowerCase())
        }
      >
        {options.map(option => (
          <Option
            key={option.id}
            value={option.id}
            string={getProductSearchString(option)}
            disabled={selectedProducts.includes(option.id)}
            // label={'123'}
            label={<ProductSelectLabel product={option} />}
          >
            <ProductSelectInner product={option} />
          </Option>
        ))}
      </Select>
      <Button type={'link'} danger icon={<DeleteOutlined />} />
    </div>
  );
};

export default ProductSelector;

const getProductSearchString = product =>
  (product.name + product.price).toLowerCase();
