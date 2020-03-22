import React from 'react';
import { Button, Popconfirm } from 'antd';

const EditableOperationCell = ({
  record,
  editable,
  onSave = () => {},
  onEdit = () => {},
  onCancel = () => {},
  isEditDisabled,
}) =>
  editable ? (
    <span>
      <Button
        type="link"
        onClick={() => onSave(record.key)}
        // onClick={() => save(record.key)}
        style={{
          marginRight: 8,
        }}
      >
        Save
      </Button>
      <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
        <Button type="link">Cancel</Button>
      </Popconfirm>
    </span>
  ) : (
    <Button
      type="link"
      disabled={isEditDisabled}
      // disabled={editingKey !== ''}
      onClick={() => onEdit(record)}
      // onClick={() => edit(record)}
    >
      Edit
    </Button>
  );

export default EditableOperationCell;
