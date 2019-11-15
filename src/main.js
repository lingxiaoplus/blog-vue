// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export


import axios from 'axios'
import config from './config'
axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间
axios.defaults.withCredentials = true;
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}
Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
Vue.config.productionTip = false


import { Upload, Dialog ,Table,
  TableColumn,Button,Pagination} from 'element-ui'
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
