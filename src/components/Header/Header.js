import React, { useContext } from 'react';
import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import styles from './Header.module.css';
import cn from 'classnames';
import { MainSiderContext } from '../../contexts/MainSiderContext';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Header = () => {
  const { collapsed, toggle } = useContext(MainSiderContext);

  return (
    <>
      <Layout.Header />
      <Layout.Header
        className={cn({ [styles.headerWide]: collapsed }, styles.header)}
      >
        <div onClick={toggle} className={styles.siderToggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <div style={{ flex: '1 1 0' }} />

        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <div className={styles.button}>
            <Badge count={10} className={styles.badge}>
              <BellOutlined />
            </Badge>
          </div>
        </Dropdown>
        <Dropdown
          overlay={profileMenu}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className={styles.button}>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{ marginRight: '8px' }}
            />
            User Name
          </div>
        </Dropdown>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className={styles.button}>
            <GlobalOutlined />
          </div>
        </Dropdown>
      </Layout.Header>
    </>
  );
};

export default Header;

const menu = (
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
);

const profileMenu = (
  <Menu>
    <Menu.Item>
      <UserOutlined /> Profile
    </Menu.Item>
    <Menu.Item>
      <SettingOutlined />
      Setting
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <LogoutOutlined />
      logout
    </Menu.Item>
  </Menu>
);
