import {useEffect, useState} from 'react'
import useApi from '@hooks/useApi'
import useUrlQuery from '@hooks/useUrlQuery'
import { getPostById } from '@api/index'

import PostContent from './components/postContent'
import PostSide from './components/postSide'
import { testData } from './test-data'

import classes from './index.module.css'

export default function Post() {
    const [content, setContent] = useState<string>(testData)
    const query = useUrlQuery<{id: string}>()
    const res = useApi(getPostById, {
        manual: true
    })
    useEffect(() => {
        if (query.id) {
            res.run(query.id)
        }
    }, [query.id])
    return (
        <div className={classes.post}>
            <div className={classes['post-content']}>
                <div className={classes['post-title']}>{ res.data?.data.title }</div>
                { res.data?.data.content && <PostContent content={res.data?.data.content}/> }
            </div>
            <div className={classes['post-side']}>
                <PostSide id={'1'}/>
            </div>
        </div>
    )
}
