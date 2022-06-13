import { useState } from 'react'
import { Tabs, Card } from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'

import classes from './index.module.css'

const { TabPane } = Tabs

export default function ToolIndex() {
    const [activeKey, setActiveKey] = useState<string>('wx-follow-link')
    const navigate = useNavigate()
    const onChange = (key: string) => {
        setActiveKey(key)
        navigate(key)
    }
    return (
        <div className={classes.container}>
            <Tabs hideAdd type="editable-card" activeKey={activeKey} onChange={onChange}>
                <TabPane tab="微信关注链接生成" key="wx-follow-link" />
                <TabPane tab="md文件转html段" key="md-to-html" />
                <TabPane tab="文件上传" key="file-upload" />
            </Tabs>
            <Card bordered={false}>
                <Outlet/>
            </Card>
        </div>
    )
}
