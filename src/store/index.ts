import Vue from 'vue'
import Vuex from 'vuex'
import Updates from '@/store/modules/updates'
import Location from '@/store/modules/location'
import News from '@/store/modules/news'
import StateDistricts from '@/store/modules/stateDistricts'
import VaccinationCenter from '@/store/modules/vaccinationCenter'
import Login from '@/store/modules/login'
import Register from '@/store/modules/register'
import Profile from '@/store/modules/profile'
import Beneficiary from '@/store/modules/beneficiary'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Updates,
    Location,
    News,
    StateDistricts,
    VaccinationCenter,
    Login,
    Register,
    Profile,
    Beneficiary,
  },
})
