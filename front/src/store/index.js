import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 准备actions用于响应组件中的动作
const actions = {}
// 准备mutations用于操作数据
const mutations = {
  
  // 顶部居中消息弹窗
  msgAlert(state, payload) {

    /**
     * message: 必须 string
     * type: info | success | warning | error
     */

    Vue.prototype.$message({
      message: payload.message,
      type: payload.type,
      center: true,
      duration: 1500 // 持续时长(毫秒)
    });
  },

}
// 准备state用于存储数据
const state = {
  
}

// 创建并暴露store
export default new Vuex.Store({
  actions, mutations, state
})