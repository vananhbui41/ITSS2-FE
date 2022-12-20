import React, { useEffect, useState } from 'react';
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
            title: 'Word',
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
            title: 'Content',
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
            title: 'Type',
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
            title: 'Topic',
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
            title: 'Action',
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
        const item = result.filter(item => item.id === wordId);
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
                title="edit word"
                centered
                open={openEdit}
                onOk={() => setOpenEdit(false)}
                onCancel={() => setOpenEdit(false)}
                width={1000}
                okText="Save"
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

                    <Form.Item
                        label="word"
                        name="word"
                        rules={[{ required: true, message: 'Please input your word!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="furigana"
                        name="furigana"
                        rules={[{ required: true, message: 'Please input your furigana!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="type" name="select-type">
                        <Select>
                            {categories
                                .filter((item) => item.category_id === 2)
                                .map((item) => (
                                    <Select.Option key={item.id} value={item.name}>{item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <ListMeanings />
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

    useEffect(() => {
        const fetchData = async () => {
            const tagsData = await getTags()
            setCategories(tagsData.data)
            const obOptions = tagsData.data.filter(options => options.category_id === 3)
            const newArrayOptions = []
            obOptions.forEach((el) => {
                newArrayOptions.push({
                    label: el.name,
                    value: el.name
                })
            })
            setOptions(newArrayOptions)
        }
        fetchData()
    }, [])

    const Meaning = (idMeaning) => {
        const DeleteMeanings = () => {
            // const newMeaninglist = meaningList.filter(mean => mean !== idMeaning)
            // setMeaningList(newMeaninglist)
        }
        return (
            <div key={idMeaning}>
                <Form.Item
                    label="meaning"
                    name="means"
                    rules={[{ required: true, message: 'Please input your meaning!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="context" name="select-context">
                    <Select>
                        {categories
                            .filter((item) => item.category_id === 1)
                            .map((item) => (
                                <Select.Option key={item.id} value={item.name}>{item.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="topic"
                    name="topic"
                    rules={[{ required: true, message: 'Please input your topic!' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        initialValues={[]}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>

                <Form.Item label="picture" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" style={{ background: '#4096ff' }} onClick={DeleteMeanings}>
                        Delete
                    </Button>
                </Form.Item>
            </div>
        )
    }
    const ListMeanings = () => {
        const onAddBtnClick = event => {
            setMeaningList(meaningList.concat(<Meaning key={meaningList.length + 1} idMeaning={meaningList.length + 1} />));
        };

        return (
            <div>
                <Button className='mt-4 text-center' onClick={onAddBtnClick}> <PlusOutlined /> Meanings</Button>
                {
                    meaningList.length > 0 ?
                        meaningList.map((key, meaning) => <Meaning idMeaning={key} />) : 'No examples found'
                }
            </div>
        );
    };

    const ModelAdd = () => {
        return (
            <Modal
                title="add word"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                z-index={1000}
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
                    <Form.Item
                        label="furigana"
                        name="furigana"
                        rules={[{ required: true, message: 'Please input your furigana!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="type" name="select-type">
                        <Select>
                            {categories
                                .filter((item) => item.category_id === 2)
                                .map((item) => (
                                    <Select.Option key={item.id} value={item.name}>{item.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <ListMeanings />
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
                        <Button type="primary" htmlType="submit" style={{ background: '#4096ff' }}>
                            add
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
                            <p>Your search did not match any documents.</p>
                        )
                        }


                    </div>

                </section>

            </div>
        </>
    );
}


export default Words;