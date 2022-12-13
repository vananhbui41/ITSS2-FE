import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Modal,  Form, Input, Select , Upload, Table, Col, Row} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';

function Tags() {
    // datatag: data de search 

    const [dataTag, setDataTag] = useState({
        'tag': '',
        'category': ''
    });

    const [openDelete, setOpenDelete] = useState(false);
    const [tagDelete, setTagDelete] = useState();
    const deleteTable = (tag) =>{
        const newData = dataTable.filter(dt=> dt.tag !== tag);
        setDataTble(newData);
        setOpenDelete(false);
    }

    const ModelDelete = (tag) =>{
        return(
        <Modal
            title="are you sure want to delete tag "  
            centered
            open={openDelete}
          
            footer={[
                <Row>
                <Col span={2}>
                    <Button onClick={()=>{
                        setOpenDelete(false)}}
                    >
                        cancel
                    </Button>
                </Col>
                <Col span={2}>
                    <Button onClick={()=>{deleteTable(tag)}}>delete</Button>
                </Col>
            </Row>
                ]}
            onCancel={()=>{
                setOpenDelete(false)
            }}
            width={1000}
        >
            {tag}
                   
        </Modal>
        );
       
    }

    const dataSource= [
        {
            key: '1',
            tag: 'tag1',
            category: 'category1',
           

        },
        {
            key: '2',
            tag: 'tag2',
            category: 'category2',

        }
    ];
    const [dataTable, setDataTble] = useState(dataSource);
    const columns = [
        {
            title: 'Tag',
            dataIndex: 'Tag',
            with: '30%',
            render: (record, data) =>{
                return(
                    <div 
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.tag}
                    </div>
                );
            }
        },
        {
            title: 'Content',
            dataIndex: 'content',
            with: '40%',
            render: (record, data) =>{
                return(
                    <div 
                        style={{
                            border: "1px solid #d9d9d9",
                            borderRadius: 5,
                            height: 75,
                            padding: "5px 8px",
                            position: "relative",
                        }}
                    >
                        {data.category}
                    </div>
                );
            }
        },
       
       
        {
            title: 'Action',
            dataIndex: 'action',
            with: '30%',
            render: (record, data) => {
                return(
                    <div 
                       
                    > 
                        
                        <Button >
                                <EditOutlined />
                        </Button>
                        <Button 
                       onClick={()=>{
                        setOpenDelete(true);
                        setTagDelete(data.tag);
                    }}
                        >
                            <DeleteOutlined 
                                
                            />
                        </Button>

                    </div>
                );
            }
        },

    ]
    const handleType = (value) =>{
        const dt1 = dataTag;
        dt1.category = value;
        setDataTag(dt1);
        console.log("datatag: ", dataTag);
   }

    const selectCategory = () =>{

        return(
            <Form.Item label="category">
                <Select 
                style={{width: '40%'}}
                // defaultValue={editData.type} 
                onChange={handleType}
                options={[
                    {
                        value: 'category1',
                        lable: 'category1',
                    },
                    {
                        value: 'category2',
                        lable: 'category2',
                    },
                    {
                        value: 'category3',
                        lable: 'category3',
                    },
                ]}
              
            />
           
            </Form.Item>
        );
       

    }
    const searTag = () =>{
        return(
            <Form.Item label="tag">
            <Input style={{width: '80%'}} name="tag" 
            onChange={(e) =>{
                const dt1 = dataTag;
                dt1.tag = e.target.value;
                setDataTag(dt1);
                console.log("hh: ", dataTag);
            }}
           />
        </Form.Item>
        )
    }

    return (
        <>
            <Helmet>
                <title> Tags - Words | Lavie </title>
            </Helmet>
            <section>
                
                <div className="text-4xl h-screen" style={{marginTop: '5rem'}}>
                {/* <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            {selectCategory()}
                        </div>
                        <div className='col-5'>
                            {searTag()}
                        </div>
                    </div>
                </div> */}
                <Row>
                    <Col span={10}>
                    {selectCategory()}
                    </Col>
                    <Col span={5}>
                    {searTag()}
                    </Col>
                    <Col span={4}>
                   <Button type='primary'>search</Button>
                    </Col>
                </Row>
                <Table 
                        dataSource={dataTable}
                        pagination={{defaultPageSize: 10}}
                        columns={columns}
                    />
                    {1 &&
                    
                     ModelDelete(tagDelete)
                    }
                  
                </div>
                
            </section>
        </>
    );
}

export default Tags;