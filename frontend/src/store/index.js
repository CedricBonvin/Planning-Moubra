import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HOST : "http://localhost:2000",
    connection : {
      connect : false,
      error : ""
    },
    hack : false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
