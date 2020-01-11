import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/about',
    name: 'about'

  }
]

const router = new VueRouter({
  routes
})

export default router
