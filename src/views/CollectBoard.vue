<script setup lang="ts">
import RouteCard from '@/components/RouteCard.vue'
import StationCard from '@/components/StationCard.vue'
import RouteDetail from '@/components/RouteDetail.vue'
import NearbyStationsDetail from '@/components/NearbyStationsDetail.vue'

import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useLikesStore } from '@/stores/likes'
import { useMapStore } from '@/stores/map'
import { useToast } from 'vue-toastification'
import { busApi } from '@/utils/api'
import type {
  routeList,
  nearbyStation,
  nearbyStopOfRoute
} from '@/types/interface'

const { t } = useI18n()
const toast = useToast()
const likesStore = useLikesStore()
const mapStore = useMapStore()
const { likeRoutes, likeStations } = storeToRefs(likesStore)

const routeSelections = (() => {
  if (likeRoutes.value.length === 0) {
    return []
  }
  const result = [] as string[]
  likeRoutes.value.forEach((route) => {
    if (!result.includes(route.City)) result.push(route.City)
  })
  return result
})()

const stationSelections = (() => {
  if (likeStations.value.length === 0) {
    return []
  }
  const result = [] as string[]
  likeStations.value.forEach((station) => {
    if (!result.includes(station.City)) result.push(station.City)
  })
  return result
})()

const filterRoutes = computed(() => {
  if (viewController.routeSelectedCity === 'All') return likeRoutes.value
  return likeRoutes.value.filter(
    (route) => route.City === viewController.routeSelectedCity
  )
})

const filterStations = computed(() => {
  if (viewController.stationSelectedCity === 'All') return likeStations.value
  return likeStations.value.filter(
    (stop) => stop.City === viewController.stationSelectedCity
  )
})

const viewController = reactive({
  displayView: 'route',
  routeSelectedCity: 'All',
  stationSelectedCity: 'All',
  routeData: {} as routeList,
  routeDetailData: {
    go: [],
    back: [],
    circle: []
  },
  stationDetailData: [] as nearbyStopOfRoute[],
  showLikeStations() {
    mapStore.nearbyStationsData = likeStations.value
    this.displayView = 'station'
  },
  async showRouteDetail(route: routeList) {
    const apiData = await busApi.getRouteWithArrivalTime(
      route.City,
      route.RouteName.Zh_tw
    )
    if (apiData) {
      this.routeDetailData = apiData
      this.routeData = route
      this.displayView = 'route-detail'
    } else {
      toast.error('取得資料失敗，請稍後再試')
    }
  },
  showStopDetail(station: nearbyStation) {
    mapStore.selectedStationData = station
    this.displayView = 'station-detail'
  }
})
</script>

<template>
  <div
    v-if="['route', 'station'].includes(viewController.displayView)"
    class="flex h-full w-full flex-col">
    <section class="flex h-[4rem] items-end justify-center">
      <h3 class="text-xl font-bold">{{ t('page.collect') }}</h3>
    </section>

    <section class="flex-c h-[4rem]">
      <select
        v-if="viewController.displayView === 'route'"
        v-model="viewController.routeSelectedCity"
        class="rounded-md border-none bg-gray-300 py-1 text-gray-700 focus:ring-0">
        <option value="All">{{ t('allCity') }}</option>
        <option v-for="city in routeSelections" :key="city" :value="city">
          {{ t(`city.${city}`) }}
        </option>
      </select>
      <select
        v-if="viewController.displayView === 'station'"
        v-model="viewController.stationSelectedCity"
        class="rounded-md border-none bg-gray-300 py-1 text-gray-700 focus:ring-0">
        <option value="All">{{ t('allCity') }}</option>
        <option v-for="city in stationSelections" :key="city" :value="city">
          {{ t(`city.${city}`) }}
        </option>
      </select>
    </section>

    <section class="flex h-[3rem]">
      <label class="flex-grow" @change="viewController.displayView = 'route'">
        <input type="radio" name="direction" class="peer hidden" checked />
        <div
          class="flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white">
          {{ t('collect.route') }}
        </div>
      </label>
      <label class="flex-grow" @change="viewController.showLikeStations">
        <input type="radio" name="direction" class="peer hidden" />
        <div
          class="flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white">
          {{ t('collect.station') }}
        </div>
      </label>
    </section>

    <div class="h-[calc(100%-9rem)] overflow-y-scroll px-2">
      <template v-if="viewController.displayView === 'route'">
        <RouteCard
          v-for="route in filterRoutes"
          :key="route.RouteUID"
          :data="route"
          @click="viewController.showRouteDetail(route)"></RouteCard>
      </template>
      <template v-else-if="viewController.displayView === 'station'">
        <StationCard
          v-for="(station, index) of filterStations"
          :key="station.StationUID"
          :index="index"
          :uid="station.StationUID"
          :name="station.StationName.Zh_tw"
          :name-en="station.StationName.En ?? station.StationName.Zh_tw"
          :lat="station.StationPosition.PositionLat"
          :lng="station.StationPosition.PositionLon"
          :stops-num="station.StopsNum"
          @click="viewController.showStopDetail(station)"
          @toggle-like="likesStore.toggleLikeStations(station)">
        </StationCard>
      </template>
    </div>
  </div>

  <div v-else class="flex h-full w-full flex-col">
    <template v-if="viewController.displayView === 'route-detail'">
      <RouteDetail
        :route="viewController.routeData"
        :data="viewController.routeDetailData"
        @update-detail="viewController.showRouteDetail"
        @close-detail="viewController.displayView = 'route'"></RouteDetail>
    </template>
    <template v-if="viewController.displayView === 'station-detail'">
      <NearbyStationsDetail
        @close-detail="
          viewController.displayView = 'station'
        "></NearbyStationsDetail>
    </template>
  </div>
</template>
