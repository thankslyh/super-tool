import request, { formData } from './request'

export const getWxFollowUrl = (body: any) => request.post('/get-wx-follow-url/batch', {data: body})

export const upload = (body: FormData) => formData.post('/file-upload', {data: body})

export const mergeFile = (body: any) => request.post('/file-upload/merge', {data: body})

export const getTags = () => request.get<api.TagList>('/tags/get')

export const getPostById = (id: string) => request.get<api.Post>('/post/get', {params: {id}})

export const getPostList = (tagCode?: string) => request.get<api.PostList>('/post/list', {params: {tagCode}})
