import { useState } from 'react'
import { Tabs, Card } from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'

import classes from './index.module.css'

const { TabPane } = Tabs

export default function ToolIndex() {
    const [activeKey, setActiveKey] = useState<string>('wx-follow-link')
    const navigate = useNavigate()
    const onChange = (key) => {
        setActiveKey(key)
        navigate(key)
    }
    return (
        <div className={classes.container}>
            <Tabs hideAdd type="editable-card" activeKey={activeKey} onChange={onChange}>
                <TabPane tab="微信关注链接生成" key="wx-follow-link" />
                <TabPane tab="test1" key="test1" />
            </Tabs>
            <Card bordered={false}>
                <Outlet/>
            </Card>
        </div>
    )
}
