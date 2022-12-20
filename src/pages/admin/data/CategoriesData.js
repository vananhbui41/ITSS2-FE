import React, { useState, useEffect } from 'react';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Radio, Button, Space, Switch, Table, Input, Modal } from 'antd';
import './categoriesData.css';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import DeletePopup from './popup/deletePopup';
import AddPopup from './popup/addPopup';
import FixPopup from './popup/fixPopup';


function CategoriesData(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchedText, setSearchText ] = useState("");

  // Search
  const onSearch = (value) => {
    setSearchText(value);
  };
  const { Search } = Input;

  // Data
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          'https://lavie-backend.herokuapp.com/api/categories'
        )
        setDataSource(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTodos()
  }, [])

  const columns = [
    {
      title: 'Loại tags',
      dataIndex: 'name',
      filteredValue: [searchedText],
      onFilter: (value, record)=>{
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      className: 'ant-table-cell-action',
      render: (record) => {
        return(
          <Space style={{width:'100%', justifyContent:'center'}} align="center" size="middle">
            <a>
              <EditOutlined 
              onClick={()=>{
                editCategory(record);
              }}
              />
            </a>
            <a>
              <DeleteOutlined
              onClick={()=>{
                deleteCategory(record)
              }}
              />
            </a>
          </Space>
        )
      },
    },
  ];

  // Add Category
  const addCategory = (name) => {
    setDataSource([...dataSource , {name}])
  }
  // Delete Category
  const deleteCategory = (record) => {
    
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xoá loại tag này không?",
      cancelText: "Huỷ",
      okText: "Xoá",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((td) => td.id !== record.id)
        })
      }
    })
  }
  // Edit Category
  const editCategory = (record) => {
    setIsEditing(true)
    setEditingCategory({...record})
  }
  const resetEditing = () =>{
    setIsEditing(false);
    setEditingCategory(null);
  }

  return (
    <div className='ctg-all'>
      <div className='ctg-sbt'>
        <AddPopup addCategory={addCategory}>
          {props.children}
        </AddPopup>
        <Search
        prefix = {<SearchOutlined />}
        placeholder="Tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
        onSearch={onSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
      visible={isEditing}
      title="Chỉnh sửa loại tag"
      okText="Lưu"
      cancelText= "Huỷ"
      onCancel={() => {
        resetEditing("");
      }}
      onOk={() => {
        setDataSource(pre=>{
          return pre.map((td)=>{
            if(td.id === editingCategory.id){
              return editingCategory;
            }
            return td;
          });
        });
        resetEditing("");
      }}
      >
        <Input
          // label={dataSource}
          value={editCategory?.name}
          onChange={(e) => {
            setEditingCategory((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
};
export default CategoriesData;