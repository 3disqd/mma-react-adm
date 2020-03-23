import React, { useState } from 'react';
import { Button, Form, Input, Tag } from 'antd';
import EditableTable from '../EditableTable/EditableTable';
import EditableOperationCell from '../EditableOperationCell/EditableOperationCell';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const ExampleTable = ({
  data,
  createNewItem = () => {},
  updateItem = () => {},
  nameFilters = [],
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [newItems, setNewItems] = useState([]);

  const handleAdd = () => {
    const newItem = {
      id: 'new',
      key: 'new',
      name: 'kek',
      age: '',
      address: '',
    };
    setNewItems([newItem]);
    form.setFieldsValue({ ...newItem });
    setEditingKey('new');
  };

  const isEditing = record => record.key === editingKey;

  const cancel = () => {
    if (editingKey === 'new') {
      setNewItems([]);
    }
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      if (key === 'new') {
        createNewItem(row);
        setNewItems([]);
        setEditingKey('');
      } else {
        updateItem(key, row);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const [state, setState] = useState({
    searchedColumn: '',
    searchText: '',
  });

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   this.searchInput = node;
          // }}
          id={`${dataIndex}123`}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="link"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          type={'link'}
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // console.log(document.getElementById(`${dataIndex}123`));
        setTimeout(() => document.getElementById(`${dataIndex}123`).select());
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ ...state, searchText: '' });
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      required: true,
      sorter: {
        compare: (a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        },
        multiple: 1,
      },
      filters: nameFilters,
      // filters: [
      //   { text: 'Smith', value: 'Smith' },
      //   { text: 'Bush', value: 'Bush' },
      // ],
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      onFilter: (value, record) => record.name.indexOf(value) !== -1,
      // filteredValue: filteredInfo.name || null,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
      required: true,
      sorter: {
        compare: (a, b) => a.age - b.age,
        multiple: 2,
      },
      filters: [
        {
          text: 'двенадцать',
          value: '12',
        },
        {
          text: 'двадцать три',
          value: '23',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.age.indexOf(value) === 0,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => (
        <EditableOperationCell
          record={record}
          onSave={save}
          onCancel={cancel}
          onEdit={edit}
          isEditDisabled={editingKey !== ''}
          editable={isEditing(record)}
        />
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        disabled={editingKey !== ''}
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Form form={form} component={false}>
        <EditableTable
          columnsSettings={columns}
          dataSource={[...newItems, ...data]}
          editingKey={editingKey}
        />
      </Form>
    </>
  );
};

export default ExampleTable;
