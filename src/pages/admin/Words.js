import React , { useEffect, useState } from 'react';
import { Button, Modal,  Form, Input, Select , Upload, Table} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import SearchCard from '../../components/Homepage/SearchCard'; 
import {} from '../../components/sidebar/index.css' ;

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
            title: 'Word',
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
            title: 'Content',
            dataIndex: 'content',
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
                        {data.content}
                    </div>
                );
            }
        },
        {
            title: 'Type',
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
                        {data.type}
                    </div>
                );
            }
        },
        {
            title: 'Topic',
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
                        {data.topic}
                    </div>
                );
            }
        },
        {
            title: 'Action',
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
                title="edit word"
                centered
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                width={1000}
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
                           
                           <Form.Item label="word edit">
                                <Input value={editData.word} onChange={(e)=>{
                                    const dt1 = editData;
                                    dt1.word = e.target.value;
                                     setEditData(dt1);
                                     console.log("edit word", editData);
                               }}/>
                            </Form.Item>
                            <Form.Item label="type">
                                <Select 
                                defaultValue={editData.type} 
                                onChange={handleType}
                                options={[
                                    {
                                        value: 'type1',
                                        lable: 'lable1',
                                    },
                                    {
                                        value: 'type2',
                                        lable: 'lable2',
                                    },
                                    {
                                        value: 'type3',
                                        lable: 'lable3',
                                    },
                                ]}
                                  
                                />
                               
                            </Form.Item>
                            <Form.Item
                                label="meaning"
                               
                                rules={[{ required: true, message: 'Please input your meaning!' }]}
                            >
                            <TextArea rows={4} value={editData.means} onChange={(e)=>{
                                    const dt1 = editData;
                                    dt1.content = e.target.value;
                                    setEditData(dt1);
                            }}/>
                            </Form.Item>
                            <h2>example: </h2>
                            
                            <Button className='mt-4' onClick={()=>{setShowExample(!showExample)}}>add example</Button>
                            {showExample && 
                            (
                                <>
                                 <Form.Item label="context" name = "select-context">
                                <Select>
                                    <Select.Option value="context1">context1</Select.Option>
                                    <Select.Option value="context2">context2</Select.Option>
                                    <Select.Option value="context3">context3</Select.Option>
                                </Select>
                            </Form.Item>
                                <Form.Item
                                    label="topic"
                                    name="topic"
                                    rules={[{ required: true, message: 'Please input your topic!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="picture"  valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </>
                            )
                        }
                            
                        <h2 className='mt-4'>Related word</h2>
                        <Form.Item
                            label="synonyms"
                            name="synonyms"
                            rules={[{ required: true, message: 'Please input your synonyms!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Antonym"
                            name="Antonymic"
                            rules={[{ required: true, message: 'Please input your Antonym!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{background: '#4096ff'}}>
                            add
                            </Button>
                        </Form.Item>
                        </Form>
            </Modal>
        );
    }

   
    const [data, setData] = useState(dataSource);
    return (
        <>
        <div>
       
            <section>
          
                <div className=" text-4xl h-screen word-des " style={{display:'grid', marginTop: '5rem', padding: '20px'}} >
                    <SearchCard />
                   

                    <Button type="primary" style={{background: '#4096ff', width: '30%'}} onClick={() => setOpen(true)}>
                        add
                    </Button>
                    <Modal
                        title="add word"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={1000}
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
                                label="word"
                                name="word"
                                rules={[{ required: true, message: 'Please input your word!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="type" name = "select-type">
                                <Select>
                                    <Select.Option value="type1">type1</Select.Option>
                                    <Select.Option value="type2">type2</Select.Option>
                                    <Select.Option value="type3">type3</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="meaning"
                                name="means"
                                rules={[{ required: true, message: 'Please input your meaning!' }]}
                            >
                            <TextArea rows={4} />
                            </Form.Item>
                            <h2>example: </h2>
                            
                            <Button className='mt-4' onClick={()=>{setShowExample(!showExample)}}>add example</Button>
                            {showExample && 
                            (
                                <>
                                 <Form.Item label="context" name = "select-context">
                                <Select>
                                    <Select.Option value="context1">context1</Select.Option>
                                    <Select.Option value="context2">context2</Select.Option>
                                    <Select.Option value="context3">context3</Select.Option>
                                </Select>
                            </Form.Item>
                                <Form.Item
                                    label="topic"
                                    name="topic"
                                    rules={[{ required: true, message: 'Please input your topic!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="picture"  valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </>
                            )
                        }
                            
                        <h2 className='mt-4'>Related word</h2>
                        <Form.Item
                            label="synonyms"
                            name="synonyms"
                            rules={[{ required: true, message: 'Please input your synonyms!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Antonym"
                            name="Antonymic"
                            rules={[{ required: true, message: 'Please input your Antonym!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{background: '#4096ff'}}>
                            add
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>

                    <Table 
                        dataSource={data}
                        pagination={{defaultPageSize: 10}}
                        columns={columns}
                    />

                    {mm &&
                        // <EditWord data={wordData} />
                        EditWord11(editData)
                    }

                </div>
                
            </section>
            
            </div>
        </>
    );
}


export default Words;