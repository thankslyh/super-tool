import {FC, useEffect, createRef} from 'react'
import 'highlight.js/styles/atom-one-light.css';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

import classes from './index.module.css';

interface IProps {
    content: string;
}

const PostContent: FC<IProps> = (props) => {
    const ref = createRef<HTMLDivElement>()
    useEffect(() => {
        hljs.registerLanguage('Javascript', javascript)
        console.log(ref)
        ref.current?.querySelectorAll<HTMLElement>('pre code').forEach(code => {
            hljs.highlightBlock(code)
        })
    }, [props.content])
    return (
        <div ref={ref} className={classes['post-content']} dangerouslySetInnerHTML={{ __html: props.content }} />
    )
}

export default PostContent
