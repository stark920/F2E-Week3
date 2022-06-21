<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted } from 'vue'
import positionIcon from '@/assets/position.png'
import { useBusStore } from '@/stores/bus'
const busStore = useBusStore()

let mapObj: L.Map | null = null
// let markers = new L.MarkerClusterGroup()

const myLocationIcon = new L.Icon({ iconUrl: positionIcon })
const mapUrl =
  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Vub3M5OTkiLCJhIjoiY2t3aGN6cTFsMHd5aDJ3bXA2bHlxYXg4NSJ9.1bz7Nfv2jK4ST--IunBdbQ'
const mapOptions = {
  minZoom: 6,
  maxZoom: 19,
  tileSize: 512,
  zoomOffset: -1,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}

const initMap = () => {
  mapObj = L.map('busMap', { zoomControl: false }).setView([23.4, 120.9], 8)
  L.tileLayer(mapUrl, mapOptions).addTo(mapObj)
  L.control
    .zoom({
      position: 'bottomright'
    })
    .addTo(mapObj)
}

const drawLine = () => {
  //   busDetail[el.Direction] = {};
  // busDetail[`line${el.Direction}`] = [];
  // el.Stops.forEach(stop => {
  //     busDetail[el.Direction][stop.StopName['Zh_tw']] = {
  //         sequance: stop.StopSequence,
  //         position: [stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]
  //     };
  //     busDetail[`line${el.Direction}`].push([stop.StopPosition.PositionLat, stop.StopPosition.PositionLon]);
  // })
  //  if (busLine) {busLine.remove(map);};
  //           busLine = L.polyline(busDetail.line0, {color: '#355F8B'}).addTo(map);
  //
  // let stops = [];
  //           Object.keys(busDetail['0']).forEach(el => {
  //               stops[busDetail['0'][el].sequance - 1] = [el, busDetail['0'][el].position, busDetail['0'][el].time];
  //           })
  //           if (busMarkers) {busMarkers.remove(map);};
  //           let cardString = '';
  //           let markersObj = stops.map((el, index) => {
  //               let leftTime = Math.round(el[2] / 60);
  //               let status;
  //               if (el[2] === '1') {
  //                   status = ['over', '尚未發車'];
  //               } else if (el[2] < 30) {
  //                   status = ['coming', '進站中'];
  //               } else if (el[2] < 60) {
  //                   status = ['next', '即將進站'];
  //               } else {
  //                   status = ['continue', leftTime + ' 分'];
  //               }
  //               cardString +=
  //               `<div class="${status[0]}"><div>
  //                   <span>${status[1]}</span>
  //                   <span>${el[0]}</span>
  //               </div></div>`;
  //               return L.marker(el[1], {icon: busStopIcon}).bindPopup(`<b>${el[0]}</b><p>${leftTime} 分</p>`, normalPopupStyle);
  //           });
  //           document.querySelector('#bus-state-list').innerHTML = cardString;
  //           busMarkers = L.layerGroup(markersObj);
  //           map.addLayer(busMarkers);
  //           // 變更視角
  //           map.setView(stops[Math.round(stops.length / 2)][1], 13);
}

onMounted(() => {
  initMap()

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      if (lat && lon && mapObj) {
        L.marker([lat, lon], { icon: myLocationIcon }).addTo(mapObj)
        mapObj.setView([lat, lon], 12)
      }
    })
  }
})
</script>

<template>
  <div id="busMap" class="h-full w-full"></div>
</template>
