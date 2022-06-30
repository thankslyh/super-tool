import {FC, useEffect, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';

import { getPostList } from '@api/index'
import useUrlQuery from '@hooks/useUrlQuery';
import useApi from '@hooks/useApi';
import PostItem from '@views/postList/components/postItem';
import classes from './index.module.css';

const PostList: FC<any> = () => {
    const query = useUrlQuery<{tagCode: string}>()
    const navigate = useNavigate()
    const res = useApi(getPostList, {
        manual: true
    });

    useEffect(() => {
        res.run(query.tagCode)
    }, [query.tagCode]);

    const tagItemContainer = useMemo(() => {
        return res.data?.data.map(post =>
            <div onClick={() => navigate(`/post?id=${post.id}`)}>
                <PostItem
                    key={post.id}
                    {...post}
                />
            </div>
        )
    }, [res.data?.data])
    return (
        <div className={classes['post-list']}>
            {tagItemContainer}
        </div>
    )
}

export default PostList;
