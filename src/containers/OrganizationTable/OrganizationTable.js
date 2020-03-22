import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import EditableTable from '../../components/EditableTable/EditableTable';
import EditableOperationCell from '../../components/EditableOperationCell/EditableOperationCell';

const OrganizationTable = ({
  data,
  createNewItem = () => {},
  updateItem = () => {},
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);

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
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      required: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
      required: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
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
      <Form form={form} component={false}>
        <EditableTable
          columnsSettings={columns}
          dataSource={[...newItems, ...data]}
          editingKey={editingKey}
        />
      </Form>
    </>
  );
};

export default OrganizationTable;
