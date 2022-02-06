import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // HOST : "http://localhost:2000",
    HOST : "https://www.planning.monkey-school.ch",
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
