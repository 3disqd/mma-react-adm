import React from 'react';
// import styles from './ProductSelectInner.module.css';

const ProductSelectInner = ({ product }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span> {product.price}</span>

      <span> {product.name}</span>
    </div>
    {product.id}
  </div>
);

export default ProductSelectInner;