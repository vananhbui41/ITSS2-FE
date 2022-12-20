import React , { useEffect, useState } from 'react';
import { Button, Modal,  Form, Input, Select , Upload, Table} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import SearchCard from '../../components/Homepage/SearchCard'; 
import {} from '../../components/sidebar/index.css' ;
import {getDataWord} from "./apiAdmin/wordFetch"

function Words() {
    const [open, setOpen] = useState(false);
    const [mm, setMM] = useState(false);
    const [wordData, setWordData] = useState();
    
    const [showExample, setShowExample] = useState(false);
    
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const { TextArea } = Input;
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
      };
    const getDetailWord = (word) =>{
        console.log("view word: ", word);
    }
    const deleteWord   = (word) =>{
        const newData = data.filter(dt => dt.word !== word);
        setData(newData);
    }
    
    const dataSource= [
        {
            key: '1',
            word: 'Word1',
            content: 'Content1',
            type: 'Type1',
            topic: 'Topic1',
            means: 'Means1'

        },
        {
            key: '2',
            word: 'Word2',
            content: 'Content1',
            type: 'Type1',
            topic: 'Topic1',

        }
    ];
    const [dataEditWord, setDataEditWord] = useState(dataSource[0]);
    const [openEdit, setOpenEdit] = useState(false);
   
    
    const columns = [
        {
            title: 'Từ vựng',
            dataIndex: 'word',
            with: '20%',
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
                        {data.word}
                    </div>
                );
            }
        },
        {
            title: 'Bối cảnh',
            dataIndex: 'content',
            with: '20%',
            render: (record, data) =>{
                const context1 = data.categories?.context;
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
                        {data.categories?.context ?
                        <div>
                            {context1.map((context) =>{
                                return(
                                <span key ={context.id}>{context.name} , </span>
                                );
                            } )}
                        </div>
                        :""    
                        }
                    </div>
                );
            }
        },
        {
            title: 'Loại từ',
            dataIndex: 'type',
            with: '20%',
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
                         {data.categories?.type ?
                        <div>
                            {data.categories?.type.map(context =>{
                                return(<span>{context.name} , </span>);
                                
                            } )}
                        </div>
                        :""    
                        }
                    </div>
                    
                );
            }
        },
        {
            title: 'Chủ đề',
            dataIndex: 'topic',
            with: '20%',
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
                        {data.categories?.topic ?
                    <div>
                        {data.categories?.topic.map(context =>{
                            return(
                               <span> {context.name}</span>
                            );
   
                        } )}
                    </div>
                    :""    
                    }
                    </div>
                );
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            with: '20%',
            render: (record, data) => {
                return(
                    <div 
                       
                    > 
                        <Button onClick={() =>{
                            getDetailWord(data.word);
                        }} ><EyeOutlined /></Button>
                        <Button onClick={()=>{
                           
                            // setOpenEdit(true);
                            setWordData(data);
                            setEditData(data);
                            setOpenEdit(true);
                            setMM(true);}}>
                                <EditOutlined />
                        </Button>
                        <Button onClick={()=>{
                            deleteWord(data.word);
                        }}>
                            <DeleteOutlined />
                        </Button>

                    </div>
                );
            }
        },

    ]
    const [editData, setEditData] = useState();
    const EditWord11 = (data) =>{
       
       const handleType = (value) =>{
            const dt1 = editData;
            dt1.type = value;
            setEditData(dt1); 
       }
        console.log("hh: ", editData.word);
        return (
            <Modal
                title="Chỉnh sửa từ"
                centered
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                width={1000}
                okText="Lưu"
                cancelText="Huỷ"
            >
                {/* <div>hello</div> */}
                        <Form
                            name="edit-word"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                           
                           <Form.Item label="Chỉnh sửa từ">
                                <Input value={editData.word} onChange={(e)=>{
                                    const dt1 = editData;
                                    dt1.word = e.target.value;
                                     setEditData(dt1);
                                     console.log("edit word", editData);
                               }}/>
                            </Form.Item>
                            <Form.Item label="Loại từ">
                                <Select 
                                defaultValue={editData.type} 
                                onChange={handleType}
                                options={[
                                    {
                                        value: 'Loại từ 1',
                                        lable: 'Loại từ 1',
                                    },
                                    {
                                        value: 'Loại từ 2',
                                        lable: 'Loại từ 2',
                                    },
                                    {
                                        value: 'Loại từ 3',
                                        lable: 'Loại từ 3',
                                    },
                                ]}
                                  
                                />
                               
                            </Form.Item>
                            <Form.Item
                                label="Ý nghĩa"
                               
                                rules={[{ required: true, message: 'Hãy nhập ý nghĩa của từ!' }]}
                            >
                            <TextArea rows={4} value={editData.means} onChange={(e)=>{
                                    const dt1 = editData;
                                    dt1.content = e.target.value;
                                    setEditData(dt1);
                            }}/>
                            </Form.Item>
                            <h2>Ví dụ: </h2>
                            
                            <Button className='mt-4' onClick={()=>{setShowExample(!showExample)}}>Thêm ví dụ</Button>
                            {showExample && 
                            (
                                <>
                                 <Form.Item label="Bối cảnh" name = "select-context">
                                <Select>
                                    <Select.Option value="context1">Bối cảnh 1</Select.Option>
                                    <Select.Option value="context2">Bối cảnh 2</Select.Option>
                                    <Select.Option value="context3">Bối cảnh 3</Select.Option>
                                </Select>
                            </Form.Item>
                                <Form.Item
                                    label="Chủ đề"
                                    name="topic"
                                    rules={[{ required: true, message: 'Hãy nhập chủ đề của bạn' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Hình ảnh"  valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải lên</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </>
                            )
                        }
                            
                        <h2 className='mt-4'>Từ ngữ liên quan</h2>
                        <Form.Item
                            label="Từ đồng nghĩa"
                            name="synonyms"
                            rules={[{ required: true, message: 'Hãy nhập từ đồng nghĩa!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Từ trái nghĩa"
                            name="Antonymic"
                            rules={[{ required: true, message: 'Hãy nhập từ trái nghĩa!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{background: '#4096ff'}}>
                            Thêm
                            </Button>
                        </Form.Item>
                        </Form>
            </Modal>
        );
    }

   
    const [data, setData] = useState(dataSource);

    const ModelAdd = () =>{
        return(
                    <Modal
                        title="Thêm từ"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
                        okText="Thêm"
                        cancelText="Huỷ"
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Từ vựng"
                                name="word"
                                rules={[{ required: true, message: 'Hãy nhập từ vựng!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Loại từ" name = "select-type">
                                <Select>
                                    <Select.Option value="type1">type1</Select.Option>
                                    <Select.Option value="type2">type2</Select.Option>
                                    <Select.Option value="type3">type3</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Ý nghĩa"
                                name="means"
                                rules={[{ required: true, message: 'Hãy nhập ý nghĩa của từ vựng!' }]}
                            >
                            <TextArea rows={4} />
                            </Form.Item>
                            <h2>Ví dụ </h2>
                            
                            <Button className='mt-4' onClick={()=>{setShowExample(!showExample)}}>Thêm ví dụ</Button>
                            {showExample && 
                            (
                                <>
                                 <Form.Item label="Bối cảnh" name = "select-context">
                                <Select>
                                    <Select.Option value="context1">context1</Select.Option>
                                    <Select.Option value="context2">context2</Select.Option>
                                    <Select.Option value="context3">context3</Select.Option>
                                </Select>
                            </Form.Item>
                                <Form.Item
                                    label="Chủ đề"
                                    name="topic"
                                    rules={[{ required: true, message: 'Hãy nhập chủ đề!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Hình ảnh"  valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải lên</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </>
                            )
                        }
                            
                        <h2 className='mt-4'>Từ ngữ liên quan</h2>
                        <Form.Item
                            label="Từ đồng nghĩa"
                            name="synonyms"
                            rules={[{ required: true, message: 'Hãy nhập từ đồng nghĩa!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Từ trái nghĩa"
                            name="Antonymic"
                            rules={[{ required: true, message: 'Hãy nhập từ trái nghĩa!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{background: '#4096ff'}}>
                            Thêm
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
        );
    }
    /// call api

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataWord('words');
           console.log("res: ", res);
            const ck = [];
            const tt=[];
            const list = [];
            setData(res);
            // res.forEach(data =>{
            //     if(!ck.includes(data.category.name)){
            //         ck.push(data.category.name);
            //         const a = {"value": data.category.name, "lable": data.category.name, "category_id": data.category_id};
            //         list.push(a);
            //     }
            //     const b = {'name' : data.name, 'id': data.id};
            //     tt.push(b);
            // })
            // console.log("create list:", list);
            // setListCate(list);
            // setListTag(tt);

        }
        fetchData()
       
    }, [])
    return (
        <>
        <div>
       
            <section>
          
                <div className=" text-4xl  word-des " style={{display:'grid', marginTop: '5rem', padding: '20px'}} >
                    <SearchCard />
                   

                    <Button type="primary" style={{background: '#4096ff', width: '30%'}} onClick={() => setOpen(true)}>
                        Thêm
                    </Button>
                   

                    <Table 
                        dataSource={data}
                        pagination={{defaultPageSize: 5}}
                        columns={columns}
                    />

                    {mm &&
                        // <EditWord data={wordData} />
                        EditWord11(editData)
                    }
                     {
                        ModelAdd()
                    }

                </div>
                
            </section>
            
            </div>
        </>
    );
}


export default Words;