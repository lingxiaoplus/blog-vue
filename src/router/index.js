import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/pages/Home'
import NotFound from '@/pages/NotFound'
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
        route("/items/member","/items/Member","member"),
        route("/items/order","/items/Order","order"),
      ]
    },
    {
      path:'*',
      name: 'HomePage',
      component: HomePage,
      redirect: "/index/notFound",
      children:[
        route("/index/notFound","/NotFound","NotFound"),
      ]
    },  //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配
  ]
})
