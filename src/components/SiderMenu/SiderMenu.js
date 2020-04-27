import React, { useContext } from 'react';
import styles from './SiderMenu.module.css';
import SiderMenuContainer from './SiderMenuContainer/SiderMenuContainer';
import { Grid, Menu } from 'antd';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { OrganizationsContext } from '../../contexts/OrganizationsContext';
import {
  BankOutlined,
  TagOutlined,
  ShopOutlined,
  TeamOutlined,
  BugOutlined,
  LoginOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { MainSiderContext } from '../../contexts/MainSiderContext';
const { useBreakpoint } = Grid;

const SiderMenu = () => {
  const { currentOrganizationId } = useContext(OrganizationsContext);
  const { collapsed, toggle } = useContext(MainSiderContext);
  const screens = useBreakpoint();
  const location = useLocation();

  return (
    <SiderMenuContainer
      isLayout={screens.md}
      toggle={toggle}
      collapsed={collapsed}
    >
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className={styles.menu}
        onClick={() => {
          if (!screens.md) {
            toggle();
          }
        }}
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
        <Menu.Item key={`/org/${currentOrganizationId}/products`}>
          <TagOutlined />
          <span>Products </span>
          <Link to={`/org/${currentOrganizationId}/products`} />
        </Menu.Item>
        <Menu.Item key={`/org/${currentOrganizationId}/points`}>
          <ShopOutlined />
          <span>Points </span>
          <Link to={`/org/${currentOrganizationId}/points`} />
        </Menu.Item>
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
    </SiderMenuContainer>
  );
};

export default SiderMenu;
