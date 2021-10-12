import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/report/:duration',
    name: 'ReportManager',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ReportManager.vue')
  },
  {
    path: '/generate-report',
    name: 'GeneratedReport',
    component: () => import(/* webpackChunkName: "about" */ '@/views/GeneratedReport.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
