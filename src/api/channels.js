import request from '@/utils/request' // 处理频道的请求
// 导出一个方法
export function getMyChannels () { // 获取我的频道
  return request({
    // 返回一个Promise  axios默认就是get类型
    url: '/user/channels'
  })
}
