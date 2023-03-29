import request from '@/utils/request'

export const getArticles = (page) => request.post('/api/v1/pub/dashboard/list', {
  'limit':15,
  'page':page
})

