import request from '@/utils/request'

export const getWordList = (type,page) => request.post('/api/v1/pri/word/list', {
  'type': type+'',
  'limit':20,
  'page':page
}
)
export const addWord = (number) => request.post('/api/v1/pri/word/addWord', {
  'number': number+''
})
export const changeWordState = (id,state) => request.post('/api/v1/pri/word/changeState', {
  'id': id+'',
  'state': state+''
})
export const searchWords = (info) => request.post('/api/v1/pri/word/searchWords', {
  'info': info+''
})
export const searchWordById = (id) => request.post('/api/v1/pri/word/searchWordById', {
  'id': id+''
})

export const editWord = (info) => request.post('/api/v1/pri/word/editWord', {
  'info': info
})
export const addNewWord = (info) => request.post('/api/v1/pri/word/addNewWord', {
  'info': info
})
export const searchSentences = (id) => request.post('/api/v1/pri/word/searcSentences', {
  'id': id
})

export const searchRandomList = (size) => request.post('/api/v1/pri/word/searchRandomList', {
  'size': size
})

