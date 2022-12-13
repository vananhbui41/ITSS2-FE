import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Modal,  Form, Input, Select , Upload, Table, Col, Row} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';

function Tags() {
    // datatag: data de search category vs tag, cx la de edit

    const [dataTag, setDataTag] = useState({
        'tag': '',
        'category': ''
    });

    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [tagDelete, setTagDelete] = useState();
    const deleteTable = (tag) =>{
        const newData = dataTable.filter(dt=> dt.tag !== tag);
        setDataTble(newData);
        setOpenDelete(false);
    }

    const ModelDelete = (tag) =>{
        const aa = `are you sure want to delete tag "${tag}"`
        return(
        <Modal
            title={aa}
            centered
            open={openDelete}
          
            footer={[
                <Row>
                <Col span={12}>
                    <Button style={{width: '80%'}} onClick={()=>{
                        setOpenDelete(false)}}
                    >
                        cancel
                    </Button>
                </Col>
                <Col span={12}>
                    <Button style={{width: '80%',background: '#1677ff', color: 'white', boder: 'none'}} onClick={()=>{deleteTable(tag)}}>delete</Button>
                </Col>
            </Row>
                ]}
            onCancel={()=>{
                setOpenDelete(false)
            }}
            width={300}
        >
            <div style={{display:'none'}}>{tag}</div>
                   
        </Modal>
        );
       
    }

    const ModelAddTag = ()=>{
        return(
            <Modal
           
            centered
            // open={openDetail}
            onCancel={()=>{setOpenAdd(false)}}
            open={openAdd}
            footer={[
                <Row>
                    <Col span={12}>
                        <Button onClick={()=>{
                            setOpenAdd(false)}}
                        >
                            cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none'}} >Add</Button>
                    </Col>
                </Row>
            ]}

           
            width={300}
        >
           {searTag()}
           {selectCategory()}
                   
        </Modal>
        );
    }

    const ModelDetail = () =>{
        return(
            <Modal
           
            centered
            // open={openDetail}
            onCancel={()=>{setOpenDetail(false)}}
           open={openDetail}
            footer={[
                <Row>
                    <Col span={12}>
                        <Button onClick={()=>{
                            setOpenDetail(false)}}
                        >
                            cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none'}} >save</Button>
                    </Col>
                </Row>
            ]}

         
            width={300}
        >
           {searTag()}
           {selectCategory()}
                   
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
                        
                        <Button onClick={()=>{
                            const aaa = {'tag': data.tag, 'category': data.category};
                            setDataTag(aaa);
                            setOpenDetail(true);
                        }}>
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
                style={{width: '80%'}}
                defaultValue={dataTag.category} 
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
            <Input style={{width: '80%'}}   defaultValue={dataTag.tag}
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
                <Row>
                    <Col span={5}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none'}} 
                            onClick={()=>{
                                const dt1 = dataTag;
                                dt1.tag = '';
                                dt1.category = '';
                                setDataTag(dt1);
                                setOpenAdd(true);
                            }}
                        >Add</Button>
                    </Col>
                </Row>
                <Table 
                        dataSource={dataTable}
                        pagination={{defaultPageSize: 10}}
                        columns={columns}
                    />
                    {
                    
                     ModelDelete(tagDelete)
                    }

                    {
                        ModelDetail()
                    }
                    {
                        ModelAddTag()
                    }
                  
                </div>
                
            </section>
        </>
    );
}

export default Tags;