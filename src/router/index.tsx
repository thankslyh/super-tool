import * as React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import App from '../App'
import ToolIndex from '../views/toolIndex'
import WxFollowLink from '../views/toolIndex/components/wxFollowLink'
import Test1 from '../views/toolIndex/components/test1'

export default function Root() {
    return (
        <BrowserRouter basename="thankslyh">
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="tool-index" element={<ToolIndex/>}>
                    <Route path="wx-follow-link" element={<WxFollowLink/>} />
                    <Route path="test1" element={<Test1/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
