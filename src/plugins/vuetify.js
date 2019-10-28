import Vue from 'vue';
//import Vuetify from 'vuetify/lib';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
              primary: colors.purple,
              secondary: colors.grey.darken1,
              accent: colors.shades.black,
              error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
