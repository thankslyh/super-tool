import { useRequest } from 'ahooks'
import { Options } from 'ahooks/lib/useRequest/src/types'

export default function useApi<T extends any, U extends any[]>(service: hook.Service<T, U>, opt: Options<T, U>) {
    return useRequest(service, opt)
}
