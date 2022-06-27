import axios from 'axios'
import pick from './pick'
import type { nearbyStopOfRoute, nearbyStation, routeList, busStop } from '@/types/interface'

const busRequest = axios.create()

/**
 * 取得 TDX 新版 Token（不是舊版 PTX 的）
 * @returns Bearer Token
 */
const getToken = async() => {
  if (localStorage.getItem('tdxToken')) {
    const tokenData = JSON.parse(localStorage.getItem('tdxToken') as string)
    const tokenTime = tokenData.time
    const currentTime = Date.now()
    if (currentTime - tokenTime < 86400) {
      return tokenData.token
    }
  }

  const url = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'
  const client_id = 'pb220416-e87a0a64-5d08-4c1c'
  const client_secret = '6f88b9c0-3851-4258-a962-ba26ef1a8d06'
  const res = await fetch(url, {
    body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })
  const data = await res.json()
  const setToLocalData = {
    token: `${data.token_type} ${data.access_token}`,
    time: Date.now()
  }
  localStorage.setItem('tdxToken', JSON.stringify(setToLocalData))

  return `${data.token_type} ${data.access_token}`
}

busRequest.interceptors.request.use(
  async function (config) {
    if (!config.headers?.Authorization) {
      const token = await getToken()
      busRequest.defaults.headers.common['Authorization'] = token
      config.headers = {
        ...config.headers,
        Authorization: token
      }
    }
    return config
  },
  function (error) {
    console.log('Request Error:', error)
    return null
  }
);

busRequest.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log('Response Error:', error)
    return null
  }
);

const cityData = [
  {
    CityName: '臺北市',
    CityCode: 'TPE',
    City: 'Taipei'
  },
  {
    CityName: '臺中市',
    CityCode: 'TXG',
    City: 'Taichung'
  },
  {
    CityName: '基隆市',
    CityCode: 'KEE',
    City: 'Keelung'
  },
  {
    CityName: '臺南市',
    CityCode: 'TNN',
    City: 'Tainan'
  },
  {
    CityName: '高雄市',
    CityCode: 'KHH',
    City: 'Kaohsiung'
  },
  {
    CityName: '新北市',
    CityCode: 'NWT',
    City: 'NewTaipei'
  },
  {
    CityName: '宜蘭縣',
    CityCode: 'ILA',
    City: 'YilanCounty'
  },
  {
    CityName: '桃園市',
    CityCode: 'TAO',
    City: 'Taoyuan'
  },
  {
    CityName: '嘉義市',
    CityCode: 'CYI',
    City: 'Chiayi'
  },
  {
    CityName: '新竹縣',
    CityCode: 'HSQ',
    City: 'HsinchuCounty'
  },
  {
    CityName: '苗栗縣',
    CityCode: 'MIA',
    City: 'MiaoliCounty'
  },
  {
    CityName: '南投縣',
    CityCode: 'NAN',
    City: 'NantouCounty'
  },
  {
    CityName: '彰化縣',
    CityCode: 'CHA',
    City: 'ChanghuaCounty'
  },
  {
    CityName: '新竹市',
    CityCode: 'HSZ',
    City: 'Hsinchu'
  },
  {
    CityName: '雲林縣',
    CityCode: 'YUN',
    City: 'YunlinCounty'
  },
  {
    CityName: '嘉義縣',
    CityCode: 'CYQ',
    City: 'ChiayiCounty'
  },
  {
    CityName: '屏東縣',
    CityCode: 'PIF',
    City: 'PingtungCounty'
  },
  {
    CityName: '花蓮縣',
    CityCode: 'HUA',
    City: 'HualienCounty'
  },
  {
    CityName: '臺東縣',
    CityCode: 'TTT',
    City: 'TaitungCounty'
  },
  {
    CityName: '金門縣',
    CityCode: 'KIN',
    City: 'KinmenCounty'
  },
  {
    CityName: '澎湖縣',
    CityCode: 'PEN',
    City: 'PenghuCounty'
  },
  {
    CityName: '連江縣',
    CityCode: 'LIE',
    City: 'LienchiangCounty'
  }
]

/**
 * 
 * @param keyword (CityName, CityCode, City 的其中一個值)
 * @param select （指定回傳 keyword 對應的 'CityName', 'CityCode', 'City' 其中一種，不指定則回傳整個物件)
 * @returns String || Object(CityName, CityCode, City)
 */
const getCityName = (keyword: string, select: string) => {
  const data = cityData.find(el => el.City === keyword || el.CityCode === keyword || el.CityName === keyword)
  if (select) {
    const key = select as keyof typeof data
    return data?.[key] ? data[key] : data
  }
  return data
}

/**
 * 
 * @param Lat (緯度 有效範圍 -90~90)
 * @param Lon (經度 有效範圍 -180~180)
 * @param DistanceInMeters (有效範圍最大 1000, 預設 1000)
 * @returns null || nearbyStation[]
 */
const getNearbyStation = async (Lat: number, Lon: number, DistanceInMeters = 1000) => {
  if (DistanceInMeters > 1000 || Lat < -90 || Lat > 90 || Lon < -180 || Lon > 180) return null
  const selection = ['StationUID','StationID','StationName','StationPosition','Stops','LocationCityCode']
  const url = 'https://tdx.transportdata.tw/api/advanced/v2/Bus/Station/NearBy'
  try {
    const res = await busRequest.get(`${url}?$select=${selection.join(',')}&$spatialFilter=nearby(${Lat}, ${Lon}, ${DistanceInMeters})&$format=JSON`)
    if (res.data) {
      const data = res.data.map((el: any) => {
        el.StopsNum = el.Stops.length
        if (!el.StationName.En && el.Stops[0].StopName.En) {
          el.StationName.En = el.Stops[0].StopName.En
        }
        el.City = getCityName(el.LocationCityCode, 'City')
        return el
      })
      const result = data.map((el: object) => pick(el, ['StationUID','StationID','StationName','StationPosition','StopsNum','City']))
      return result as nearbyStation[]
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * 
 * @param id (站點的"純數字"編號，不是帶有地區英文的 UID)
 * @param city (城市的完整英文名稱，不是縮寫的 CityCode)
 * @returns null || nearbyStopOfRoute[]
 */
const getNearbyStationWithArrival = async (id: string, city: string) => {
  const timeSelections = ['RouteUID','Direction','NextBusTime','PlateNumb','RouteName','IsLastBus','EstimateTime']
  const routeSelections = ['RouteUID','DepartureStopNameZh','DepartureStopNameEn','DestinationStopNameZh','DestinationStopNameEn','RouteMapImageUrl','City']
  const url = `https://tdx.transportdata.tw/api/advanced/v2/Bus`
  
  try {
    const EstimateTime = busRequest.get(`${url}/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${id}?$select=${timeSelections.join(',')}&$format=JSON`)
    const RouteInfo = busRequest.get(`${url}/Route/City/${city}/PassThrough/Station/${id}?$select=${routeSelections.join(',')}&$format=JSON`)
    const responses = await Promise.all([EstimateTime, RouteInfo])
    const timeData = responses[0].data
    const routeData = responses[1].data
  
    if (timeData && routeData) {
      const data = timeData.map((time: any) => {
        const route = routeData.find((el: any) => el.RouteUID === time.RouteUID)
        if (route) {
          time.DepartureStopNameZh = route.DepartureStopNameZh
          time.DepartureStopNameEn = route.DepartureStopNameEn
          time.DestinationStopNameZh = route.DestinationStopNameZh
          time.DestinationStopNameEn = route.DestinationStopNameEn
          time.RouteMapImageUrl = route.RouteMapImageUrl
          time.City = route.City
        }
        if (!time.EstimateTime) {
          time.EstimateTime = -1
        }
        return time
      })
      const allSelection = new Set([...timeSelections, ...routeSelections])
      const result = data.map((el: object) => pick(el, Array.from(allSelection)))
      return result as nearbyStopOfRoute[]
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

const selectRouteParams = ['RouteUID','RouteName','DepartureStopNameZh','DepartureStopNameEn','DestinationStopNameZh','DestinationStopNameEn','RouteMapImageUrl','City']
const route_url = 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/'
/**
 * 取得城市的路線資訊，台北新北、新竹縣市、嘉義縣市會合併資料
 * @param city (城市的完整英文名稱，不是縮寫的 CityCode)
 * @returns null || routeList[]
 */
const getRoutesData = async (city: string) => {
  if (city === 'Taipei') {
    return concatTwoRoutes('Taipei', 'NewTaipei')
  }
  if (city === 'Hsinchu') {
    return concatTwoRoutes('Hsinchu', 'HsinchuCounty')
  }
  if (city === 'Chiayi') {
    return concatTwoRoutes('Chiayi', 'ChiayiCounty')
  }
  try {
    const res = await busRequest.get(`${route_url}${city}?$select=${selectRouteParams.join(',')}&$format=JSON`)
    if (res.data) {
      const data = res.data.map((el: object) => pick(el, selectRouteParams))
      return data as routeList[]
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * 合併兩個城市的路線資料
 * @param city1 (城市1的完整英文名稱，不是縮寫的 CityCode)
 * @param city2 (城市2的完整英文名稱，不是縮寫的 CityCode)
 * @returns null || routeList[]
 */
const concatTwoRoutes = async (city1: string, city2: string) => {
  try {
    const cityRequest1 = busRequest.get(`${route_url}${city1}?$select=${selectRouteParams.join(',')}&$format=JSON`)
    const cityRequest2 = busRequest.get(`${route_url}${city2}?$select=${selectRouteParams.join(',')}&$format=JSON`)
    const responses = await Promise.all([cityRequest1, cityRequest2])
    if (responses[0].data && responses[1].data) {
      const data1: object[] = responses[0].data
      const data2: object[] = responses[1].data
      const data = data1.concat(data2)
      const result = data.map((el: object) => pick(el, selectRouteParams))
      return result as routeList[]
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }

}


/**
 * 
 * @param city (城市的完整英文名稱，不是縮寫的 CityCode)
 * @param routeName (路線的中文名稱，不是 ID 或 UID)
 * @returns null || busStop[]
 */
const getRouteWithArrivalTime = async (city: string, routeName: string) => {
  const url = 'https://ptx.transportdata.tw/MOTC/v2/Bus'
  const stopsSelection = ['RouteName','Direction','Stops']
  const timeSelection = ['RouteName','PlateNumb','StopUID','StopName','Direction','EstimateTime','StopSequence','NextBusTime','IsLastBus'] 

  try {
    const StopOfRoute = busRequest.get(`${url}/StopOfRoute/City/${city}/${routeName}?$select=${stopsSelection.join(',')}&$format=JSON`)
    const EstimateTime = busRequest.get(`${url}/EstimatedTimeOfArrival/City/${city}/${routeName}?$select=${timeSelection.join(',')}&$format=JSON`)
    const responses = await Promise.all([StopOfRoute, EstimateTime])

    if (!responses[0] || !responses[1]) return null

    const allRoutes = responses[0].data.filter((el: busStop) => el.RouteName.Zh_tw === routeName)
    const allTimes = responses[1].data.filter((el: busStop) => el.RouteName.Zh_tw === routeName)

    const stops = {
      go: allRoutes.filter((el: busStop) => el.Direction === 0)[0]?.Stops ?? [],
      back: allRoutes.filter((el: busStop) => el.Direction === 1)[0]?.Stops ?? [],
      circle: allRoutes.filter((el: busStop) => el.Direction === 2)[0]?.Stops ?? []
    }
    const times = {
      go: allTimes.filter((el: busStop) => el.Direction === 0),
      back: allTimes.filter((el: busStop) => el.Direction === 1),
      circle: allTimes.filter((el: busStop) => el.Direction === 2)
    }

    const mixData = {
      go: stops.go.length > 0 ? stops.go.map((stop: busStop) => {
        const time = times.go.find((el: busStop) => el.StopUID === stop.StopUID)
        return {...stop, ...time}
      }) : [],
      back: stops.back.length > 0 ? stops.back.map((stop: busStop) => {
        const time = times.back.find((el: busStop) => el.StopUID === stop.StopUID)
        return {...stop, ...time}
      }) : [],
      circle: stops.circle.length > 0 ? stops.circle.map((stop: busStop) => {
        const time = times.circle.find((el: busStop) => el.StopUID === stop.StopUID)
        return {...stop, ...time}
      }) : []
    }
    return mixData
  } catch (error) {
    console.log(error)
    return null
  }
}

export const busApi = {
  getRoutesData,
  getRouteWithArrivalTime,
  getNearbyStation,
  getNearbyStationWithArrival
}
