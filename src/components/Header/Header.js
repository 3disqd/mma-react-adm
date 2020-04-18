import React, { useContext } from 'react';
import { Layout } from 'antd';
import styles from './Header.module.css';
import cn from 'classnames';
import { MainSiderContext } from '../../contexts/MainSiderContext';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ProfileButton from './ProfileButton/ProfileButton';
import LangButton from './LangButton/LangButton';
import NotificationsButton from './NotificationsButton/NotificationsButton';
import OrgButton from './OrgButton/OrgButton';

const Header = () => {
  const { collapsed, toggle } = useContext(MainSiderContext);

  return (
    <>
      <Layout.Header className={styles.spacer} />
      <Layout.Header
        className={cn({ [styles.headerWide]: collapsed }, styles.header)}
      >
        <div onClick={toggle} className={styles.siderToggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <OrgButton className={styles.button} />

        <div style={{ flex: '1 1 0' }} />
        <NotificationsButton className={styles.button} />
        <ProfileButton className={styles.button} />
        <LangButton className={styles.button} />
      </Layout.Header>
    </>
  );
};

export default Header;
