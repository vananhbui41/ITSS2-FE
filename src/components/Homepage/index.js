import { useEffect, useState } from 'react';
import SearchCard from "./SearchCard"
import SearchResultCard from "./SearchResultCard"
import './Homepage.scss'
import { search } from '../../api/search';
import Spinner from "../Spinner";




export default function HomepageComponent() {
    const [result, setResult] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])
    const handleOnSearch = async ({ keyword,type, context,topic }) => {
        setData({keyword,type, context,topic })
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await search(data)
            setResult(res.data)
            setLoading(false)
        }
        fetchData()
    }, [data])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await search({})
            setWords(res.data.map(e => e.word))
            setLoading(false)
        }
        fetchData()
    }, [])
    return (
        <>
            <SearchCard onSearch={handleOnSearch} words={words} />
            {loading ? <Spinner /> : result.length > 0 ? <SearchResultCard result={result} /> : <p>Your search did not match any documents.</p>}
        </>
    )
}