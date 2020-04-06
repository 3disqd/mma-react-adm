import React from 'react';
import { Button, Popconfirm } from 'antd';

const EditableOperationCell = ({
  record,
  editable,
  onSave = () => {},
  onEdit = () => {},
  onCancel = () => {},
  onDelete = () => {},
  isEditDisabled,
}) =>
  editable ? (
    <>
      <Button
        type="link"
        onClick={() => onSave(record._id)}
        style={{
          marginRight: 8,
        }}
      >
        Save
      </Button>
      <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
        <Button type="link">Cancel</Button>
      </Popconfirm>
    </>
  ) : (
    <>
      <Button
        type="link"
        disabled={isEditDisabled}
        onClick={() => onEdit(record)}
        style={{
          marginRight: 8,
        }}
      >
        Edit
      </Button>
      <Popconfirm title="Sure to delete?" onConfirm={onDelete}>
        <Button disabled={isEditDisabled} danger type="link">
          Delete
        </Button>
      </Popconfirm>
    </>
  );

export default EditableOperationCell;
