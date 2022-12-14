import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Radio, Button, Space, Switch, Table, Input } from 'antd';
import DeletePopup from './popup/deletePopup';
import AddPopup from './popup/addPopup';
import FixPopup from './popup/fixPopup';
import './categoriesData.css';

const onSearch = (value) => console.log(value);
const { Search } = Input;
function CategoriesData() {
  const [hasData, setHasData] = useState(true);
  const [columns] = useState([
    {
      title: 'Categories',
      dataIndex: 'categories',
    },
    {
      title: 'Action',
      key: 'action',
      sorter: true,
      render: (_,record) => (
        <Space style={{width:'100%', justifyContent:'center'}} align="center" size="middle">
          <a>
            <FixPopup record={record} />
          </a>
          <a>
            <DeletePopup record={record} />
          </a>
        </Space>
      ),
    },
  ]);
  const data = [];
  for (let i = 1; i <= 100; i += 1) {
    data.push({
      key: i,
      categories: `This is Category No. ${i}!`,
    });
  }
  const tableColumns = columns.map((item) => ({
    ...item,
  }));

  return (
    <div className='ctg-all'>
      <div className='ctg-sbt'>
        <AddPopup tableColumns={tableColumns}/>
        <Search
        prefix = {<SearchOutlined />}
        placeholder="Search"
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        />
      </div>
      <Table
        columns={tableColumns}
        dataSource={hasData ? data : []}
      />
    </div>
  );
};
export default CategoriesData;