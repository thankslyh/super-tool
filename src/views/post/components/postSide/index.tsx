import { FC } from 'react';

import classes from './index.module.css';

const PostSide: FC<{id: string}> = ({id}) => {
    return (
        <div className={classes['post-side']}>
            <header>目录</header>
            <ul>
                <li>目录1</li>
                <li>目录1</li>
                <li>目录1</li>
                <li>目录1</li>
                <li>目录1</li>
                <li>目录1</li>
                <li>目录1</li>
            </ul>
        </div>
    )
}

export default PostSide
