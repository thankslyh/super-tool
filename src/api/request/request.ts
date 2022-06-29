import { extend, ResponseError, RequestResponse, RequestOptionsInit } from 'umi-request'

export type Response<T> = Pick<RequestResponse<T>, 'response'>
export type Headers = {
    [key: string]: any;
}

const request = extend({
    prefix: '/api',
    timeout: 100000,
    errorHandler,
    requestType: 'form'
})

export const formData = extend({
    prefix: '/api',
    timeout: 100000,
    errorHandler,
    requestType: 'form'
})

request.interceptors.request.use((url: string, opt: RequestOptionsInit) => {
    return {
        url,
        options: opt
    }
})

request.interceptors.response.use((res: Response<any>['response'], opt: RequestOptionsInit) => {
    console.log('res', res)
    return res
})

function errorHandler(err: ResponseError) {
    console.log(err)
}

function responseHandler<T>(res: RequestResponse<T>) {
    console.log(res.data)
}

export default request
