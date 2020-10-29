import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {devServer} from "../../vue.config";

const service = axios.create({
  baseURL: devServer.proxy["/"].target,
  //baseURL: 'http://81.71.135.51:80/',
  timeout: 50000
})

service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default service
