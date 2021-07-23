import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@lottiefiles/lottie-player'
import vuetify from './plugins/vuetify'
import { dateFormate } from './utils/filters'

Vue.config.productionTip = false
Vue.filter('dateFormate', dateFormate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
