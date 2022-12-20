import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Modal,  Form, Input, Select , Upload, Table, Col, Row} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import {getData, searchTagDB, postData, putData,deleteData} from "./apiAdmin/fetchData";


const SelectCategory = ({dataTag, handleType, option}) =>{

    return(
        <Form.Item label="Loại tag">
            <Select 
            style={{width: '80%'}}
            value={dataTag.category} 
            onChange={handleType}
            // options={[
            //     {
            //         value: 'context',
            //         lable: 'category1',
            //     },
            //     {
            //         value: 'category2',
            //         lable: 'category2',
            //     },
            //     {
            //         value: 'category3',
            //         lable: 'category3',
            //     },
            // ]}
            options={option}
          
        />
       
        </Form.Item>
    );
   

}
const SearTag = ({dataTag, setDataTag}) =>{
    // console.log("data tag on input: ", dataTag);
    return(
        <Form.Item label="Tag" >
        <Input style={{width: '80%'}}   value={dataTag.name}
        onChange={(e) =>{
            const dt1 = dataTag;
            // dt1.name = e.target.value;
            setDataTag({...dataTag, "name":e.target.value });
            console.log("hh: ", dataTag);
        }}
       />
     </Form.Item>
    )
}

function Tags() {
    // datatag: data de search category vs tag, cx la de edit

    const [dataTag, setDataTag] = useState({
        'name': '',
        'category': ''
    });

    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openNotify, setOpenNotify] = useState(false);
    const [tagDelete, setTagDelete] = useState();
    const deleteTable = (tag) =>{
        console.log("vao delete");
        const fetchData = async () => {
            const res = await deleteData(`tags/${dataEditTag.id}`);
            setOpenDelete(false);
            setOpenNotify(true);
            // const mess = res.message.name ? res.message.name: res.message;
            setNotify(res.message);
        }
        fetchData();
        // const newData = dataTable.filter(dt=> dt.name !== dataEditTag.name);
        // setDataTble(newData);
       
    }
    const [listCate, setListCate] = useState();
    const ModelDelete = (tag) =>{
        const aa = `Bạn có chắc chắn muốn xoá tag "${tag}"`
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
                        Huỷ
                    </Button>
                </Col>
                <Col span={12}>
                    <Button style={{width: '80%',background: '#1677ff', color: 'white', boder: 'none'}} 
                    onClick={()=>{deleteTable(tag)}}>Xoá</Button>
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
                <Row gutter={16}>
                    <Col span={12}>
                        <Button 
                        style={{width:'80%'}}
                        onClick={()=>{
                            setOpenAdd(false)}}
                        >
                            Huỷ
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none', width:'80%'}}
                         onClick={() => {AddTagDB(dataTag)}} >Thêm</Button>
                    </Col>
                </Row>
            ]}

           
            width={300}
        >
           <SearTag dataTag={dataTag} setDataTag= {setDataTag} />
           <SelectCategory dataTag={dataTag} handleType={handleType} option={listCate} />
                   
        </Modal>
        );
    }

    const ModelDetail = () =>{
        // console.log("datatag: ", dataTag);
        return(
            <Modal
           
            centered
            // open={openDetail}
            onCancel={()=>{setOpenDetail(false)}}
           open={openDetail}
            footer={[
                <Row>
                    <Col span={10}>
                        <Button style={{width: '80%'}} onClick={()=>{
                            setOpenDetail(false)}}
                        >
                            Huỷ
                        </Button>
                    </Col>
                    
                    <Col span={10}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none', width:"80%"}} 
                        onClick={() =>{
                            editTag(dataTag);
                        }}
                        >Lưu</Button>
                    </Col>
                </Row>
            ]}

         
            width={300}
        >
           <SearTag dataTag={dataTag} setDataTag= {setDataTag} />
           <SelectCategory dataTag={dataTag} handleType={handleType} option={listCate} />

        </Modal>
        );
    }


    const [dataSource, setDataSource] = useState();
    const [clickSearch, setClickSearch] = useState(false);
    const [listTag, setListTag] = useState();
    const [dataTable, setDataTble] = useState();
    const [notify, setNotify] = useState();
    const [dataEditTag, setDataEditTag] = useState();
    
    const AddTagDB = (data) =>{
       
        const mm = listCate.filter(data1 => data1.value === data.category);
        
        const a = { 'category_id' : mm[0].category_id,
        'name': data.name}
        const fetchData = async () => {
            const res = await postData('tags', a);
            console.log("mmm res: ", res);
            setOpenAdd(false);
            setOpenNotify(true);
            const mess = res.message.name ? res.message.name: res.message;
            setNotify(mess);
        }
        fetchData();
    }

    const editTag = (data) =>{
      
        const mm = {'category_id': dataEditTag.category_id, 'name': dataTag.name};
        const fetchData = async () => {
            const res = await putData(`tags/${dataEditTag.id}`, mm);
           
            setOpenDetail(false);
            setOpenNotify(true);
            const mess = res.message.name ? res.message.name: res.message;
            setNotify(mess);
        }
        fetchData();
        // const fetchData = 
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData('tags');
            setDataTble(res);
            const ck = [];
            const tt=[];
            const list = [];
            res.forEach(data =>{
                if(!ck.includes(data.category.name)){
                    ck.push(data.category.name);
                    const a = {"value": data.category.name, "lable": data.category.name, "category_id": data.category_id};
                    list.push(a);
                }
                const b = {'name' : data.name, 'id': data.id};
                tt.push(b);
            })
            console.log("create list:", list);
            setListCate(list);
            setListTag(tt);

        }
        fetchData()
       
    }, [openNotify])

    useEffect(() => {
        const fetchData = async () => {
            const res = await searchTagDB('tags', dataTag.name, dataTag.category);
            setDataTble(res);
        }
        fetchData()
       
    }, [clickSearch])

    const ModelNotify = () =>{
        return(
            <Modal
           
            centered
            // open={openDetail}
            onCancel={()=>{setOpenNotify(false)}}
           open={openNotify}
            footer={[
                <Row>
                    <Col span={24}>
                        <Button style={{width: '80%',background: '#1677ff', color: 'white', boder: 'none'}} onClick={()=>{
                            setOpenNotify(false)}}
                        >
                            cancel
                        </Button>
                    </Col>
                    
                  
                </Row>
            ]}

         
            width={300}
        >
           {notify}

        </Modal>
        );
    }

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
                        {data?.name ? data?.name : ""}
                    </div>
                );
            }
        },
        {
            title: 'Loại tag',
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
                        {data?.category?.name ?  data?.category?.name : ""}
                    </div>
                );
            }
        },
       
       
        {
            title: 'Thao tác',
            dataIndex: 'action',
            with: '30%',
            render: (record, data) => {
                return(
                    <div 
                       
                    > 
                        
                        <Button onClick={()=>{
                            console.log("data: ", data);
                            const aaa = {'name': data.name, 'category': data.category.name};
                            setDataTag(aaa);
                            setDataEditTag(data);
                            setOpenDetail(true);
                        }}>
                                <EditOutlined />
                        </Button>

                        <Button 
                       onClick={()=>{
                        setOpenDelete(true);
                        setDataEditTag(data);
                        setTagDelete(data.name);
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
        
        setDataTag({...dataTag, "category":value});
       
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
                    <SelectCategory dataTag={dataTag} handleType={handleType} option={listCate} />

                    </Col>
                    <Col span={5}>
                    <SearTag dataTag={dataTag} setDataTag= {setDataTag} />
           
                    </Col>
                    <Col span={4}>
                   <Button type='primary' 
                    onClick={()=>{
                        setClickSearch(!clickSearch);
                    }}
                   >Tìm kiếm</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <Button style={{background: '#1677ff', color: 'white', boder: 'none'}} 
                            onClick={()=>{
                                const dt1 = dataTag;
                                dt1.name = '';
                                dt1.category = '';
                                setDataTag(dt1);
                                setOpenAdd(true);
                            }}
                        >Thêm</Button>
                    </Col>
                </Row>
               
                <Table 
                        dataSource={dataTable}
                        pagination={{defaultPageSize: 5}}
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
                    {
                        ModelNotify()
                    }
                  
                </div>
                
            </section>
        </>
    );
}

export default Tags;