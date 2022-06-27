<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import positionIcon from '@/assets/position.png'
import busStopIcon from '@/assets/busStop.png'
import busArrivingIcon from '@/assets/busArriving.png'
import busFocusIcon from '@/assets/busFOcus.png'
import gpsIcon from '@/assets/gps.png'

import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'
import type { mapRouteLine } from '@/types/interface'

const toast = useToast()
const mapStore = useMapStore()
const langStore = useLangStore()
const { userPosition, viewPosition, nearbyStation, focusStopIndex, routeLine } =
  storeToRefs(mapStore)
const { lang } = storeToRefs(langStore)

const mapSettings = {
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
  stopFocusIcon: new L.Icon({
    iconUrl: busFocusIcon,
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
  }
}

const loadingLocation = ref(false)

const mapData = {
  map: null as L.Map | null,
  mapRouteLine: null as L.Polyline | null,
  mapMarkers: [] as L.Marker[],
  locateMarker: null as L.Marker | null,
  mapMarkerGroup: null as L.LayerGroup | null,
  isGettingLocation: false,
  initMap() {
    this.map = L.map('busMap', {
      zoomControl: false,
      closePopupOnClick: false
    }).setView([23.4, 120.9], 8)

    this.map.on('locationfound', (e) => {
      mapStore.changeUserPosition(e.latlng.lat, e.latlng.lng)
      loadingLocation.value = false
    })

    this.map.on('locationerror', () => {
      toast.error('無法取得您的位置資訊，請確認開啟裝置定位和授權位置資訊')
      loadingLocation.value = false
    })
    // 底圖
    L.tileLayer(mapSettings.mapUrl, mapSettings.mapOptions).addTo(this.map)
    // 縮放按鈕
    L.control
      .zoom({
        position: 'bottomright'
      })
      .addTo(this.map)
    // 定位按鈕
    const LocateButton = L.Control.extend({
      onAdd() {
        const container = L.DomUtil.create(
          'div',
          'bg-white flex-c hover:bg-gray-300'
        )
        const img = L.DomUtil.create('img', 'w-5 h-5', container)
        img.src = gpsIcon
        container.style.border = '2px solid rgba(0,0,0,0.3)'
        container.style.width = '34px'
        container.style.height = '34px'
        container.style.borderRadius = '4px'
        container.style.cursor = 'pointer'
        container.onclick = () => {
          if (mapData.map) {
            mapData.map.locate({
              setView: true,
              watch: false,
              enableHighAccuracy: true,
              timeout: 10000
            })
            loadingLocation.value = true
          }
        }
        return container
      }
    })
    new LocateButton({
      position: 'bottomright'
    }).addTo(this.map)
  },
  cleanLayers() {
    if (this.map) {
      if (this.mapRouteLine) this.map.removeLayer(this.mapRouteLine)
      if (this.mapMarkerGroup) this.map.removeLayer(this.mapMarkerGroup)
    }
    this.mapRouteLine = null
    this.mapMarkerGroup = null
    this.mapMarkers.length = 0
  }
}

watch([routeLine, lang], ([newValue]) => {
  if (!newValue || newValue.length === 0) {
    return
  }
  const markers = newValue.map((stop: mapRouteLine) => {
    let className = 'leaflet-popup-custom '
    let icon
    if (
      ['進站中', '即將進站', 'Arriving', 'Upcoming'].includes(stop.TimeString)
    ) {
      className += 'leaflet-popup-custom-arrival'
      icon = mapSettings.stopArrivingIcon
    } else if (['未發車', 'No Dep.'].includes(stop.TimeString)) {
      className += 'leaflet-popup-custom-null'
      icon = mapSettings.stopIcon
    } else {
      className += 'leaflet-popup-custom-default'
      icon = mapSettings.stopIcon
    }
    const name =
      lang.value === 'zh-TW'
        ? stop.StopName.Zh_tw
        : stop.StopName.En ?? stop.StopName.Zh_tw
    const popup = L.popup({
      autoClose: false,
      closeButton: false,
      className
    }).setContent(`<div>${name}</div><strong>${stop.TimeString}</strong>`)
    const marker = L.marker(
      [stop.StopPosition.PositionLat, stop.StopPosition.PositionLon],
      { icon }
    ).bindPopup(popup)
    return marker
  })

  mapData.cleanLayers()

  if (mapData.map) {
    mapData.mapRouteLine = L.polyline(
      newValue.map((stop: mapRouteLine) => [
        stop.StopPosition.PositionLat,
        stop.StopPosition.PositionLon
      ]),
      { color: '#355F8B' }
    ).addTo(mapData.map)
    mapData.mapMarkerGroup = L.layerGroup(markers).addTo(mapData.map)
    markers.forEach((marker) => marker.openPopup())

    mapData.map.setView(
      [
        newValue[0].StopPosition.PositionLat,
        newValue[0].StopPosition.PositionLon
      ],
      15
    )
  }
})

// setView to user location
watch(userPosition, (newPosition) => {
  if (newPosition && mapData.map) {
    if (mapData.locateMarker) {
      mapData.locateMarker.setLatLng(newPosition)
    } else {
      mapData.locateMarker = L.marker(newPosition, {
        icon: mapSettings.myLocationIcon
      }).addTo(mapData.map)
    }
    mapData.map.flyTo(newPosition, 16)
  }
})

// setView to clicked stop
watch(viewPosition, (newPosition) => {
  if (!mapData.map) return
  if (newPosition) {
    mapData.map.flyTo(newPosition, 19)
  }
})

// change clicked stop's color
watch(focusStopIndex, (newIndex, oldIndex) => {
  if (newIndex === -1) return

  if (newIndex !== oldIndex && oldIndex !== -1) {
    const oldMarker = mapData.mapMarkers[oldIndex]
    const popupContent = oldMarker.getPopup()?.getContent()
    const popup = L.popup({
      autoClose: false,
      closeButton: false,
      className: 'leaflet-popup-custom leaflet-popup-custom-default'
    }).setContent(popupContent ?? '')
    oldMarker
      .setIcon(mapSettings.stopIcon)
      .closePopup()
      .unbindPopup()
      .bindPopup(popup)
      .openPopup()
  }

  const newMarker = mapData.mapMarkers[newIndex]
  const popupContent = newMarker.getPopup()?.getContent()
  const popup = L.popup({
    autoClose: false,
    closeButton: false,
    className: 'leaflet-popup-custom leaflet-popup-custom-focus'
  }).setContent(popupContent ?? '')
  newMarker
    .setIcon(mapSettings.stopFocusIcon)
    .closePopup()
    .unbindPopup()
    .bindPopup(popup)
    .openPopup()
})

// mark all nearby stations
watch(nearbyStation, (newStation) => {
  if (!mapData.map) return

  if (newStation && newStation.length > 0) {
    mapData.cleanLayers()
    const markers = newStation.map((station) => {
      const className = 'leaflet-popup-custom leaflet-popup-custom-default'
      const icon = mapSettings.stopIcon
      const position = [
        station.StationPosition.PositionLat,
        station.StationPosition.PositionLon
      ] as unknown as L.LatLng
      const popup = L.popup({
        autoClose: false,
        closeButton: false,
        className
      }).setContent(`<div>${station.StationName.Zh_tw}</div>`)
      const marker = L.marker(position, { icon }).bindPopup(popup)
      return marker
    })
    mapData.mapMarkers = markers
    mapData.mapMarkerGroup = L.layerGroup(markers).addTo(mapData.map)
    markers.forEach((marker) => marker.openPopup())
  }
})

onMounted(() => {
  mapData.initMap()
})
</script>

<template>
  <div
    v-show="loadingLocation"
    class="absolute top-1/2 left-1/2 z-[1000] -translate-y-1/2 -translate-x-1/2 rounded-md border-[1px] border-gray-200 bg-white px-4 py-2">
    取得定位資訊中...
  </div>

  <div id="busMap" class="h-full w-full"></div>
</template>
