import { useRef } from 'react'
import { useRequest } from 'ahooks';
import SparkMD5 from 'spark-md5'
import { Options, Result } from 'ahooks/lib/useRequest/src/types';

import OrderPromise from '@utils/orderPromise';

type UploadOptions<T, U extends any[]> = Options<T, U>

const M5 = 5 * 1024 * 1024

interface IFileChunk {
    filename: string;
    fileHash: string;
    data: Blob;
    index: number;
    size: number;
}

type FileSliceResult = {
    result: IFileChunk[]
    hash: string
}
const fileSlice = (f: File, maxRange = M5) :Promise<FileSliceResult> => {
    return new Promise((resolve, reject) => {
        const smd5ab = new SparkMD5.ArrayBuffer()
        let result: IFileChunk[] = []
        let hash = ''
        if (f.size <= maxRange) {
            return readFile(f).then(res => {
                smd5ab.append(res)
                result.push({
                    filename: f.name,
                    fileHash: smd5ab.end(),
                    index: 0,
                    data: f,
                    size: f.size
                })
                resolve({
                    result,
                    hash: smd5ab.end()
                })
            })
        }
        const chunks = chunkSlice(f, maxRange)
        const op = new OrderPromise<ArrayBuffer>(chunks.map(chunk => () => readFile(chunk.data)))
        op.use((ctx, index) => {
            smd5ab.append(ctx)
            if (index === chunks.length - 1) {
                hash = smd5ab.end()
            }
        }).start().end(() => {
            result = op.result.map((blob, index) => ({
                filename: `${hash}-${f.name}-${index}`,
                fileHash: `${hash}-${index}`,
                index,
                data: chunks[index].data,
                size: blob.byteLength
            }))
            resolve({
                result,
                hash
            })
        })
    })
}

type ChunkSliceRes = Omit<IFileChunk, 'index' | 'fileHash' | 'data'> & {
    data: Blob
}
const chunkSlice = (file: File, maxRange: number = M5):ChunkSliceRes[] => {
    const blobSlice = File.prototype.slice
    const { size, name } = file
    const result:ChunkSliceRes[]  = []
    let start = 0
    let end = maxRange
    while (start < size) {
        const curChunk = blobSlice.call(file, start, end)
        result.push({
            filename: name,
            size: end - start,
            data: curChunk
        })
        start = end
        end = start + maxRange > size ? size : start + maxRange
    }
    return result
}

const readFile = (blob: Blob) :Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = (ev) => {
            if (ev.target) {
                return resolve(ev.target.result as ArrayBuffer)
            }
            reject(new Error('错误'))
        }
        fr.readAsArrayBuffer(blob)
    })
}

interface MyResult<T, U> extends Result<T, U> {
    cData: IFileChunkRes[]
}

export interface IFileChunkRes extends IFileChunk {
    success?: boolean;
}
const useUpload = <T extends any, U extends any[]>(service: hook.Service<T, U>, opt: UploadOptions<T, U>) => {
    const resRef = useRef<IFileChunkRes[]>([])
    const tmpRes = useRequest(service, opt) as MyResult<T, U>
    const originRunAsync = tmpRes.runAsync
    tmpRes.runAsync = async function (...args) {
        return new Promise(async (resolve, reject) => {
            const data = await fileSlice(args[0])
            resRef.current = data.result as IFileChunkRes[]
            const fns = data.result.map((d, index) => () => {
                const fd = new FormData()
                fd.append('filename', d.filename)
                fd.append('fileHash', d.fileHash)
                fd.append('data', d.data)
                fd.append("size", String(d.size))
                // @ts-ignore
                return originRunAsync(fd)
            })
            const op = new OrderPromise(fns)
            op.start().end((res) => {
                resRef.current = data.result.map(item => ({...item, success: true}))
                resolve({
                    hash: data.hash,
                    res
                } as T)
            })
        })
    }
    tmpRes.cData = resRef.current
    return tmpRes
}

export default useUpload
