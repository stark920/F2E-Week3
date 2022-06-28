<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import StationCard from './StationCard.vue'

import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { busApi } from '@/utils/api'
import { useLikesStore } from '@/stores/likes'
import { useMapStore } from '@/stores/map'

import type { nearbyStation } from '@/types/interface'

const { t } = useI18n()
const likesStore = useLikesStore()
const mapStore = useMapStore()
const { userPosition, nearbyStationsData } = storeToRefs(mapStore)

const emits = defineEmits(['showDetail'])

const keyWord = ref('')
const filterStation = computed(() => {
  if (!nearbyStationsData.value) return []

  return nearbyStationsData.value.filter((station: nearbyStation) => {
    if (station.StationName.Zh_tw.indexOf(keyWord.value) >= 0) {
      return station
    }
    if (
      station.StationName.En &&
      station.StationName.En.indexOf(keyWord.value) >= 0
    ) {
      return station
    }
  })
})

function saveStationToStore(station: nearbyStation) {
  mapStore.selectedStationData = station
  emits('showDetail')
}

onMounted(async () => {
  if (userPosition.value) {
    const lat = userPosition.value[0]
    const lng = userPosition.value[1]
    const data = await busApi.getNearbyStation(lat, lng)
    if (data) nearbyStationsData.value = data
  }
})

watch(userPosition, async (newPosition) => {
  if (newPosition) {
    const data = await busApi.getNearbyStation(newPosition[0], newPosition[1])
    if (data) nearbyStationsData.value = data
  }
})
</script>

<template>
  <section class="flex-c h-[3rem] flex-grow bg-white px-4">
    <div class="relative w-full rounded-lg bg-gray-300">
      <input
        v-model="keyWord"
        type="search"
        :placeholder="t('typeKeyword')"
        class="peer w-full border-0 bg-transparent py-1 focus:ring-0" />
      <IconSearch
        class="absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"></IconSearch>
    </div>
  </section>

  <div class="h-[calc(100%-3rem)] overflow-y-scroll bg-white px-4 pb-4">
    <StationCard
      v-for="(station, index) of filterStation"
      :key="index"
      :index="index"
      :uid="station.StationUID"
      :name="station.StationName.Zh_tw"
      :name-en="station.StationName.En ?? station.StationName.Zh_tw"
      :lat="station.StationPosition.PositionLat"
      :lng="station.StationPosition.PositionLon"
      :stops-num="station.StopsNum"
      @show-detail="saveStationToStore(station)"
      @toggle-like="likesStore.toggleLikeStations(station)">
    </StationCard>
  </div>
</template>
