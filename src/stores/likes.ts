import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
const toast = useToast()

interface route {
  uid: string
  name: string
  nameEn?: string
  destination: string
  destinationEn?: string
  departure: string
  departureEn?: string
  city: string
} 

export const useLikesStore = defineStore({
  id: 'likes',
  state: () => ({
    likeRoutes: [] as route[],
    likeStops: [] as string[]
  }),
  persist: true,
  actions: {
    toggleLikeRoutes(data: route) {
      const index = this.likeRoutes.findIndex((el) => el.uid === data.uid)
      if (index >= 0) {
        this.likeRoutes.splice(index, 1)
        toast.error('已取消收藏路線')
      } else {
        this.likeRoutes.push(data)
        toast.success('已收藏路線')
      }
    },
    toggleLikeStops(StopUID: string) {
      const index = this.likeStops.indexOf(StopUID)
      if (index >= 0) {
        this.likeStops.splice(index, 1)
        toast.error('已取消收藏站牌')
      } else {
        this.likeStops.push(StopUID)
        toast.success('已收藏站牌')
      }
    }
  }
})
