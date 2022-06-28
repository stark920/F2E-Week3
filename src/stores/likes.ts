import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import type { routeList, nearbyStation } from '@/types/interface'
const toast = useToast()

export const useLikesStore = defineStore({
  id: 'likes',
  state: () => ({
    likeRoutes: [] as routeList[],
    likeStations: [] as nearbyStation[]
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
    toggleLikeStations(data: nearbyStation) {
      const index = this.likeStations.findIndex((el) => el.StationUID === data.StationUID)
      if (index >= 0) {
        this.likeStations.splice(index, 1)
        toast.error('已取消收藏站點')
      } else {
        this.likeStations.push(data)
        toast.success('已收藏站點')
      }
    }
  }
})
