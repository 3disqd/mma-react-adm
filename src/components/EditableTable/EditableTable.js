import React, { useState } from 'react';
import styles from './EditableTable.module.css';
import { Form, Table } from 'antd';
import EditableCell from '../EditableCell/EditableCell';
import EditableOperationCell from '../EditableOperationCell/EditableOperationCell';
import TableTools from './TableTools/TableTools';

const EditableTable = ({
  columns = [],
  dataSource,
  loading,
  newItemTemplate = { id: 'new' },
  useDefaultOperationColumn = true,
  insertAddButton = true,
  createNewItem = () => {},
  updateItem = () => {},
  reload,
  forceClearObject = {},
  scroll,
  title,
  // ...props
}) => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');
  const [newItems, setNewItems] = useState([]);
  const [tableSize, setTableSize] = useState('small');

  const handleAdd = () => {
    setNewItems([newItemTemplate]);
    form.setFieldsValue({ ...newItemTemplate });
    setEditingId('new');
  };

  const isEditing = record => record.id === editingId;

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
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const operationColumn = {
    title: 'operation',
    dataIndex: 'operation',
    width: 100,
    fixed: 'right',
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

  // TODO вот эту хуйню вынести в утилиту; не нужна тут
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
        editing: editingId === record.id,
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
      <TableTools
        title={title}
        handleAdd={insertAddButton && handleAdd}
        addButtonDisabled={editingId !== ''}
        reload={reload}
        reloadButtonDisabled={editingId !== ''}
        setSize={setTableSize}
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          className={styles.table}
          rowClassName={() => 'editable-row'}
          // bordered
          dataSource={[...newItems, ...dataSource]}
          columns={preparedColumns}
          loading={loading}
          rowKey={'id'}
          //TODO конфиг пагинации собирать где-нибудь
          // pagination={{
          //   defaultPageSize: 10,
          //   showSizeChanger: true,
          //   pageSizeOptions: ['10', '20', '30'],
          // }}
          pagination={false}
          size={tableSize}
          scroll={scroll}
        />
      </Form>
    </>
  );
};

export default EditableTable;
