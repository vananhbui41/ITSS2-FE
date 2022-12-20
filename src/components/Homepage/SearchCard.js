import { Box, TextField,InputLabel,FormControl,Select,MenuItem,Grid,Button,Autocomplete,Chip,OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getTags } from '../../api/search';


function getStyles(name, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SearchCard({onSearch, words}) {
    const [word, setWord] = useState('')
    const [categories, setCategories] = useState([])
    const [type, setType] = useState([])
    const [topic, setTopic] = useState([])
    const [context, setContext] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tagsData = await getTags()
            setCategories(tagsData.data)
        }
        fetchData()
    },[])
    const handleOnSearch = () => {
        onSearch({keyword: word, type, topic, context})
    }
    const theme = useTheme();
    return (
      <>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={words}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Word" onChange={setWord(params.inputProps.value)} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Context</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={context}
                  label="Context"
                  multiple
                  variant="filled"
                  onChange={(e) =>
                    setContext(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                  }
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {categories
                    .filter((item) => item.category_id === 1)
                    .map((item) => (
                      <MenuItem key={item.id} value={item.name} style={getStyles(item.name, categories, theme)}>
                        {item.name}{' '}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={(e) =>
                    setType(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                  }
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {categories
                    .filter((item) => item.category_id === 2)
                    .map((item) => (
                      <MenuItem key={item.id} value={item.name} style={getStyles(item.name, categories, theme)}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={topic}
                  label="Topic"
                  onChange={(e) =>
                    setTopic(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                  }
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {categories
                    .filter((item) => item.category_id === 3)
                    .map((item) => (
                      <MenuItem key={item.id} value={item.name} style={getStyles(item.name, categories, theme)}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'center' }} onClick={handleOnSearch}>
            <Button variant="contained">Search</Button>
          </Box>
        </Box>
      </>
    );
}