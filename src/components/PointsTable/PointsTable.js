import React, { useContext, useEffect } from 'react';
import EditableTable from '../EditableTable/EditableTable';
import { PointsContext } from '../../contexts/PointsContext';
import TagsCell from '../TagsCell/TagsCell';

const PointsTable = ({
  updateItem = () => {},
  orgId,
}) => {
  const {
    loading,
    [orgId]: data,
    loadPointByOrganizationId,
    addPointToOrganization,
  } = useContext(PointsContext);

  const reload = () => {
    loadPointByOrganizationId(orgId);
  };

  const createPoint = point => {
    addPointToOrganization(orgId, point);
  };

  useEffect(() => {
    console.log('FETCH POINTS!');

    loadPointByOrganizationId(orgId);
  }, [orgId, loadPointByOrganizationId]);

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      width: '15%',
      editable: false,
      required: false,
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
      title: 'groups',
      dataIndex: 'groups',
      inputType: 'tags',
      editable: true,
      render: groups => <TagsCell tags={groups} />,
    },
  ];

  const newItemTemplate = {
    _id: 'new',
    name: '123',
    address: '123',
    // groups: ["1","2"],
  };

  return (
    <EditableTable
      columns={columns}
      dataSource={data || []}
      loading={loading}
      newItemTemplate={newItemTemplate}
      updateItem={updateItem}
      createNewItem={createPoint}
      reload={reload}
    />
  );
};

export default PointsTable;
