import { FunctionComponent } from 'react'

interface TabsProps {
    name: string;
    key: string;
}

import classes from './index.module.css'

const Tabs: FunctionComponent<TabsProps> = (props) => {
    return (
        <div className={classes.tabs}>
            <div className={classes['tabs-content']}>
                <div className={classes['tabs-item']}>Javascript</div>
                <div className={classes['tabs-item']}>Golang</div>
            </div>
        </div>
    )
}

export default Tabs
