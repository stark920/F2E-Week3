import { defineStore } from 'pinia'
import type { nearbyStation, mapRouteLine } from '@/types/interface'

export const useMapStore = defineStore({
  id: 'map',
  state: () => ({
    viewPosition: undefined as [number, number] | undefined,
    userPosition: undefined as [number, number] | undefined,
    nearbyStationsData: undefined as nearbyStation[] | undefined,
    selectedStationData: undefined as nearbyStation | undefined,
    routeLine: undefined as mapRouteLine[] | undefined,
    focusStopIndex: -1 as number
  }),
  actions: {
    changeViewPosition(Lat:number, Lon:number) {
      if (Lat >= -90 && Lat <= 90 && Lon >= -180 && Lon <= 180) {
        this.viewPosition = [Lat, Lon]
      }
    },
    changeUserPosition(Lat:number, Lon:number) {
      if (Lat >= -90 && Lat <= 90 && Lon >= -180 && Lon <= 180) {
        this.userPosition = [Lat, Lon]
      }
    }
  }
})