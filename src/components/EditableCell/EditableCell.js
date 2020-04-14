import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import InputTags from './InputTags';
import InputSchedule from './InputSchedule';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required,
  placeholder,
  rules = [],
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case 'number':
      inputNode = <InputNumber placeholder={placeholder} />;
      break;
    case 'tags':
      inputNode = <InputTags />;
      break;
    case 'schedule':
      inputNode = <InputSchedule />;
      break;
    default:
      inputNode = <Input placeholder={placeholder} />;

      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
            ...rules,
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
