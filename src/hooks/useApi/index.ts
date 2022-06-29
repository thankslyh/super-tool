import { useRequest } from 'ahooks'
import { Options, Result } from 'ahooks/lib/useRequest/src/types'

interface IResponse<T> {
    code: number;
    msg: string;
    data: T
}
export default function useApi<T extends any, U extends any[]>(service: hook.Service<T, U>, opt: Options<T, U>) {
    return useRequest<T, U>(service, opt) as Result<IResponse<T>, U>
}
