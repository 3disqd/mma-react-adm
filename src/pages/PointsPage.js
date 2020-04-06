import React from 'react';
import PointsTable from '../components/PointsTable/PointsTable';

const PointsPage = ({ ...props }) => {
  return <PointsTable orgId={props.match.params.orgId} />;
};

export default PointsPage;
