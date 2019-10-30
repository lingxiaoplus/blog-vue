import Vue from 'vue';
//import Vuetify from 'vuetify/lib';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)
//自定义图标
const MY_ICONS = {
  logo: "../assets/logo.svg"
}
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: MY_ICONS,
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
