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
    const handleOnSearch = async ({ word,tag,category }) => {
        setData({word, tag,category})
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
    return (
        <>
            <SearchCard onSearch={handleOnSearch} />
            {loading ? <Spinner /> : result.length > 0 ? <SearchResultCard result={result} /> : <p>Your search did not match any documents.</p>}
        </>
    )
}