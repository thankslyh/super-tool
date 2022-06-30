import {FC, useEffect, useMemo} from 'react'

import useApi from '@hooks/useApi'
import useUrlQuery from '@hooks/useUrlQuery';
import { getTags } from '@api/index'

import classes from './index.module.css'

const Tabs: FC = (props) => {
    const query = useUrlQuery<{tagCode: string}>()
    const res = useApi(getTags, {
        manual: true
    })
    useEffect(() => {
        res.run()
    }, [])

    const tags = useMemo(() => {
        return res.data?.data.map(tag => (
            <div className={classes['tabs-item']} key={tag.id}>{ tag.name }</div>
        ))
    }, [res.data, query.tagCode])

    return (
        <div className={classes.tabs}>
            <div className={classes['tabs-content']}>
                { tags }
            </div>
        </div>
    )
}

export default Tabs
