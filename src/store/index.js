import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import developer from './modules/developer'
import { createStore } from 'vuex-extensions'
Vue.use(Vuex)

export default createStore(Vuex.Store, {
  plugins: [createPersistedState()],
  modules: {
    developer
  }
})
