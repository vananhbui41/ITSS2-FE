import { Box,Stack,Chip,Grid,CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));




export default function SearchResultCard({ result }) {
    const renderResult = () => {
        return result?.map(item => (
            <Box className='search-result-card'>
                <div className='search-text'>
                    <span className='kanji'>
                        {item.word}
                    </span>
                    <span className='hiragana'>
                        {item.meaning}
                    </span>
                </div>
                <div className='description'>
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat autem, incidunt fugiat ipsum tempore repellendus non ducimus, illo nulla asperiores recusandae architecto veritatis ex. Cum, maxime iure exercitationem esse atque ex totam accusamus ratione nam repellendus adipisci et ab enim nesciunt. Minus ratione ad incidunt eum vero. Optio, delectus assumenda.</p> */}
                    <Stack direction="row" spacing={1}>
                        {item.tag?.map(tag => (
                            <Chip key={tag.id} label={tag.name} color="primary" variant="outlined" />
                        ))}
                    </Stack>
                </div>
                <div className='example'>
                    <h3>Example</h3>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {item.examples?.map((exp) => (
                            <Grid xs={2} sm={4} md={4} key={exp.id}>
                                <Item>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                                        alt="Nicola Sturgeon on a TED talk stage"
                                    />
                                    <p>{exp.meaning}</p>
                                    {/* <Stack direction="row" spacing={1}>
                                        <Chip label="Tag 1" color="primary" variant="outlined" />
                                        <Chip label="Tag 2" color="success" variant="outlined" />
                                        <Chip label="Tag 3" color="primary" variant="outlined" />
                                    </Stack> */}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='related-words'>
                    <h3>Related words</h3>
                    <div>
                        <p className='title'>類義語</p>
                        {/* {Array.from(Array(3)).map((_, index) => (
                            <span key={index}>
                                Word {index}
                            </span>
                        ))} */}
                        <span>
                            {item.dongnghia}
                        </span>
                    </div>
                    <div>
                        <p className='title'>対義語</p>
                        {/* {Array.from(Array(3)).map((_, index) => (
                            <span key={index}>
                                Word {index}
                            </span>
                        ))} */}
                        <span>
                            {item.trainghia}
                        </span>
                    </div>
                </div>
            </Box>
        ))
    }
    return (
        <>
           {renderResult()}
        </>
    )
}