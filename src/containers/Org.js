import React, { useEffect, useState } from 'react';
import OrganizationTable from '../components/OrganizationTable/OrganizationTable';
import api from '../api/v0';

const Org = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    setLoading(true);
    api.organization
      .getAll()
      .then(res => {
        // console.log(res);
        setData(
          res.data
            .map(organization => ({
              ...organization,
              key: organization.id,
            }))
            .reverse()
        );
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const add = item => {
    setLoading(true);
    api.organization
      .create(item.name)
      .then(res => {
        const newData = [
          {
            ...res.data,
            key: res.data.id,
          },
          ...data,
        ];
        setData(newData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const update = (key, row) => {
    const newData = [...data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
  };

  const nameFilters = [
    { text: 'Smith', value: 'Smith' },
    { text: 'Bush', value: 'Bush' },
    { text: 'Alice', value: 'Alice' },
  ];

  return (
    <OrganizationTable
      data={data}
      createNewItem={add}
      updateItem={update}
      nameFilters={nameFilters}
      loading={loading}
      getAll={getAll}
    />
  );
};

export default Org;
