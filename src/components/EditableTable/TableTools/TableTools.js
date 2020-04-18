import React from 'react';
import styles from './TableTools.module.css';
import { Button, Divider, Dropdown, Menu, Tooltip } from 'antd';
import {
  SettingOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const TableTools = ({
  title = '',
  handleAdd,
  addButtonDisabled = false,
  reloadButtonDisabled = false,
  reload,
  setSize = () => {},
}) => {
  const sizeHandler = e => {
    setSize(e.key);
  };

  const sizes = (
    <Menu>
      <Menu.Item key="small" onClick={sizeHandler}>
        small
      </Menu.Item>
      <Menu.Item onClick={sizeHandler} key="middle">
        middle
      </Menu.Item>
      <Menu.Item onClick={sizeHandler} key="default">
        default
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.tableTools}>
      {title}
      <div className={styles.buttons}>
        {handleAdd && (
          <Button
            icon={<PlusOutlined />}
            onClick={handleAdd}
            type="primary"
            disabled={addButtonDisabled}
          >
            Add a row
          </Button>
        )}
        <Divider type="vertical" />
        {reload && (
          <Tooltip title="reload">
            <Button
              disabled={reloadButtonDisabled}
              onClick={reload}
              className={styles.miniButton}
              icon={<ReloadOutlined />}
            />
          </Tooltip>
        )}
        <Tooltip title="size">
          <Dropdown overlay={sizes} placement="bottomRight" trigger={['click']}>
            <Button
              className={styles.miniButton}
              icon={<ColumnHeightOutlined />}
            />
          </Dropdown>
        </Tooltip>
        <Tooltip title="settings">
          <Button className={styles.miniButton} icon={<SettingOutlined />} />
        </Tooltip>
      </div>
    </div>
  );
};

export default TableTools;
