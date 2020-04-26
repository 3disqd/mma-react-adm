import React from 'react';
import { Card } from 'antd';

const CardWithTabs = ({  children }) => {
  return (
    <Card
      bordered={false}
      tabList={[
        {
          key: 'article',
          tab: 'article',
        },
        {
          key: 'app',
          tab: 'app',
        },
        {
          key: 'project',
          tab: 'project',
        },
        {
          key: 'project1',
          tab: 'project1',
        },
        {
          key: 'project2',
          tab: 'project2',
        },
        {
          key: 'project3',
          tab: 'project3',
        },
        {
          key: 'project4',
          tab: 'project4',
        },
      ]}
    >
      {children}
    </Card>
  );
};

export default CardWithTabs;
