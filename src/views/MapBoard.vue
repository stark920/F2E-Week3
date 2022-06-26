<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import positionIcon from '@/assets/position.png'
import busStopIcon from '@/assets/busStop.png'
import busArrivingIcon from '@/assets/busArriving.png'
import busFocusIcon from '@/assets/busFOcus.png'

import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'
import type { mapRouteLine } from '@/types/interface'

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

const mapData = {
  map: null as L.Map | null,
  mapRouteLine: null as L.Polyline | null,
  mapMarkers: [] as L.Marker[],
  mapMarkerGroup: null as L.LayerGroup | null,
  initMap() {
    let position = [23.4, 120.9]
    let zoom = 8
    if (viewPosition.value) {
      position = viewPosition.value
      zoom = 12
    }
    this.map = L.map('busMap', {
      zoomControl: false,
      closePopupOnClick: false
    }).setView(position as unknown as L.LatLng, zoom)
    L.tileLayer(mapSettings.mapUrl, mapSettings.mapOptions).addTo(this.map)
    L.control
      .zoom({
        position: 'bottomright'
      })
      .addTo(this.map)
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

watch(routeLine, (newValue) => {
  if (!newValue || newValue.length === 0) {
    return
  }
  const markers = newValue.map((stop: mapRouteLine) => {
    let className = 'leaflet-popup-custom '
    let icon
    if (stop.TimeString === '進站中' || stop.TimeString === '即將進站') {
      className += 'leaflet-popup-custom-arrival'
      icon = mapSettings.stopArrivingIcon
    } else if (stop.TimeString === '未發車') {
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
    const position = newPosition as unknown as L.LatLng
    L.marker(position, { icon: mapSettings.myLocationIcon }).addTo(mapData.map)
    mapData.map.flyTo(position, 16)
  }
})

// setView to clicked stop
watch(viewPosition, (newPosition) => {
  if (!mapData.map) return
  if (newPosition) {
    const position = newPosition as unknown as L.LatLng
    mapData.map.flyTo(position, 19)
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
  <div id="busMap" class="h-full w-full"></div>
</template>
