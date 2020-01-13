const userToken = 'toutiao-token'
// 保存
export function setUser (user) {
  localStorage.setItem(userToken, JSON.stringify(user))// key value
}
// 获取
export function getUser () {
  return JSON.parse(localStorage.getItem(userToken) || '{}')
}
// 删除
export function delUser () {
  localStorage.removeItem(userToken)
}
