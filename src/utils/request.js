// 封装request.js
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 1.创建axios实例，与之前的axios无关
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置请求地址
  transformResponse: [function (data) {
    // 服务器相应的是字符串，默认转为JSON.parse，但此方法处理最大安全数字是不安全的，需要使用bigint来替换
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 2.请求拦截器注入token
instance.interceptors.request.use(config => {
  // 如果有token  注入token
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
}, error => Promise.reject(error))

// 2.响应拦截器返回数据
instance.interceptors.response.use(response => {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async error => {
  // 错误的时候处理token失效--error里包括 config当前请求配置 request 请求  response 响应
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    if (store.status.user.refresh_token) {
      try {
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
      } catch (error) {
        //  如果错误 表示补救措施也没用了 应该跳转到登录页 并且 把废掉的user全都干掉
        store.commit('delUser') // 所有用户信息清除
        router.push(toPath) // 跳转到登录页
      }
    } else {
      router.push(toPath)
    }
  }
  Promise.reject(error)
})
export default instance

// 设置baseUrl和处理最大数字
