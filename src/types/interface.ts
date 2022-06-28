/**
 * 附近站點：一個站點會包含多個站牌（路線數量 * 去、回程）
 */
export interface nearbyStation {
  StationID: string
  StationUID: string
  StationName: {
    Zh_tw: string
    En?: string
  }
  StationPosition: {
    PositionLon: number
    PositionLat: number
    GeoHash: string
  }
  StopsNum: number
  City: string
}

/**
 * 附近站牌：包含站牌所屬的路線起點、終點資訊及預估時間
 */
export interface nearbyStopOfRoute {
  RouteUID: string
  Direction: number
  NextBusTime?: string
  PlateNumb?: string
  RouteName: {
    Zh_tw: string
    En?: string
  }
  IsLastBus?: boolean
  DepartureStopNameZh: string
  DepartureStopNameEn?: string
  DestinationStopNameZh: string
  DestinationStopNameEn?: string
  RouteMapImageUrl?: string
  EstimateTime?: number
  City: string
}

/**
 * 路線資訊：包含起點和終點
 */
export interface routeList {
  RouteUID: string
  RouteName: {
    Zh_tw: string,
    En?: string
  }
  DepartureStopNameZh: string
  DepartureStopNameEn?: string
  DestinationStopNameZh: string
  DestinationStopNameEn?: string
  RouteMapImageUrl?: string
  City: string
}

/**
 * 站牌資訊：包含座標＋預估時間
 */
export interface busStop{
  RouteName: {
    Zh_tw: string,
    En?: string
  }
  Direction: number
  EstimateTime?: number
  NextBusTime?: string
  PlateNumb?: string
  StopName: {
    Zh_tw: string, 
    En?: string
  }
  StopPosition: {
    PositionLon: number, 
    PositionLat: number, 
    GeoHash: string
  }
  StopSequence: number
  StopUID: string
}

/**
 * 繪製地圖路線用的個站牌位置格式
 */
export interface mapRouteLine{
  TimeString: string
  StopName: {
    Zh_tw: string, 
    En?: string
  }
  StopPosition: {
    PositionLon: number, 
    PositionLat: number, 
  }
}