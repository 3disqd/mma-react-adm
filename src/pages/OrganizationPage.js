import React from 'react';
import OrganizationTable from '../components/OrganizationTable/OrganizationTable';
import Content from '../components/Content/Content';
import { Card } from 'antd';

const OrganizationPage = () => {
  return (
    <Content>
      <Card  bordered={false}>
        <OrganizationTable />
      </Card>
    </Content>
  );
};

export default OrganizationPage;
