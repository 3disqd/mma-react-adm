import React, { useContext } from 'react';
import { MainSiderContext } from '../../../contexts/MainSiderContext';
import { Drawer, Layout, Grid } from 'antd';
const { useBreakpoint } = Grid;

const SiderMenuContainer = ({ children }) => {
  const { collapsed, toggle } = useContext(MainSiderContext);
  const screens = useBreakpoint();

  return screens.md ? (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={toggle}
      theme={'light'}
      style={{ zIndex: 50, boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)' }}
    >
      {children}
    </Layout.Sider>
  ) : (
    <Drawer
      placement="left"
      closable={false}
      onClose={toggle}
      bodyStyle={{ padding: 0 }}
      width={200}
      visible={!collapsed}
    >
      {children}
    </Drawer>
  );
};

export default SiderMenuContainer;
