import React, { useContext } from 'react';
import styles from './SiderMenu.module.css';
import { Layout, Menu } from 'antd';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { OrganizationsContext } from '../../contexts/OrganizationsContext';
import { MainSiderContext } from '../../contexts/MainSiderContext';
import {
  UserOutlined,
  BankOutlined,
  TagOutlined,
  ShopOutlined,
  ReadOutlined,
  TeamOutlined,
  BugOutlined,
  LoginOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const SiderMenu = () => {
  const { organizations } = useContext(OrganizationsContext);
  const { collapsed, toggle } = useContext(MainSiderContext);

  const location = useLocation();
  return (
    <Layout.Sider
      collapsible
      // collapsedWidth="20"
      collapsed={collapsed}
      onCollapse={toggle}
      className={styles.siderMenu}
    >
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <Menu
        mode="inline"
        theme={'dark'}
        selectedKeys={[location.pathname]}
        className={styles.menu}
      >
        <Menu.Item key="/">
          <DashboardOutlined />
          <span>Home</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/org">
          <BankOutlined />
          <span>Organization </span>
          <Link to="/org" />
        </Menu.Item>
        <Menu.SubMenu
          title={
            <>
              <TagOutlined />
              <span className="submenu-title-wrapper">Products</span>
            </>
          }
        >
          {organizations.map(i => (
            <Menu.Item key={`/org/${i.id}/products`}>
              <span>{i.name}</span>
              <Link to={`/org/${i.id}/products`} />
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu
          title={
            <>
              <ShopOutlined />{' '}
              <span className="submenu-title-wrapper">Points</span>
            </>
          }
        >
          {organizations.map(i => (
            <Menu.Item key={`/org/${i.id}/points`}>
              <UserOutlined />
              <span>{i.name}</span>
              <Link to={`/org/${i.id}/points`} />
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu
          title={
            <>
              <ReadOutlined />{' '}
              <span className="submenu-title-wrapper">Menu</span>
            </>
          }
        >
          {organizations.map(i => (
            <Menu.Item key={`/org/${i.id}/menu`}>
              <UserOutlined />
              <span>{i.name}</span>
              <Link to={`/org/${i.id}/menu`} />
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.Item key="/about">
          <BugOutlined /> <span>About</span>
          <Link to="/about" />
        </Menu.Item>
        <Menu.Item key="/users">
          <TeamOutlined />
          <span>Users</span>
          <Link to="/users" />
        </Menu.Item>
        <Menu.Item key="/login">
          <LoginOutlined /> <span>Login</span>
          <Link to="/login" />
        </Menu.Item>
      </Menu>
      {/*<div style={{ color: 'white', marginTop: 'auto' }}>yoyoyoyo</div>*/}
    </Layout.Sider>
  );
};

export default SiderMenu;
