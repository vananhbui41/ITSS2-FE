import { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchCard from './SearchCard';
import SearchResultCard from './SearchResultCard';
import './Homepage.scss';
import { search } from '../../api/search';
import Spinner from '../Spinner';
import History from './History';
import Bookmark from './Bookmark';


export default function HomepageComponent() {
  const [result, setResult] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [mode, setMode] = useState('history')
  const token = localStorage.getItem('token');
  const handleOnSearch = async ({ keyword, type, context, topic }) => {
    setData({ keyword, type, context, topic });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await search(data);
      setResult(res.data);
      setLoading(false);
    };
    fetchData();
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await search({});
      setWords(res.data.map((e) => e.word));
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <SearchCard onSearch={handleOnSearch} words={words} />
      {loading ? (
        <Spinner />
      ) : result?.length > 0 ? (
        <SearchResultCard result={result} />
      ) : (
        <p>Your search did not match any documents.</p>
      )}
      {token && <div className="mt-5">
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          onChange={(e,val) =>  setMode(val)}
          aria-label="Platform"
        >
          <ToggleButton value="history">Lịch sử tìm kiếm</ToggleButton>
          <ToggleButton value="bookmark">Bookmark</ToggleButton>
        </ToggleButtonGroup>
        {mode ==='history' ? <History /> : <Bookmark />}
      </div>}
    </>
  );
}
