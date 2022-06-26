import { defineStore } from 'pinia'
import type { routeList } from '@/types/interface'

export const useBusStore = defineStore({
  id: 'bus',
  state: () => ({
    currentCity: '',
  }),
  actions: {
    //
  }
})
