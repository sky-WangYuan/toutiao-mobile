import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from '@/utils/plugin'
import 'amfe-flexible'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'
import '@/styles/index.less'

Vue.use(Vant)
Vue.use(plugin)
Vue.use(Lazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
