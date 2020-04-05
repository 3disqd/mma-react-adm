import React from 'react';
import EditableTable from '../EditableTable/EditableTable';

const PointsTable = ({
  data,
  createNewItem = () => {},
  updateItem = () => {},
  // nameFilters = [],
  loading,
  getAll = () => {},
}) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      // width: '25%',
      editable: false,
      required: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      // width: '15%',
      editable: true,
      required: true,
    },
  ];

  const newItemTemplate = {
    key: 'new',
  };

  return (
    <EditableTable
      columns={columns}
      dataSource={data}
      // editingKey={editingKey}
      loading={loading}
      newItemTemplate={newItemTemplate}
      createNewItem={createNewItem}
      updateItem={updateItem}
      reload={getAll}
    />
  );
};

export default PointsTable;
