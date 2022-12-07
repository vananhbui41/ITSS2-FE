import { Box, TextField,InputLabel,FormControl,Select,MenuItem,Grid,Button    } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTags } from '../../api/search';

export default function SearchCard({onSearch}) {
    const [word, setWord] = useState('')
    const [categories, setCategories] = useState([])
    const [type, setType] = useState('')
    const [topic, setTopic] = useState('')
    const [context, setContext] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const tagsData = await getTags()
            setCategories(tagsData.data)
        }
        fetchData()
    },[])
    const handleOnSearch = () => {
        onSearch({word, type, topic, context})
    }
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Context</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={context}
                                label="Context"
                                onChange={(e) => setContext(e.target.value)}
                            >
                                {categories.filter(item => item.category_id === 1).map(item => (
                                    <MenuItem key={item.id} value={item.name}>{ item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}
                            >
                                {categories.filter(item => item.category_id === 2).map(item => (
                                    <MenuItem key={item.id} value={item.name}>{ item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={topic}
                                label="Topic"
                                onChange={(e) => setTopic(e.target.value)}
                            >
                                {categories.filter(item => item.category_id === 3).map(item => (
                                    <MenuItem key={item.id} value={item.name}>{ item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="Word" variant="outlined" value={word} onChange={e => setWord(e.target.value.trim())} />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2,textAlign: "center" }} onClick={handleOnSearch}>
                    <Button variant="contained">Search</Button>
                </Box>
            </Box>
        </>
    )
}