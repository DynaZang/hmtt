import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Form, Field, Button } from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)
/*
  组件使用套路:
  1. 明确目标，找到类似组件
  2. 引入注册然后复制过来
  3. 读和删除无用的
  4. 修改成需要的样子
  样式修改:
  1. 找到类名，自己写css样式覆盖
  2. 看文档，根据文档修改
*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
