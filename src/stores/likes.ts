import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { routeList, nearbyStopOfRoute } from '@/types/interface'
const toast = useToast()

export const useLikesStore = defineStore({
  id: 'likes',
  state: () => ({
    likeRoutes: [] as routeList[],
    likeStops: [] as nearbyStopOfRoute[]
  }),
  persist: true, // save in localStorage
  actions: {
    toggleLikeRoutes(data: routeList) {
      const index = this.likeRoutes.findIndex((el) => el.RouteUID === data.RouteUID)
      if (index >= 0) {
        this.likeRoutes.splice(index, 1)
        toast.error('已取消收藏路線')
      } else {
        this.likeRoutes.push(data)
        toast.success('已收藏路線')
      }
    },
    toggleLikeStops(data: nearbyStopOfRoute) {
      const index = this.likeStops.indexOf(data)
      if (index >= 0) {
        this.likeStops.splice(index, 1)
        toast.error('已取消收藏站牌')
      } else {
        this.likeStops.push(data)
        toast.success('已收藏站牌')
      }
    }
  }
})
