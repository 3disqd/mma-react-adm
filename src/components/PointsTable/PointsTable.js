import React, { useContext, useEffect } from 'react';
import EditableTable from '../EditableTable/EditableTable';
import { PointsContext } from '../../contexts/PointsContext';
import TagsCell from '../TagsCell/TagsCell';
import ParsedSchedule from '../ParsedSchedule/ParsedSchedule';
import { Link } from 'react-router-dom';

const PointsTable = ({ orgId }) => {
  const {
    loading,
    [orgId + '_points']: data,
    loadPointByOrganizationId,
    addPointToOrganization,
    updatePoint,
  } = useContext(PointsContext);

  const reload = () => {
    loadPointByOrganizationId(orgId);
  };

  const createPoint = point => {
    addPointToOrganization(orgId, point);
  };

  useEffect(() => {
    if (!data) {
      console.log('FETCH POINTS!');
      loadPointByOrganizationId(orgId);
    }
  }, [orgId, loadPointByOrganizationId, data]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '15%',
      editable: false,
      required: false,
      render: id => <Link to={`/org/${orgId}/point/${id}`}>{id}</Link>,
    },
    {
      title: 'name',
      dataIndex: 'name',
      // width: '15%',
      editable: true,
      required: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      // width: '15%',
      editable: true,
      // required: true,
    },
    {
      title: 'schedule',
      dataIndex: 'schedule',
      // width: '200px',
      inputType: 'schedule',
      // editable: true,
      render: schedule => <ParsedSchedule schedule={schedule} />,
    },
    {
      title: 'groups',
      dataIndex: 'groups',
      inputType: 'tags',
      editable: true,
      render: groups => <TagsCell tags={groups} />,
    },
  ];

  const newItemTemplate = {
    id: 'new',
    name: '123',
    address: '123',
    schedule: undefined,
    groups: [],
  };

  const forceClearObject = {
    schedule: undefined,
  };

  return (
    <EditableTable
      columns={columns}
      dataSource={data || []}
      loading={loading}
      newItemTemplate={newItemTemplate}
      updateItem={updatePoint}
      createNewItem={createPoint}
      reload={reload}
      forseClearObject={forceClearObject}
    />
  );
};

export default PointsTable;
