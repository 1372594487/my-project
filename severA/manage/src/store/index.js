import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false,
    imgSrc:'',
  },
  mutations: {
    chisCollapse(state){
      state.isCollapse = !state.isCollapse;
    },
    sendImg(state,receive){
      state.imgSrc = receive;
    }
  },
  actions: {
  },
  modules: {
  }
})
