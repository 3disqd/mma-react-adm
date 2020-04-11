import React, { useState } from 'react';
import { Button, Form, Table } from 'antd';
import EditableCell from '../EditableCell/EditableCell';
import EditableOperationCell from '../EditableOperationCell/EditableOperationCell';

const EditableTable = ({
  columns = [],
  dataSource,
  loading,
  newItemTemplate = { _id: 'new' },
  useDefaultOperationColumn = true,
  insertAddButton = true,
  createNewItem = () => {},
  updateItem = () => {},
  reload,
  forceClearObject = {},
  // ...props
}) => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');
  const [newItems, setNewItems] = useState([]);

  const handleAdd = () => {
    setNewItems([newItemTemplate]);
    form.setFieldsValue({ ...newItemTemplate });
    setEditingId('new');
  };

  const isEditing = record => record._id === editingId;

  const cancel = () => {
    if (editingId === 'new') {
      setNewItems([]);
    }
    form.setFieldsValue(forceClearObject);
    setEditingId('');
  };

  const save = async id => {
    try {
      const row = await form.validateFields();
      if (id === 'new') {
        createNewItem(row);
      } else {
        updateItem(id, row);
      }
      cancel();
      // form.setFieldsValue({ schedule: undefined });
      // setEditingId('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingId(record._id);
  };

  const operationColumn = {
    title: 'operation',
    dataIndex: 'operation',
    width: '2%',
    render: (_, record) => (
      <EditableOperationCell
        record={record}
        onSave={save}
        onCancel={cancel}
        onEdit={edit}
        isEditDisabled={editingId !== ''}
        editable={isEditing(record)}
      />
    ),
  };

  let preparedColumns = columns.map(col => {
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
        editing: editingId === record._id,
        required: col.required,
        placeholder: col.placeholder,
        rules: col.rules,
      }),
    };
  });

  if (useDefaultOperationColumn) {
    preparedColumns.push(operationColumn);
  }

  return (
    <>
      {insertAddButton && (
        <Button
          onClick={handleAdd}
          type="primary"
          disabled={editingId !== ''}
          style={{
            marginBottom: 16,
          }}
        >

          Add a row
        </Button>
      )}

      {!!reload && (
        <Button
          onClick={reload}
          type="primary"
          disabled={editingId !== ''}
          style={{
            marginBottom: 16,
          }}
        >
          Reload
        </Button>
      )}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={[...newItems, ...dataSource]}
          columns={preparedColumns}
          loading={loading}
          rowKey={'_id'}
        />
      </Form>
    </>
  );
};

export default EditableTable;
