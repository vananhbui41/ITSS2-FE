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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

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
    const [images, SetImages] = useState();


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
      console.log("hieu: ", images);
      
        const requestData = {
          "word": values.word,
          "type": values.type,
          "meanings": [
          {
              "meaning": values.meaning,
              "explanation_of_meaning": values.explanation_of_meaning,
              "context": values.context,    
              "topic": values.topic,
              "image": images, 
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

     const handleImage = (e)=>{
        const formData = new FormData();
        const img = e.target.files[0];
         console.log("img ", img);
         formData.append('image', img);
        
      //   for(const pair of formData.entries()) {
      //   console.log(pair[0]+ ', '+ pair[1]); 
      // }
        SetImages(img);
        console.log(formData.getAll('image'));
      }

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
       
         
          <Form.Item label="Từ vựng: " name='word' rules={[{ required: true, message: 'Hãy nhập từ vựng' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Loại từ: " name='type'
            rules={[{ required: true, message: 'Hãy chọn loại từ' }]}
          >
            {/* <Select mode="multiple" /> */}
             <Select  options={type}  placeholder="Please select"/>
          </Form.Item>
          <p style={{fontWeight: 'bold', fontSize: '16px'}}>Ý nghĩa</p>
          <Form.Item label="Ý nghĩa" name='meaning'
            rules={[{ required: true, message: 'Hãy nhập ý nghĩa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Giải thích" 
            name='explanation_of_meaning'
            rules={[{ required: true, message: 'Hãy giải thích ý nghĩa' }]}
          >
          <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Nguồn" name='source'>
            <Input />
          </Form.Item>
          <Form.Item label="Bối cảnh" name='context'
            rules={[{ required: true, message: 'Hãy nhập bối cảnh' }]}
          >
            {/* <Select mode="multiple" /> */}
             <Select  options={context}  placeholder="Hãy nhập bối cảnh"/>
          </Form.Item>
          <Form.Item  label="Chủ đề" name='topic'
            rules={[{ required: true, message: 'Hãy nhập chủ đề' }]}
          >
            {/* <Select mode="multiple" /> */}
             <Select mode="multiple" options={topic}  placeholder="Hãy chọn chủ đề"/>
          </Form.Item>
          <Form.Item label="Ví dụ" name='example'
          >
            <Input />
          </Form.Item>
          <Form.Item label="Giải thích ví dụ" name='example_meaning'>
            <Input />
          </Form.Item>
          
         <div >
          <Form.Item label="Hình ảnh" valuePropName="fileList">
            <Upload  listType="picture-card" 
               onChange={(info) => {
                getBase64(info?.file?.originFileObj, imgUrlOffer =>
                    SetImages(imgUrlOffer)
                );
                
            }}
            
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Tải ảnh lên
                </div>
              </div>
            </Upload>
          </Form.Item>
          </div>
          <p style={{fontWeight: 'bold', fontSize: '16px'}}>Từ liên quan</p>
        <Form.Item label="Từ đồng nghĩa" name='synonym'>
            <Input />
          </Form.Item>
          <Form.Item label="Từ trái nghĩa" name='anonym'>
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
           title="ĐỀ XUẤT THÊM TỪ"
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