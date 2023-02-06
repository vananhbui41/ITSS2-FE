import { Box, TextField,InputLabel,FormControl,Select,MenuItem,Grid,Button,Autocomplete,Chip,OutlinedInput} from '@mui/material';
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
                    <TextField {...params} label="Từ vựng" onChange={setWord(params.inputProps.value)} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bối cảnh</InputLabel> 
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={context}
                  label="Context"
                  variant="filled"
                  onChange={(e) =>
                    setContext(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                  }
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => value === '' ? (null) : ( <Chip key={value} label={value} />)
                      )}
                    </Box>
                  )}
                >
                  <MenuItem value="">
                    <span style={{color: '#ff6f6f'}}>Không lựa chọn</span>
                  </MenuItem>
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
                <InputLabel id="demo-simple-select-label">Loại từ</InputLabel>
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
                      {selected.map((value) => value === '' ? (null) : ( <Chip key={value} label={value} />)
                      )}
                    </Box>
                  )}
                > 
                  <MenuItem value="">
                    <span style={{color: '#ff6f6f'}}>Không lựa chọn</span>
                  </MenuItem>
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
                <Autocomplete
                  labelId="demo-simple-select-label"
                  multiple
                  id="tags-outlined"
                  options={
                    categories
                    .filter((item) => item.category_id === 3)
                    .map((item) => item.name)
                  }
                  filterSelectedOptions
                  onChange={(event, value) => setTopic(value)} 
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chủ đề"
                      placeholder="Chủ đề"
                    />
                  )}
                /> 
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'center' }} onClick={handleOnSearch}>
            <Button variant="contained">Tìm kiếm</Button>
          </Box>
        </Box>
      </>
    );
}