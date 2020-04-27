import React from 'react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Select } from 'antd';
import ProductSelectInner from '../../../ProductSelectInner/ProductSelectInner';
import ProductSelectLabel from '../../../ProductSelectLabel/ProductSelectLabel';

const { Option } = Select;

const ProductSelector = ({
  options = [],
  onChange = () => {},
  remove = () => {},
  selectedProducts,
  defaultValue,
  moveProductUp,
  moveProductDown,
}) => {
  return (
    <div>
      <Button
        type={'link'}
        disabled={!moveProductUp}
        onClick={moveProductUp}
        icon={<ArrowUpOutlined />}
      />
      <Button
        type={'link'}
        disabled={!moveProductDown}
        onClick={moveProductDown}
        icon={<ArrowDownOutlined />}
      />
      <Select
        defaultValue={defaultValue}
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
            disabled={
              defaultValue === option.id
                ? false
                : selectedProducts.includes(option.id)
            }
            label={<ProductSelectLabel product={option} />}
          >
            <ProductSelectInner product={option} />
          </Option>
        ))}
      </Select>
      <Popconfirm title="Sure to cancel?" onConfirm={remove}>
        <Button type={'link'} danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </div>
  );
};

export default ProductSelector;

const getProductSearchString = product =>
  (product.name + product.price).toLowerCase();
