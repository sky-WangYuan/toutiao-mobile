export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep// 封装休眠函数
  }
}
// 设置休眠函数--下拉刷新的时候不要加载太快，服务器受不了
// 如果传入time用time  不传用500
// 返回Promise对象
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => { resolve() }, time)
  })
}
