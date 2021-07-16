import Vue from 'vue'
import Vuex from 'vuex'
import Updates from '@/store/modules/updates'
import Location from '@/store/modules/location'
import News from '@/store/modules/news'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Updates,
    Location,
    News,
  },
})
