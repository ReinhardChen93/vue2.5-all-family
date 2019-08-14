import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Botnav from './views/Botnav'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes: [
    {
      path: '/',
      name: 'register',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/index',
      name: 'Index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Index.vue')
    },
    {
      path: '/botnav',
      name: 'botnav',
      component: () => import(/* webpackChunkName: "about" */ './views/Botnav.vue'),
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import(/* webpackChunkName: "about" */ './views/Index.vue')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import(/* webpackChunkName: "about" */ './views/List.vue')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
        },
        {
          path: 'car',
          name: 'car',
          meta: {
            requireAuth: true, // 有这个字段的时候,我们认为这个路由界面有登陆权限
          },
          component: () => import(/* webpackChunkName: "about" */ './views/Car.vue')
        },
        {
          path: 'mine',
          name: 'mine',
          meta: {
            requireAuth: true, // 有这个字段的时候,我们认为这个路由界面有登陆权限
          },
          component: () => import(/* webpackChunkName: "about" */ './views/Mine.vue')
        }
      ]
    }
  ]
})
