<script setup lang="ts">
import IconLocation from './icons/iconLocation.vue'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import type { nearbyStation } from '@/types/interface'

const mapStore = useMapStore()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

const props = defineProps<{
  index: number
  data: nearbyStation
}>()

const emit = defineEmits(['displayDetail'])

const getDistance = (lat1: number, lon1: number) => {
  const userPosition = mapStore.userPosition
  if (!userPosition) {
    return ''
  }
  const lat2 = userPosition[0]
  const lon2 = userPosition[1]
  if (lat1 == lat2 && lon1 == lon2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515 * 1609.344

    return dist.toFixed(0)
  }
}

const changeView = (lat: number, long: number) => {
  mapStore.changeViewPosition(lat, long)
  mapStore.focusStopIndex = props.index
  emit(
    'displayDetail',
    props.data.StationID,
    props.data.City,
    props.data.StationName.Zh_tw,
    props.data.StationName.En ?? props.data.StationName.Zh_tw
  )
}
</script>
<template>
  <div
    class="cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100"
    @click="
      changeView(
        data.StationPosition.PositionLat,
        data.StationPosition.PositionLon
      )
    ">
    <div class="mb-2 flex items-center justify-between">
      <div>
        <div class="text-lg font-bold">
          {{
            lang === 'zh-TW'
              ? data.StationName.Zh_tw
              : data.StationName.En ?? data.StationName.Zh_tw
          }}
        </div>
        <small>
          {{
            lang === 'zh-TW'
              ? `${data.StopsNum} 個站牌`
              : `${data.StopsNum} stops`
          }}
        </small>
      </div>
      <div class="flex-c text-gray-600">
        <IconLocation class="m-5 mr-1 h-5"></IconLocation>
        <span class="whitespace-pre">
          {{
            `${getDistance(
              data.StationPosition.PositionLat,
              data.StationPosition.PositionLon
            )} m`
          }}
        </span>
      </div>
    </div>
  </div>
</template>
