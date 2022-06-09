import { useRequest } from 'ahooks'
import { Options } from 'ahooks/lib/useRequest/src/types'

type Service<T, U extends any[]> = (...args: U) => Promise<T>

export default function useApi<T extends any, U extends any[]>(service: Service<T, U>, opt: Options<T, U>) {
    // const result = useRequest(service, opt)
    return useRequest(service, opt)
}
