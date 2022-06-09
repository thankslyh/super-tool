import { useState, ChangeEvent, useMemo, useCallback, useEffect } from 'react'
import { Divider, Input, Button } from 'antd'
import { PlusCircleTwoTone, MinusCircleTwoTone, CopyTwoTone, CheckOutlined } from '@ant-design/icons'

import { useApi, useCopy } from '../../../../hooks'
import { getWxFollowUrl } from '../../../../api/index'

import classes from './index.module.css'

export default function WxFollowLink() {
    const [ urls, setUrls ] = useState<string[]>([''])
    const [ result, setResult ] = useState<string[]>([])
    const res = useApi<any, any[]>(getWxFollowUrl, {
        manual: true,
        onSuccess: (data) => {
            setResult(data?.data as string[])
        }
    })
    const { success, copy: copyFn, setSuccess } = useCopy()

    useEffect(() => {
        // 重置复制状态
        setSuccess(false)
        setResult([])
    }, [urls])

    const onInput = (val: string, idx: number) => {
        urls[idx] = val
        setUrls([...urls])
    }
    const plus = (idx) => {
        urls.push('')
        setUrls([...urls])
    }
    const copy = useCallback(() => {
        const copyValue: string = res.data?.data?.toString()
        copyFn(copyValue || '')
    }, [res.data])

    const minus = (idx) => {
        urls.pop()
        setUrls([...urls])
    }
    const gen = useCallback(() => {
        const str = urls.toString()
        res.run({ urls: str })
    }, [urls])
    const urlsNode = useMemo(() => {
        return urls.map((url, idx) => (
            <div className={classes.item} key={idx}>
                <Input
                    value={url}
                    onInput={((v: ChangeEvent<HTMLInputElement>) => onInput(v.target.value, idx))}
                    placeholder="请输入微信文章的https链接"
                />
                {(urls.length === idx + 1) && <PlusCircleTwoTone onClick={() => plus(idx)} />}
                {(urls.length === idx + 1 && idx !== 0) && <MinusCircleTwoTone onClick={() => minus(idx)} />}
            </div>
        ))
    }, [urls])
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                {urlsNode}
                <Button type="primary" onClick={gen} loading={res.loading}>生成</Button>
            </div>
            <div className={classes.right}>
                { success ? <CheckOutlined style={{ color: 'green' }} /> : <CopyTwoTone onClick={copy} /> }
                { result }
            </div>
        </div>
    )
}
