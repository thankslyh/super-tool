import * as React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import App from '../App'
import Home from '@views/home'
import Post from '@views/post'

import ToolIndex from '@views/toolIndex'
import WxFollowLink from '@views/toolIndex/components/wxFollowLink'
import Test1 from '@views/toolIndex/components/test1'
import FileUpload from '@views/toolIndex/components/fileUpload'

export default function Root() {
    return (
        <BrowserRouter basename="thankslyh">
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/post" element={<Post/>}/>
                </Route>
                <Route path="tool-index" element={<ToolIndex/>}>
                    <Route path="wx-follow-link" element={<WxFollowLink/>} />
                    <Route path="md-to-html" element={<Test1/>} />
                    <Route path="file-upload" element={<FileUpload/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
