/*
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:02:02
 * @LastEditTime: 2021-01-26 15:19:39
 * @Fighting: Make it Work, Make it Right, Make it Fast
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/echartsCloud'
  },
  {
    path: '/echartsCloud',
    name: 'EchartsCloud',
    component: () => import('../views/EchartsCloud.vue')
  },
  {
    path: '/d3Cloud',
    name: 'D3Cloud',
    component: () => import('../views/D3Cloud.vue')
  },
  {
    path: '/d3CityMap',
    name: 'D3CityMap',
    component: () => import('../views/D3CityMap.vue')
  },
  {
    path: '/d3Pie',
    name: 'D3Pie',
    component: () => import('../views/D3Pie.vue')
  },
  {
    path: '/d3Bar',
    name: 'D3Bar',
    component: () => import('../views/D3Bar.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
