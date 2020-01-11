import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/home'

// 需要的时候再去加载
const Article = () => import('@/views/article')
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
const Login = () => import('@/views/login')
const Question = () => import('@/views/question')
const Search = () => import('@/views/search')
const Result = () => import('@/views/search/result')
const User = () => import('@/views/user')
const Chat = () => import('@/views/user/chat')
const Profile = () => import('@/views/user/profile')
const Video = () => import('@/views/video')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Layout, // 一级路由
  children: [{
    path: '/',
    component: Home // 首页
  },
  {
    path: '/question',
    component: Question // 问答
  },
  {
    path: '/video',
    component: Video // 视频
  },
  {
    path: '/user',
    component: User // 个人中心
  }
  ]
},
{
  path: '/user/profile', // 编辑资料
  component: Profile
},
{
  path: '/user/chat', // 小侄同学
  component: Chat
},
{
  path: '/login', // 登陆
  component: Login
},
{
  path: '/search', // 搜索
  component: Search
},
{
  path: '/search/result', // 搜索结果
  component: Result
},
{
  path: '/article', // 文章详情
  component: Article
}

]

const router = new VueRouter({
  routes
})

export default router
