import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/docs/Home.vue'
import DesignSystem from '@/docs/DesignSystem/DesignSystem.vue'

import InProgress from '@/docs/InProgress.vue'

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
  {
    path: '/responsive-getters',
    name: 'Design System',
    component: InProgress,
  },
  {
    path: '/resource-modules',
    name: 'Resource Modules',
    component: InProgress,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
