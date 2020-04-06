import React from 'react';
import { Tag } from 'antd';
import styles from './TagsCell.module.css';

const TagsCell = ({ tags = [] }) => (
  <div className={styles.tagsWrapper}>
    {tags.map(tag => {
      return (
        <Tag className={styles.tableTag} onClose={() => {}} key={tag}>
          {tag}
        </Tag>
      );
    })}
  </div>
);

export default TagsCell;
