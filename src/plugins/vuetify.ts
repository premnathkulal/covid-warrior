import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#CEFFBA',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
})
