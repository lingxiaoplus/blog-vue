import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/pages/Home'
Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      redirect: "/index/dashboard",
      children:[
        route("/index/dashboard","/Dashboard","Dashboard"),
        route("/items/normalLine","/items/NormalLine","NormalLine"),
      ]
    }
  ]
})
