import { Button, Upload, UploadProps } from 'antd'

import { upload } from '@api/index'
import useUpload from '@hooks/useUpload'

export default function FileUpload() {
    const u = useUpload<any, any[]>(upload, {
        manual: true,
    })
    const uploadProps: UploadProps = {
        customRequest: options => {
            console.log(options)
            u.run(options.file)
        }
    }
    return (
        <Upload {...uploadProps}>
            <Button type="primary">上传</Button>
        </Upload>
    )
}
