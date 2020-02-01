import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default {
  install (Vue) {
    // 全部注册插件
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime)
  }
}

function sleep (time = 500) { // 如果传time使用传入的   否则使用500----延迟时间
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
function relTime (value) {
  return dayjs().locale('zh-cn').from(value)
}
