import React from 'react';
import styles from './NotificationsButton.module.css';
import { Badge, Dropdown, Menu } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationsButton = ({ className }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <span role="img" aria-label="Russian">
              🔔
            </span>{' '}
            тут будут уведомления
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
      trigger={['click']}
    >
      <div className={className}>
        <Badge count={10} className={styles.badge}>
          <BellOutlined />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationsButton;