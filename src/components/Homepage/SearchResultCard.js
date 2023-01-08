import { Box,Stack,Chip,Grid,CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BiPlusCircle} from 'react-icons/bi';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import './Homepage.scss';
import { Button, Modal, Row, Col , Input

, Form, Upload, Select
} from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: '1px solid #1A2027',
  height: '100%'
}));

function FormAddModel(props) {
    console.log("mms: ", props.hieu);
    const onFormLayoutChange = ({ disabled }) => {
    //   setComponentDisabled(disabled);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
      <>
       
        <Form
          labelCol={{
            span: 6,
          }}
          name="basic"
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
       
         
          <Form.Item label="tu vung" name='tu-vung'>
            <Input />
          </Form.Item>
          <Form.Item label="loai tu" name='loai-tu'>
            <Input />
          </Form.Item>
          Y NGHIA
          <Form.Item label="y nghia" name='y-nghia'>
            <Input />
          </Form.Item>
          <Form.Item label="giai thich" name='giai-thich'>
          <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="nguon" name='nguon'>
            <Input />
          </Form.Item>
          <Form.Item label="boi canh" name='boi-canh'>
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="chu de" name='chu-de'>
            <Input />
          </Form.Item>
          <Form.Item label="vi du" name='vi-du'>
            <Input />
          </Form.Item>
          <Form.Item label="giai thich vi du" name='gt-vd'>
            <Input />
          </Form.Item>
          
         
          <Form.Item label="hinh anh" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
        TU LIEN QUAN
        <Form.Item label="tu dong nghia" name='dong-nghia'>
            <Input />
          </Form.Item>
          <Form.Item label="tu trai nghia" name='trai-nghia'>
            <Input />
          </Form.Item>
         
        <Row gutter={16} style={{justifyContent: "space-around"}}>
            <Col span={6}>
                <Button 
                style={{width:'80%'}}
                onClick={()=>{
                   props.close(false);
                    // console.log("hh: ", openModal);
                }
                    
                
                }

                >
                    Huỷ
                </Button>
            </Col>
            <Col span={6}>
            <Button type="primary" htmlType="submit" style={{background: '#1677ff', color: 'white', boder: 'none', width:'80%'}}>
            Gửi
        </Button>
                {/* <Button style={{background: '#1677ff', color: 'white', boder: 'none', width:'80%'}}
                    >Gửi</Button> */}
            </Col>
        </Row>
        </Form>
      </>
    );
  
}


const ModalAdd = ({setOpenModelAdd, openModalAdd, Disabled,setDisabled})=>{
    console.log("modal: ", openModalAdd);
    return(
        <Modal
           title="DE XUAT THEM TU"
        centered
        // open={openDetail}
        onCancel={()=>{setOpenModelAdd(false)}}
        open={openModalAdd}
        footer={[
            // <Row gutter={16}>
            //         <Col span={12}>
            //             <Button 
            //             style={{width:'80%'}}
            //             onClick={()=>{
            //                 setOpenModelAdd(false)}}
            //             >
            //                 Huỷ
            //             </Button>
            //         </Col>
            //         <Col span={12}>
            //             <Button style={{background: '#1677ff', color: 'white', boder: 'none', width:'80%'}}
            //               >Gửi</Button>
            //         </Col>
            //     </Row>
        ]}
        width={"50%"}
        height={"80%"}
    >
       {<FormAddModel  hieu="dep trai" close={setOpenModelAdd} /> }
    </Modal>
    )
}




export default function SearchResultCard({ result }) {

    const [openModalAdd, setOpenModalAdd1] = useState(false);
    const [componentDisabled, setComponentDisabled1] = useState(true);
    const renderResult = () => result?.map(item => (
            <Box key={item.id} className='search-result-card'>
                <div className='container' style={{position:"relative"}}>
                    <div className='search-text'>
                        <span className='kanji'>
                            {item.word}
                        </span>
                        <span className='hiragana'>
                            {item.furigana}
                        </span>
                    </div>
                    <div className="icon-search">
                       <Button onClick={()=>{setOpenModalAdd1(true)}}><BiPlusCircle /></Button> 
                    </div>
                </div>
                
            <div className='description'>
                <Grid container spacing={2}>
                    {item.tags?.map(tag => (
                        <Grid key={tag.id} item xs={2}>
                            <Chip label={tag.name} color="primary" variant="outlined" />
                        </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='example'>
                    <Grid container spacing={2} >
                        {item.meanings?.map((exp) => (
                            <Grid item xs={2} sm={4} md={4} key={exp.id}>
                                <Item>
                                    {/* <CardMedia
                                        component="img"
                                        height="240"
                                        image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                                        alt="Nicola Sturgeon on a TED talk stage"
                                    /> */}
                                    <b>Ý nghĩa</b>
                                    <div className='ml-5'>
                                        <p>{exp.meaning}</p>
                                        <span>{exp.explanation_of_meaning}</span>
                                    </div>
                                    <b>Ví dụ</b>
                                    <div className='ml-5'>
                                        <p>{exp.example}</p>
                                        <span>{exp.example_meaning}</span>
                                    </div>
                                    
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='related-words'>
                    <h3>Các từ liên quan</h3>
                    <div>
                        <p className='title'>Từ đồng nghĩa</p>
                        {item.synonym?.map((e) => (
                            <Chip key={e.id} label={e.word} variant="outlined" color="success" className='mr-3'/>
                        ))}
                    </div>
                    <div>
                    <p className='title'>Từ trái nghĩa</p>
                        {item.antonym?.map((e) => (
                            <Chip key={e.id} label={e.word} variant="outlined" color="success" className='mr-3'/>
                        ))}
                    </div>
                </div>
            </Box>
        ))
    return (
        <>
           {renderResult()}
           {<ModalAdd setOpenModelAdd={setOpenModalAdd1} openModalAdd={openModalAdd} Disabled={componentDisabled} setDisabled={setComponentDisabled1} />}
        </>
    )
}