import Vue from 'vue'
import VueRouter from 'vue-router'
import login_Index from '@/views/Login/login_index.vue'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import User from '@/views/User'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 默认显示layout/home
  },
  {
    path: '/login',
    component: login_Index
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
