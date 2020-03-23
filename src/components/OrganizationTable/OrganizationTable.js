import React, { useState } from 'react';
import { Button, Form } from 'antd';
import EditableTable from '../EditableTable/EditableTable';
import EditableOperationCell from '../EditableOperationCell/EditableOperationCell';

const OrganizationTable = ({
  data,
  createNewItem = () => {},
  updateItem = () => {},
  // nameFilters = [],
  loading,
  getAll = () => {},
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [newItems, setNewItems] = useState([]);

  const handleAdd = () => {
    const newItem = {
      id: 'new',
      key: 'new',
      name: 'kek',
      age: '',
      address: '',
    };
    setNewItems([newItem]);
    form.setFieldsValue({ ...newItem });
    setEditingKey('new');
  };

  const isEditing = record => record.key === editingKey;

  const cancel = () => {
    if (editingKey === 'new') {
      setNewItems([]);
    }
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      if (key === 'new') {
        createNewItem(row);
        setNewItems([]);
        setEditingKey('');
      } else {
        updateItem(key, row);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

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
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => (
        <EditableOperationCell
          record={record}
          onSave={save}
          onCancel={cancel}
          onEdit={edit}
          isEditDisabled={editingKey !== ''}
          editable={isEditing(record)}
        />
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        disabled={editingKey !== ''}
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Button
        onClick={getAll}
        type="primary"
        disabled={editingKey !== ''}
        style={{
          marginBottom: 16,
        }}
      >
        Reload
      </Button>
      <Form form={form} component={false}>
        <EditableTable
          columnsSettings={columns}
          dataSource={[...newItems, ...data]}
          editingKey={editingKey}
          loading={loading}
        />
      </Form>
    </>
  );
};

export default OrganizationTable;
