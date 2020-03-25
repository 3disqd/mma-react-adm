import React from 'react';
import { Table } from 'antd';
import EditableCell from '../EditableCell/EditableCell';

const EditableTable = ({
  columnsSettings,
  dataSource,
  editingKey,
  loading,
  // ...props
}) => {
  const columns = columnsSettings.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        //TODO сделать нормальный инпут тайп
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: editingKey === record.key,
        required: col.required,
        placeholder: col.placeholder,
        rules: col.rules,
      }),
    };
  });

  return (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columns}
      loading={loading}
    />
  );
};

export default EditableTable;
