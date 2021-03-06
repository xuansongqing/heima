import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    // name: 'home',
    component: Home,
    children: [
      // 二级路由什么都不写，代表默认组件
      { path: '', component: Home2 },
      { path: 'comment', component: () => import('../views/comment') },
      { path: 'material', component: () => import('../views/material') },
      { path: 'articles', component: () => import('../views/articles') },
      { path: 'publish', component: () => import('../views/publish') },
      { path: 'publish/:id', component: () => import('../views/publish') },
      { path: 'userinfo', component: () => import('../views/account') }
    ]
  },
  { path: '/login', component: Login }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
