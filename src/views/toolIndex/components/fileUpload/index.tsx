import {useEffect, useMemo, useState} from 'react'
import { Button, Upload, UploadProps } from 'antd'

import { upload, mergeFile } from '@api/index'
import useUpload, { IFileChunkRes } from '@hooks/useUpload'
import useApi from '@hooks/useApi'

export default function FileUpload() {
    const u = useUpload<any, any[]>(upload, {
        manual: true,
    })
    const mergeRes = useApi<any, any[]>(mergeFile, {
        manual: true
    })
    const [data, setData] = useState<IFileChunkRes[]>([])

    const uploadProps: UploadProps = useMemo(() => {
        return {
            customRequest: (options) => {
                const file = options.file as File
                u.runAsync(file).then(res => {
                    mergeRes.run({
                        hash: res.hash,
                        size: file.size
                    })
                })
            },
            fileList: data.map(data => ({
                uid: String(data.index),
                name: data.filename,
                status: data.success ? 'success' : 'error'
            }))
        }
    }, [data])

    useEffect(() => {
        setData(u.cData)
    }, [u.cData])

    return (
        <Upload {...uploadProps}>
            <Button type="primary">上传</Button>
        </Upload>
    )
}
