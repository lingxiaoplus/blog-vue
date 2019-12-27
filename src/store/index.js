import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    //这里放全局参数
    loading: false,
  },
  mutations:{
    //这里是set方法
    setLoading(state,value){
      state.loading = value;
    }
  },
  getters: {
    //这里是get方法  
    getLoadingState:state => state.loading
  },

  actions: {
    //这个部分我暂时用不上
  },

  modules: {

    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    
  }
})
