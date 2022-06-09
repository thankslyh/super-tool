import request from './request'

export const getWxFollowUrl = body => request.post('/get-wx-follow-url/batch', {data: body})
