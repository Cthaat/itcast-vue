import request from '../utils/request'

export const artGetChannelsService = () => request.get('/my/cate/list')

export const artAddChannelService = (data) => request.post('/my/cate/add', data)

export const artEditChannelService = (data) => request.put('/my/cate/info', data)

export const artDeleteChannelService = (id) =>
  request.delete('/my/cate/del/', { params: { id } })

export const artGetArticlesService = (params) =>
  request.get('/my/article/list', { params })
