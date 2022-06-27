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

export interface nearbyStopOfRoute {
  RouteUID: string
  Direction: number
  NextBusTime?: string
  PlateNumb?: string
  RouteName: {
    Zh_tw: string
    En: string
  }
  IsLastBus?: boolean
  DepartureStopNameZh: string
  DepartureStopNameEn?: string
  DestinationStopNameZh: string
  DestinationStopNameEn?: string
  RouteMapImageUrl?: string
  EstimateTime: number
  City: string
}

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