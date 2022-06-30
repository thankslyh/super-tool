import { FC } from 'react';

import classes from './index.module.css'

const PostItem: FC<api.SimplePost> = (props) => {
    return (
        <div className={classes['post-item']}>
            <div className={classes['post-item-bottom']}>
                <div className={classes['post-title']}>{props.title}</div>
            </div>
        </div>
    )
}

export default PostItem;
