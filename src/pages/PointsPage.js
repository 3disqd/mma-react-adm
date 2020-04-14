import React from 'react';
import PointsTable from '../components/PointsTable/PointsTable';
import Content from '../components/Content/Content';
import { Card } from 'antd';

const PointsPage = ({ ...props }) => {
  return (
    <Content>
      <Card bordered={false}>
        <PointsTable orgId={props.match.params.orgId} />
      </Card>
    </Content>
  );
};

export default PointsPage;
