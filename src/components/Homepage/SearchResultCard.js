import { Box,Stack,Chip,Grid,CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: '1px solid #1A2027',
  height: '100%'
}));




export default function SearchResultCard({ result }) {
    const renderResult = () => result?.map(item => (
            <Box key={item.id} className='search-result-card'>
                <div className='search-text'>
                    <span className='kanji'>
                        {item.word}
                    </span>
                    <span className='hiragana'>
                        {item.furigana}
                    </span>
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
                                    <b>Meaning</b>
                                    <div className='ml-5'>
                                        <p>{exp.meaning}</p>
                                        <span>{exp.explanation_of_meaning}</span>
                                    </div>
                                    <b>Example</b>
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
                    <h3>Related words</h3>
                    <div>
                        <p className='title'>類義語</p>
                        {item.synonym?.map((e) => (
                            <Chip key={e.id} label={e.word} variant="outlined" color="success" className='mr-3'/>
                        ))}
                    </div>
                    <div>
                    <p className='title'>対義語</p>
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
        </>
    )
}