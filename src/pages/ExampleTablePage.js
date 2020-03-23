import React, { useState } from 'react';
import ExampleTable from '../components/ExampleTable/ExampleTable';

const ExampleTablePage = () => {
  const [data, setData] = useState([
    {
      id: '1',
      key: '1',
      name: 'Charlie Bush',
      age: '12',
      address: 'London, Park Lane no. 0',
      tags: ['nice', 'developer'],
    },
    {
      id: '2',
      key: '2',
      name: 'Alice Smith',
      age: '23',
      address: 'London, Park Lane no. 1',
      tags: ['loser'],
    },
    {
      id: '55',
      key: '55',
      name: 'Bob Smith',
      age: '34',
      address: 'London, Park Lane no. 5',
      tags: ['cool', 'teacher'],
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

  const nameFilters = [
    { text: 'Smith', value: 'Smith' },
    { text: 'Bush', value: 'Bush' },
    { text: 'Alice', value: 'Alice'}
  ];

  return (
    <ExampleTable
      data={data}
      createNewItem={add}
      updateItem={update}
      nameFilters={nameFilters}
    />
  );
};

export default ExampleTablePage;
