import Vue from 'vue'
import VueRouter from 'vue-router'
import connection from '../views/connection.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'connection',
    component: connection
  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
