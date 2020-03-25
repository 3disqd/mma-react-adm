import React, { useCallback, useEffect, useState } from 'react';
import ProductsTable from '../components/ProductsTable/ProductsTable';
import api from '../api/v0';

const Products = ({ orgId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback( () => {
    api.organization
      .getById(orgId)
      .then(res => {
        console.log(res.data.products);
        setData(
          res.data.products
            //TODO пиздень с идишниками, надо придумать как делать везде
            .map(product => ({ ...product, key: product._id }))
            .reverse()
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, [orgId]);

  useEffect(() => {
    getProducts()
  }, [getProducts]);

  const add = product => {
    setLoading(true);
    //TODO не отправлять пустые поля: использовать lodash/ забить хуй

    const newProduct = {
      ...(product.name && { name: product.name }),
      ...(product.price && { price: product.price }),
      ...(product.description && { description: product.description }),
    };

    api.product
      .create(orgId, newProduct)
      .then(res => {
        setData(
          res.data.map(product => ({ ...product, key: product._id })).reverse()
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const update = () => {};

  return (
    <ProductsTable
      data={data}
      createNewItem={add}
      updateItem={update}
      loading={loading}
      reload={getProducts}
    />
  );
};

export default Products;
