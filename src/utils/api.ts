import axios from 'axios'
import pick from './pick'
import { useBusStore } from '@/stores/bus'
const busStore = useBusStore()

const busRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus',
})

;(function() {
  fetch('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', {
    body: `grant_type=client_credentials&client_id=pb220416-e87a0a64-5d08-4c1c&client_secret=6f88b9c0-3851-4258-a962-ba26ef1a8d06`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  }).then(res => res.json()).then(data => {
    busRequest.defaults.headers.common['Authorization'] = `${data.token_type} ${data.access_token}`
  })
})()

// export const cities = {
//   Taipei: '台北 / 新北',
//   Taoyuan: '桃園',
//   Taichung: '台中',
//   Tainan: '台南',
//   Kaohsiung: '高雄',
//   Hsinchu: '新竹',
//   MiaoliCounty: '苗栗',
//   ChanghuaCounty: '彰化',
//   NantouCounty: '南投',
//   YunlinCounty: '雲林',
//   Chiayi: '嘉義',
//   PingtungCounty: '屏東',
//   YilanCounty: '宜蘭',
//   HualienCounty: '花蓮',
//   TaitungCounty: '臺東',
//   PenghuCounty: '澎湖',
//   KinmenCounty: '金門'
// }




busRequest.interceptors.request.use(
  function (config) {
    console.log(config)
    return config
  },
  function (error) {
    console.log(error)
    return null
  }
);

busRequest.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    return null
  }
);

/**
 * 
 * @returns Array of routes in certain city
 */
const getRoutesData = async () => {
  if (busStore.currentCity === 'Taipei') {
    const Taipei = busRequest.get(`/Route/City/Taipei?$format=JSON`)
    const NewTaipei = busRequest.get(`/Route/City/NewTaipei?$format=JSON`)
    const responses = await Promise.all([Taipei, NewTaipei])
    return responses ? responses.reduce((a, b) => a.data.concat(b.data)) : null
  }
  if (busStore.currentCity === 'Hsinchu') {
    const Hsinchu = busRequest.get(`/Route/City/Hsinchu?$format=JSON`)
    const HsinchuCounty = busRequest.get(`/Route/City/HsinchuCounty?$format=JSON`)
    const responses = await Promise.all([Hsinchu, HsinchuCounty])
    return responses ? responses.reduce((a, b) => a.data.concat(b.data)) : null
  }
  if (busStore.currentCity === 'Chiayi') {
    const Chiayi = busRequest.get(`/Route/City/Chiayi?$format=JSON`)
    const ChiayiCounty = busRequest.get(`/Route/City/ChiayiCounty?$format=JSON`)
    const responses = await Promise.all([Chiayi, ChiayiCounty])
    return responses ? responses.reduce((a, b) => a.data.concat(b.data)) : null
  }
  const res = await busRequest.get(`/Route/City/${busStore.currentCity}?$format=JSON`)
  return res ? res.data : null
}
  
/**
 * 
 * @returns Stops of route with 1 or 2 array (forward and backward)
 */
const getNearbyStops = async (Lat:number,Lon:number,DistanceInMeters = 500) => {
  const res = await busRequest.get(`/Stop/NearBy?$spatialFilter=nearby(${Lat}, ${Lon}, ${DistanceInMeters})&$format=JSON`)
  return res.data
}

interface route {
  PlateNumb: string
  RouteUID: string
  RouteName: {
    Zh_tw: string
  }
  DepartureStopNameZh: string
  DestinationStopNameZh: string
  Direction: boolean
  Stops: stop[]
}

interface stop{
  PlateNumb?: string
  EstimateTime?: number
  StopUID: string
  StopStatus: number
  IsLastBus: boolean
}

/**
 * 
 * @returns Array of Routes
 */
const getRouteWithArrivalTime = async () => {
  const {city, name} = busStore.currentRoute

  const StopOfRoute = busRequest.get(`/StopOfRoute/City/${city}/${name}?$format=JSON`)
  const EstimateTime = busRequest.get(`/EstimatedTimeOfArrival/City/${city}/${name}?$format=JSON`)
  const responses = await Promise.all([StopOfRoute, EstimateTime])
  if (!responses[0] || !responses[1]) {
    return null
  }

  const allRoutes = responses[0].data.filter((el: route) => el.RouteName['Zh_tw'] === name)
  const forwardStops = allRoutes.filter((el: route) => !el.Direction)[0]?.Stops
  const backwardStops = allRoutes.filter((el:route) => el.Direction)[0]?.Stops

  const allBus = responses[1].data.filter((el: route) => el.RouteName['Zh_tw'] === name)
  const forwardBus = allBus.filter((el:route) => !el.Direction)
  const backwardBus = allBus.filter((el:route) => el.Direction)

  if (forwardStops && forwardBus) {
    forwardBus.forEach((el:stop) => {
      const index = forwardStops.findIndex((stop: stop) => stop.StopUID === el.StopUID)
      if (index >= 0) {
        forwardStops[index].StopStatus = el.StopStatus
        forwardStops[index].EstimateTime = el.EstimateTime
        if (el?.PlateNumb) {
          forwardStops[index].PlateNumb = el.PlateNumb
        }
        if (el?.IsLastBus) {
          forwardStops[index].IsLastBus = el.IsLastBus
        }
      }
    })
  }

  if (backwardStops && backwardBus) {
    backwardBus.forEach((el:stop) => {
      const index = backwardStops.findIndex((stop: stop) => stop.StopUID === el.StopUID)
      if (index >= 0) {
        backwardStops[index].StopStatus = el.StopStatus
        backwardStops[index].EstimateTime = el.EstimateTime
        if (el?.PlateNumb) {
          backwardStops[index].PlateNumb = el.PlateNumb
        }
        if (el?.IsLastBus) {
          backwardStops[index].IsLastBus = el.IsLastBus
        }
      }
    })
  }

  const data = {
    forward: forwardStops ?? [],
    backward: backwardStops ?? []
  }

  return data
}

export const busApi = {
  getRoutesData,
  getRouteWithArrivalTime
}
