import React, { useContext } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { UserContext } from '../../../contexts/UserContext';

const ProfileButton = ({ className }) => {
  const { logout } = useContext(UserContext);

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item>
            <SettingOutlined />
            Setting
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={logout}>
            <LogoutOutlined />
            logout
          </Menu.Item>
        </Menu>
      }
      placement="bottomRight"
      trigger={['click']}
    >
      <div className={className}>
        <Avatar
          size="small"
          icon={<UserOutlined />}
          style={{ marginRight: '8px' }}
        />
        User Name
      </div>
    </Dropdown>
  );
};

export default ProfileButton;
