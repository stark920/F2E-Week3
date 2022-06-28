<script setup lang="ts">
import IconLocation from './icons/IconLocation.vue'
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import { storeToRefs } from 'pinia'
import { useLikesStore } from '@/stores/likes'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'

const likesStore = useLikesStore()
const mapStore = useMapStore()
const langStore = useLangStore()
const { likeStations } = storeToRefs(likesStore)
const { lang } = storeToRefs(langStore)

const props = defineProps<{
  uid: string
  index: number
  name: string
  nameEn: string
  lat: number
  lng: number
  stopsNum: number
}>()

const emits = defineEmits(['showDetail', 'toggleLike'])

const changeView = () => {
  const lat = props.lat
  const lng = props.lng
  mapStore.changeViewPosition(lat, lng)
  mapStore.focusStopIndex = props.index
  emits('showDetail')
}

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
</script>

<template>
  <div
    class="cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100"
    @click="changeView">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-lg font-bold">
        {{ lang === 'zh-TW' ? name : nameEn }}
      </div>
      <div class="cursor-pointer" @click.stop="$emit('toggleLike')">
        <IconHeartFill
          v-if="likeStations.findIndex((el) => el.StationUID === uid) >= 0"
          class="h-5 w-5 text-secondary"></IconHeartFill>
        <IconHeart v-else class="h-5 w-5"></IconHeart>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <small>
        {{ lang === 'zh-TW' ? `${stopsNum} 個站牌` : `${stopsNum} stops` }}
      </small>
      <div v-if="getDistance(lat, lng)" class="flex-c text-gray-600">
        <IconLocation class="mr-1 h-4 w-4"></IconLocation>
        <span class="whitespace-pre">
          {{ `${getDistance(lat, lng)} m` }}
        </span>
      </div>
    </div>
  </div>
</template>
