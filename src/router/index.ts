import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nearby',
      name: 'nearby',
      component: () => import('../views/NearbyView.vue')
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('../views/CityView.vue')
    },
    {
      path: '/stop',
      name: 'stop',
      component: () => import('../views/StopView.vue')
    }
  ]
})

export default router
