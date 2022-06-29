import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'

export default function useUrlQuery<T>() {
    const location = useLocation()
    const [query, setQuery] = useState({})
    useEffect(() => {
        setQuery(qs.parse(location.search))
    }, [location])
    return query as T
}
