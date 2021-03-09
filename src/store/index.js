import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation'
import actions from './actions'
import getters from './getters'
//安装插件
Vue.use(Vuex)

//创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  getters,
  actions,

})

//挂载到vue实例上
export default store
