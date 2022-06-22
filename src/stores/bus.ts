import { defineStore } from 'pinia'

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

interface busStop {
  StopUID: string
  StopName: {
    Zh_tw: string
    En: string
  }
  EstimateTime?: number
  StopPosition: {
    PositionLon: number
    PositionLat: number
  }
}

export const useBusStore = defineStore({
  id: 'bus',
  state: () => ({
    displayBoard: '',
    currentCity: '',
    currentRoute: {} as route,
    currentStops: [] as busStop[],
    mapView: []
  }),
  persist: true,
  actions: {
    //
  }
})
