import { Box, TextField,InputLabel,FormControl,Select,MenuItem,Grid,Button    } from '@mui/material';
import { useState } from 'react';

export default function SearchCard({onSearch}) {
    const [age, setAge] = useState('');
    const [word, setWord] = useState('')

    
    const handleOnSearch = () => {
        onSearch({word})
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
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
                    </Grid>
                    <Grid item xs={12} >
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