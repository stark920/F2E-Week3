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
      path: '/',
      component: () => import('../views/MapView.vue'),
      children: [
        {
          path: '/nearby',
          name: 'nearby',
          components: {
            main: () => import('../views/NearbyBoard.vue'),
            nav: () => import('../views/NearbyNav.vue'),
          }
        },
        {
          path: '/city',
          name: 'city',
          components: {
            main: () => import('../views/CityBoard.vue'),
            nav: () => import('../views/CityNav.vue')
          }
        },
        {
          path: '/stop',
          name: 'stop',
          components: {
            main: () => import('../views/StopBoard.vue'),
            nav: () => import('../views/CityNav.vue')
          }
        },
        {
          path: '/collect',
          name: 'collect',
          components: {
            main: () => import('../views/CollectBoard.vue'),
            nav: () => import('../views/CollectNav.vue')
          }
        },
      ]
    }
  ],
})

export default router
