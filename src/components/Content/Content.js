import React from 'react';
import { Layout } from 'antd';

const Content = ({ children, direction = 'column' }) => {
  return (
    <Layout.Content
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: direction,
      }}
    >
      {children}
    </Layout.Content>
  );
};

export default Content;
