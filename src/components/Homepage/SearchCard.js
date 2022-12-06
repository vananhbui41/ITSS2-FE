import { Box, TextField,InputLabel,FormControl,Select,MenuItem,Grid,Button    } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCategories, getTags } from '../../api/search';

export default function SearchCard({onSearch}) {
    const [age, setAge] = useState('');
    const [word, setWord] = useState('')
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await getCategories()
            const tagsData = await getTags()
            setCategories(categoriesData.data)
            setTags(tagsData.data)
            
        }
        fetchData()
    },[])
    const handleOnSearch = () => {
        onSearch({word, tag, category})
    }
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(item => (
                                    <MenuItem key={item.id} value={item.name}>{ item.name}</MenuItem>
                                ))}
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tag}
                                label="Tag"
                                onChange={(e) => setTag(e.target.value)}
                            >
                                {tags.map(item => (
                                    <MenuItem key={item.id} value={item.name}>{ item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
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