// 路由的拦截--导航守卫
import router from '@/router'
import store from '@/store'
// 前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    //  拦截 判断有无token  有token => 放行 没有token => 登录
    let toPath = {
      path: '/login',
      query: {
        redirectUrl: to.path // 携带要去的地址到登录页 => 登录成功之后  有了权限 再回到刚才没有权限去的地址
      }
    }
    next(toPath)
  } else {
    next() // 直接放行
  }
})
export default router
