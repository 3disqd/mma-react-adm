import React from 'react';
import Content from '../components/Content/Content';
import PointCard from '../components/PointCard/PointCard';

const PointPage = ({ ...props }) => {
  return (
    <Content>
      <PointCard
        pointId={props.match.params.pointId}
        orgId={props.match.params.orgId}
      />
    </Content>
  );
};

export default PointPage;
