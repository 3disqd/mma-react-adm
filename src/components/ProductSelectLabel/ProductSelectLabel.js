import React from 'react';
import styles from './ProductSelectLabel.module.css';

const ProductSelectLabel = ({ product }) => {
  return (
    <div className={styles.productSelectLabel}>
      <span> {product.name}</span>
      <span>{product.price}</span>
    </div>
  );
};

export default ProductSelectLabel;
