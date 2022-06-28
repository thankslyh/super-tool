import { useState } from 'react'

import PostContent from './components/postContent'
import PostSide from './components/postSide'
import { testData } from './test-data'

import classes from './index.module.css'

export default function Post() {
    const [content, setContent] = useState<string>(testData)
    return (
        <div className={classes.post}>
            <div className={classes['post-content']}>
                <div className={classes['post-title']}>event loop</div>
                <PostContent content={content}/>
            </div>
            <div className={classes['post-side']}>
                <PostSide id={'1'}/>
            </div>
        </div>
    )
}
