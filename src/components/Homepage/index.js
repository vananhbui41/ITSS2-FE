import SearchCard from "./SearchCard"
import SearchResultCard from "./SearchResultCard"
import './Homepage.scss'
import { search } from 'src/api/search';
import { useEffect, useState } from "react"
import Spinner from "../Spinner";


export default function HomepageComponent() {
    const [result, setResult] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const handleOnSearch = async ({ word }) => {
        setData({word})
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