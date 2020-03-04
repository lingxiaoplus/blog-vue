// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from '@/store/index'

import axios from 'axios'
import config from './config'
axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 8000; // 设置axios的请求时间
axios.defaults.withCredentials = true;
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 2000;

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log("拦截器请求错误",error)
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  if (response.data.code !== 200){
    console.log("拦截器响应非200",response.data)
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response.data){
    console.log("拦截器响应错误",error.response.data)
    if (error.response.data.code === 401){
      router.push("/user/login");
    }
  }
  return Promise.reject(error);
});

Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
Vue.config.productionTip = false


import { Upload, Dialog ,Table,
  TableColumn,Button,Pagination,Input,Message,Link,Popover,TimeSelect,Image} from 'element-ui'
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Link)
Vue.use(Popover);
Vue.use(TimeSelect);
Vue.use(Image);
//Vue.use(Select);
//Vue.use(Option);
// 在调用 Vue.use 前，给 Message 添加 install 方法
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}
Vue.use(Message)
Vue.prototype.$message = Message;
/* eslint-disable no-new */

import marked from 'marked'
import scroll from 'vue-scroll'
Vue.use(scroll)
import hljs from '../static/js/highlight.min.js'
import range from '../static/js/rangeFn.js'

//背景效果
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  template: '<App/>'
})
