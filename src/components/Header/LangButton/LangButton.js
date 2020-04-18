import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const LangButton = ({ className }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <span role="img" aria-label="Russian">
              🇷🇺
            </span>{' '}
            Russian
          </Menu.Item>
          <Menu.Item>
            <span role="img" aria-label="English">
              🇺🇸
            </span>{' '}
            English
          </Menu.Item>
          <Menu.Item>
            <span role="img" aria-label="Japan">
              🇯🇵
            </span>{' '}
            Japan
          </Menu.Item>
          <Menu.Divider />
        </Menu>
      }
      placement="bottomRight"
    >
      <div className={className}>
        <GlobalOutlined />
      </div>
    </Dropdown>
  );
};

export default LangButton;
