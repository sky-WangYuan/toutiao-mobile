import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.setUser()
  },
  // 修改
  mutations: {
    // 数据修改必须通过mutations
    updateUser (state, payload) {
      state.user = payload.user // 将数据重新修改---将数据同步到缓存中
      auth.setUser(payload.user)// 将数据同步到缓存中
    },
    delUser (state) {
      auth.delUser(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
