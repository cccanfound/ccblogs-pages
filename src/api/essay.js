import request from "@/utils/request";

export const addEssay = (type,title,content) => request.post('/api/v1/pri/essay/addEssay', {
  'type': type,
  'title': title,
  'content': content
})

export const getEssay = (id) => request.post('/api/v1/pri/essay/getEssay', {
  'essayId': id
})

export const getCatalog = () => request.post('/api/v1/pri/essay/getCatalog', {

})

export const updateCatalog = (data) => request.post('/api/v1/pri/essay/updateCatalog', {
  'data': data
})

export const delEssay = (id,catalogData) => request.post('/api/v1/pri/essay/delEssay', {
  'id': id,
  'data': catalogData
})

export const updateEssay = (id,type,title,content) => request.post('/api/v1/pri/essay/updateEssay', {
  'id': id,
  'type': type,
  'title': title,
  'content': content
})

export const searchEssay = (info) => request.post('/api/v1/pri/essay/searchEssay', {
  'info': info
})

