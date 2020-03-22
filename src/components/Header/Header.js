import React from 'react';
// import styles from './Header.module.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/org">Organization</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
