import React, { useState } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../TagsCell/TagsCell.module.css';


//TODO хуйня; зря сделал; заменить Select with Tags
const InputTags = ({ value = [], id, onChange = () => {} }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  const handleInputConfirm = () => {
    if (inputValue && [...new Set(value)].indexOf(inputValue) === -1) {
      onChange({ target: { value: [...value, inputValue] } });
    }
    setInputValue('');
    setInputVisible(false);
  };

  const handleClose = removedTag => {
    onChange({
      target: { value: [...new Set(value)].filter(tag => tag !== removedTag) },
    });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.tagsWrapper} id={id}>
      {[...new Set(value)].map(tag => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            className={styles.tableTag}
            closable={true}
            onClose={() => handleClose(tag)}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          autoFocus={true}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className={styles.tablePlusTag} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default InputTags;
