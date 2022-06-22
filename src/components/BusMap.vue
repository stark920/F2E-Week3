<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, watch } from 'vue'
import positionIcon from '@/assets/position.png'
import busStopIcon from '@/assets/busStop.png'
import busArrivingIcon from '@/assets/busArriving.png'
import { useBusStore } from '@/stores/bus'
import { storeToRefs } from 'pinia'
const busStore = useBusStore()
const { currentStops, displayBoard } = storeToRefs(busStore)

const mapData = {
  map: null as L.Map | null,
  myLocationIcon: new L.Icon({ iconUrl: positionIcon }),
  stopIcon: new L.Icon({
    iconUrl: busStopIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 12],
    popupAnchor: [0, -10],
    shadowSize: [41, 41]
  }),
  stopArrivingIcon: new L.Icon({
    iconUrl: busArrivingIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 12],
    popupAnchor: [0, -10],
    shadowSize: [41, 41]
  }),
  mapUrl:
    'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Vub3M5OTkiLCJhIjoiY2t3aGN6cTFsMHd5aDJ3bXA2bHlxYXg4NSJ9.1bz7Nfv2jK4ST--IunBdbQ',
  mapOptions: {
    minZoom: 6,
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  },
  mapRouteLine: null as L.Polyline | null,
  mapStopMarkers: null as L.LayerGroup | null,
  initMap() {
    this.map = L.map('busMap', { zoomControl: false }).setView([23.4, 120.9], 8)
    L.tileLayer(this.mapUrl, this.mapOptions).addTo(this.map)
    L.control
      .zoom({
        position: 'bottomright'
      })
      .addTo(this.map)
  }
}

watch(currentStops, (newValue) => {
  interface stop {
    position: [number, number]
    name: string
    time: string
  }
  const stops: stop[] = []
  newValue.forEach((stop) => {
    const time = stop.EstimateTime ?? -1
    let timeString = ''
    if (time === -1) {
      timeString = '尚未發車'
    } else if (time < 30) {
      timeString = '進站中'
    } else if (time < 60) {
      timeString = '即將進站'
    } else {
      timeString = (time / 60).toFixed(0) + ' 分'
    }
    const data: stop = {
      position: [stop.StopPosition.PositionLat, stop.StopPosition.PositionLon],
      name: stop.StopName.Zh_tw,
      time: timeString
    }
    stops.push(data)
  })
  const markers = stops.map((stop) => {
    if (stop.time === '進站中' || stop.time === '即將進站') {
      const popup = L.popup({
        closeButton: false,
        autoClose: false,
        className: 'leaflet-popup-custom-arrival'
      }).setContent(`<div>${stop.name}</div><strong>${stop.time}</strong>`)
      const marker = L.marker(stop.position, {
        icon: mapData.stopArrivingIcon
      }).bindPopup(popup)
      marker.openPopup()
      return marker
    } else {
      const popup = L.popup({
        closeButton: false,
        autoClose: false,
        className: 'leaflet-popup-custom-default'
      }).setContent(`<div>${stop.name}</div><strong>${stop.time}</strong>`)
      const marker = L.marker(stop.position, {
        icon: mapData.stopIcon
      }).bindPopup(popup)
      marker.openPopup()
      return marker
    }
  })

  if (mapData.mapRouteLine) {
    mapData.map?.removeLayer(mapData.mapRouteLine)
  }
  if (mapData.mapStopMarkers) {
    mapData.map?.removeLayer(mapData.mapStopMarkers)
  }
  if (mapData.map) {
    mapData.mapRouteLine = L.polyline(
      stops.map((el) => el.position),
      { color: '#355F8B' }
    ).addTo(mapData.map)
    mapData.mapStopMarkers = L.layerGroup(markers).addTo(mapData.map)

    mapData.map.setView(stops[Math.round(stops.length / 2)].position, 13)
  }
})

watch(displayBoard, (newValue) => {
  if (newValue === 'NearbyStopsBoard') {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        if (lat && lon && mapData.map) {
          L.marker([lat, lon], { icon: mapData.myLocationIcon }).addTo(
            mapData.map
          )
          mapData.map.setView([lat, lon], 12)
        }
      })
    }
  }
})

onMounted(() => {
  mapData.initMap()
})
</script>

<template>
  <div id="busMap" class="h-full w-full"></div>
</template>
