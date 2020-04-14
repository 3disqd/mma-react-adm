import React, { useContext, useMemo } from 'react';
import EditableTable from '../EditableTable/EditableTable';
import { OrganizationsContext } from '../../contexts/OrganizationsContext';

const ProductsTable = ({ orgId }) => {
  const {
    [orgId]: organization,
    loading,
    addProductToOrganizationById,
    updateProduct,
  } = useContext(OrganizationsContext);

  const data = useMemo(
    () => (organization ? [...organization.products].reverse() : []),
    [organization]
  );

  const createNewItem = product => {
    addProductToOrganizationById(orgId, product);
  };

  const updateItem = (productId, product) => {
    updateProduct(orgId, productId, product);
  };

  //TODO сделать обновление продукта и обновление списка

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      editable: false,
      required: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      // width: '15%',
      editable: true,
      required: true,
      placeholder: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      inputType: 'number',
      // width: '25%',
      editable: true,
      required: false,
      placeholder: 'price',
      rules: [{ type: 'number', message: 'must be number' }],
    },
    {
      title: 'description',
      dataIndex: 'description',
      // width: '25%',
      editable: true,
      required: false,
    },
  ];

  const newItemTemplate = {
    id: 'new',
    name: '',
    price: '',
    description: '',
  };

  return (
    <EditableTable
      columns={columns}
      dataSource={data}
      loading={loading}
      newItemTemplate={newItemTemplate}
      createNewItem={createNewItem}
      updateItem={updateItem}
      reload={() => {}}
    />
  );
};

export default ProductsTable;
