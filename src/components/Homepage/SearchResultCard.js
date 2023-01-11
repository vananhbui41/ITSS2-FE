import { Box,Stack,Chip,Grid,CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import { BiPlusCircle} from 'react-icons/bi';
import { PlusOutlined , DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';



import './Homepage.scss';
import { Button, Modal, Row, Col , Input

, Form, Upload, Select, notification,
} from 'antd';

import { postRequest } from '../../api/request';

import { getTags } from '../../api/search';

const { TextArea } = Input;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: '1px solid #1A2027',
  height: '100%'
}));

const App = (mess1, m2) => {
  console.log("noti: ", mess1, m2);
 
  const aa =() => {
      return (
          notification.open({
              message: mess1,
              description: m2,
              placement: 'bottom',
              onClick: () => {
                  console.log('Notification Clicked!');
              },
          })
      )
  }

  return (
   
   aa()
      
  );
   

};

function FormAddModel(props) {
   
    const onFormLayoutChange = ({ disabled }) => {
    //   setComponentDisabled(disabled);
    };
   
    const [categories, setCategories] = useState([]);
    const [type, setType] = useState();
    const [topic, setTopic] = useState();
    const [context, setContext] = useState();


    useEffect(() => {
      const fetchData = async () => {
          const tagsData = await getTags();
          const mm = tagsData.data;
          setCategories(tagsData.data);
          const optionsType = [];
          const optionsTopic = [];
          const optionsContext = [];
      
          mm.filter((item) => item.category_id === 2).map((item) => {
           
            optionsType.push({
        
              value: item.name,
              label: item.name,
            });
            return 0;
        });
        setType(optionsType);
        mm.filter((item) => item.category_id === 3).map((item) => {
          optionsTopic.push({
      
            value: item.name,
            label: item.name,
          });
          
          return 0;
        });
        setTopic(optionsTopic);
      
        mm.filter((item) => item.category_id === 1).map((item) => {
          optionsContext.push({
      
            value: item.name,
            label: item.name,
          });
          
          return 0;
        });
        setContext(optionsContext);
        
          
      }
      fetchData()
  },[])
    const onFinish = (values) => {
    
        const requestData = {
          "word": values.word,
          "type": values.type,
          "meanings": [
          {
              "meaning": values.meaning,
              "explanation_of_meaning": values.explanation_of_meaning,
              "context": values.context,
              "topic": values.topic,
              "image": "",
              "example": values.example,
              "example_meaning": values.example_meaning,
              "source": values.source
          }
        ],
          "synonym": values.synonym ? values.synonym : null,
          "anonym" : values.anonym ? values.anonym : null
        }
        console.log('Success1:', requestData);
        const token = localStorage.getItem('token');
        if(!token){
          window.location.href = '/login';
          
        }
        // props.close(false);
        // App("failed", "sdmmmdm");
        const fetch = async () =>{
          const res = await postRequest('/requests', requestData);
          console.log("res: ", res);
         
          if(res.status === 1){
            App("success", res.message);
          }
          else{
            App("failed", res.message);
          }
          props.close(false);
          
        }
        fetch();
       

      };
      const onFinishFailed = (errorInfo) => {
        props.close(false);
        <App mess="hieudz" />
        
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
       
         
          <Form.Item label="tu vung" name='word'>
            <Input />
          </Form.Item>
          <Form.Item label="loai tu" name='type'>
            {/* <Select mode="multiple" /> */}
             <Select  options={type}  placeholder="Please select"/>
          </Form.Item>
          Y NGHIA
          <Form.Item label="y nghia" name='meaning'>
            <Input />
          </Form.Item>
          <Form.Item label="giai thich" name='explanation_of_meaning'>
          <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="nguon" name='source'>
            <Input />
          </Form.Item>
          <Form.Item label="boi canh" name='context'>
            {/* <Select mode="multiple" /> */}
             <Select  options={context}  placeholder="Please select"/>
          </Form.Item>
          <Form.Item  label="chu de" name='topic'>
            {/* <Select mode="multiple" /> */}
             <Select mode="multiple" options={topic}  placeholder="Please select"/>
          </Form.Item>
          <Form.Item label="vi du" name='example'>
            <Input />
          </Form.Item>
          <Form.Item label="giai thich vi du" name='example_meaning'>
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
        <Form.Item label="tu dong nghia" name='synonym'>
            <Input />
          </Form.Item>
          <Form.Item label="tu trai nghia" name='anonym'>
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




export default function SearchResultCard({ result,onClickBookMark }) {
    const isLogin = localStorage.getItem('token') 
    const [openModalAdd, setOpenModalAdd1] = useState(false);
    const [componentDisabled, setComponentDisabled1] = useState(true);
    const renderResult = () => result?.map(item => (
        <Box key={item.id} className='search-result-card'>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <div className='search-text'>
                        <span className='kanji'>
                            {item.word}
                        </span>
                        <span className='hiragana'>
                            {item.furigana}
                        </span>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div style={{textCenter: 'right'}}>
                        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => onClickBookMark(item)}>
                            {item.bookmark === 0 ? <StarOutlineIcon /> : <StarIcon />}
                        </IconButton>
                        <IconButton color="primary" aria-label="upload picture" component="label" onClick={()=>{setOpenModalAdd1(true)}}>
                            <BiPlusCircle />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
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