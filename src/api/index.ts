import request, { formData } from './request'

export const getWxFollowUrl = (body: any) => request.post('/get-wx-follow-url/batch', {data: body})

export const upload = (body: FormData) => formData.post('/file-upload', {data: body})

export const mergeFile = (body: any) => request.post('/file-upload/merge', {data: body})
