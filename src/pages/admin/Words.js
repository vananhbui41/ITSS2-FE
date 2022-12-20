import React , { useEffect, useState } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { Helmet } from 'react-helmet-async';
import SearchCard from '../../components/Homepage/SearchCard'; 
import {} from '../../components/sidebar/index.css' ;
import {getDataWord} from "./apiAdmin/wordFetch"
import { Button, Modal, Form, Input, Select, Upload, Table, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SearchCard from '../../components/Homepage/SearchCard';
import { getWords, search, getTags } from '../../api/search';
import { } from '../../components/sidebar/index.css';
import { getData, searchTagDB, postData, putData, deleteData } from "./apiAdmin/fetchData";
import SearchResultCard from '../../components/Homepage/SearchResultCard';
import Spinner from '../../components/Spinner';



function Words() {
    const [open, setOpen] = useState(false);
    const [showExample, setShowExample] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    // ìnfor search 
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])
    const [result, setResult] = useState([])
    const [dlWord, setDlWord] = useState();

    const handleOnSearch = async ({ keyword, type, context, topic }) => {
        setData({ keyword, type, context, topic })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getWords(data)
            setResult(res.data)
            setLoading(false)
        }
        fetchData()
    }, [data])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getWords({})
            setWords(res.data.map(e => e.word))
            setLoading(false)
        }
        fetchData()
    }, [])
    const columns = [
        {
            title: 'Từ vựng',
            dataIndex: 'word',
            with: '20%',
            render: (record, data) => {
                return (
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
            render: (record, data) => {
                const context1 = data.categories?.context;
                return (
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
                                {context1.map((context) => {
                                    return (
                                        <span key={context.id}>{context.name} , </span>
                                    );
                                })}
                            </div>
                            : ""
                        }
                    </div>
                );
            }
        },
        {
            title: 'Loại từ',
            dataIndex: 'type',
            with: '20%',
            render: (record, data) => {
                return (
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
                                {data.categories?.type.map(context => {
                                    return (<span>{context.name} , </span>);

                                })}
                            </div>
                            : ""
                        }
                    </div>

                );
            }
        },
        {
            title: 'Chủ đề',
            dataIndex: 'topic',
            with: '20%',
            render: (record, data) => {
                return (
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
                                {data.categories?.topic.map(context => {
                                    return (
                                        <span> {context.name}</span>
                                    );

                                })}
                            </div>
                            : ""
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
                return (
                    <div

                    >
                        <Button onClick={() => {
                            setOpenDetail(true)
                            setDetailWord(data.id)
                            // getDetailWord(data.id);
                        }} ><EyeOutlined /></Button>
                        <Button onClick={() => {

                            setOpenEdit(true);
                            // setWordData(data);
                            // setEditData(data);
                            // setOpenEdit(true);
                            // setMM(true);
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => {
                            setOpenDelete(true);
                            setDlWord(data.id);
                        }}>
                            <DeleteOutlined />
                        </Button>

                    </div>
                );
            }
        },

    ]
    // display word details model

    const [openDetail, setOpenDetail] = useState(false);
    const [detailWord, setDetailWord] = useState();
    const GetDetailWord = (wordId) => {
        const item = result.filter(items => items.id === wordId.wordId);
        // console.log("wordId: ", wordId);

        // console.log("result: ", result);
        // console.log("iten: ", item);
        return (
            <Modal
                title="Details words"
                centered
                open={openDetail}
                onOk={() => setOpenDetail(false)}
                onCancel={() => setOpenDetail(false)}
                width={1000}
            >
                <SearchResultCard result={item} />
            </Modal>
        )
    }


    // edit data
    const [editData, setEditData] = useState();
    const EditWords = (data) => {

        const handleType = (value) => {
            const dt1 = editData;
            dt1.type = value;
            setEditData(dt1);
        }
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
    // model add 

    const [categories, setCategories] = useState([])
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const { TextArea } = Input;
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [options, setOptions] = useState([]);
    const [meaningList, setMeaningList] = useState([{}]);
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


    // model delete words

    const [openDelete, setOpenDelete] = useState(false);
    const deleteWord = (wordId) => {
        const fetchData = async () => {
            const res = await deleteData(`words/${wordId}`);
            setOpenDelete(false);
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
                   
        fetchData();
        const newData = result.filter(dt => dt.id !== wordId);
        setResult(newData)
    }
    const ModelDelete = (wordId) => {
        const msg = `Are you sure want to delete words?`
        return (
            <Modal
                title={msg}
                centered
                open={openDelete}

                footer={[
                    <Row>
                        <Col span={12}>
                            <Button style={{ width: '80%' }} onClick={() => {
                                setOpenDelete(false)
                            }}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{ width: '80%', background: '#1677ff', color: 'white', boder: 'none' }}
                                onClick={() => { deleteWord(wordId) }}>DELETE</Button>
                        </Col>
                    </Row>
                ]}
                onCancel={() => {
                    setOpenDelete(false)
                }}
                width={300}
            >
                <div style={{ display: 'none' }}>{wordId}</div>

            </Modal>
        );

    }
    return (
        <>
            <div>
                <section>
                    <div className=" text-4xl  word-des " style={{ display: 'grid', marginTop: '5rem', padding: '20px' }} >
                        <SearchCard onSearch={handleOnSearch} words={words} />
                        <div>
                            <Button type="primary" style={{ background: '#4096ff', width: '30%' }} onClick={() => setOpen(true)}>
                                ADD
                            </Button>
                            {ModelAdd()}
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : result?.length > 0 ? (
                            <>
                                <Table
                                    dataSource={result}
                                    pagination={{ defaultPageSize: 5 }}
                                    columns={columns}
                                />
                                <ModelDelete wordId={dlWord} />
                                <EditWords data={editData} />
                                <GetDetailWord wordId={detailWord} />
                            </>

                        ) : (
                            <p>Không tìm thấy bản ghi.</p>
                        )
                        }


                    </div>

                </section>

            </div>
        </>
    );
}


export default Words;