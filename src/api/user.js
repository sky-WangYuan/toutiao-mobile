// 用户请求模块----封装登陆方法
import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data

  })
}
