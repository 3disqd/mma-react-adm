import React, { useState } from 'react';
import OrganizationTable from './OrganizationTable/OrganizationTable';

const Org = () => {
  const [data, setData] = useState([
    {
      id: '123',
      key: '123',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      id: '312',
      key: '321',
      name: 'Edward  1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);

  const add = item => {
    console.log(item);
    const newData = [
      {
        ...item,
        key: 123 + data.length + '',
        id: 123 + data.length + '',
      },
      ...data,
    ];
    setData(newData);
  };

  const update = (key, row) => {
    const newData = [...data];
    const index = newData.findIndex(item => key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
  };

  return (
    <OrganizationTable data={data} createNewItem={add} updateItem={update} />
  );
};

export default Org;
