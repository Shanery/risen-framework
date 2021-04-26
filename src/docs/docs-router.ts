import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/docs/Home.vue'
import DesignSystem from '@/docs/DesignSystem/DesignSystem.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/design-system',
    name: 'Design System',
    component: DesignSystem,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
