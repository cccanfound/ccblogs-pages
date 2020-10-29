// import axios from '../request'
import request from '@/utils/request'

export const registerApi = (username, password, headImg) => request.post('/api/v1/pri/user/register', {
  'username': username,
  'password': password,
  'name': headImg
})

export const loginApi = (username, password, headImg) => request.post('/api/v1/pri/user/login', {
  'username': username,
  'password': password,
  'name': headImg
})

export const getInfoApi = () => request.get('/api/v1/pri/user/getInfo', {

})
