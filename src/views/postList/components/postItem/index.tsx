import { FC } from 'react';

import classes from './index.module.css'

interface IEvent {
    onClick(): void
}
const PostItem: FC<api.SimplePost & IEvent> = (props) => {
    return (
        <div className={classes['post-item']} onClick={props.onClick}>
            <div className={classes['post-item-bottom']}>
                <div className={classes['post-title']}>{props.title}</div>
            </div>
        </div>
    )
}

export default PostItem;
