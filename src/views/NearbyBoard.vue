<script setup lang="ts">
import IconGlobe from '@/components/icons/IconGlobe.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconLeft from '@/components/icons/IconLeft.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import NearbyCard from '@/components/NearbyCard.vue'
import NearbyDetail from '@/components/NearbyDetail.vue'

import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { onMounted, watch, computed, ref, reactive } from 'vue'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import { busApi } from '@/utils/api'

import type { nearbyStopOfRoute } from '@/types/interface'

const { t } = useI18n()
const toast = useToast()
const mapStore = useMapStore()
const langStore = useLangStore()

const { userPosition, nearbyStation } = storeToRefs(mapStore)
const { lang } = storeToRefs(langStore)

const keyWord = ref('')
const filterStation = computed(() => {
  if (!nearbyStation.value) return []

  return nearbyStation.value.filter((station) => {
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

const nearbyStationDetail = reactive({
  isShow: false,
  name: '',
  nameEn: '',
  data: [] as nearbyStopOfRoute[],
  async show(id: string, city: string, name: string, nameEn: string) {
    const data = await busApi.getNearbyStationWithArrival(id, city)
    if (data) {
      detailRefresher.currentID = id
      detailRefresher.currenCity = city
      this.name = name
      this.nameEn = nameEn
      this.data = data
      this.isShow = true
    } else {
      toast.error('無法取得資料，請稍後再試')
    }
  },
  closeShow() {
    if (detailRefresher.intervalContainer) {
      clearInterval(detailRefresher.intervalContainer)
    }
    this.isShow = false
  }
})

const detailRefresher = reactive({
  currentID: '',
  currenCity: '',
  timer: 30,
  intervalContainer: undefined as number | undefined,
  autoMode: false,
  toggleAutoMode() {
    this.autoMode = !this.autoMode
    if (this.autoMode) {
      this.intervalContainer = setInterval(() => {
        this.timer -= 1
        if (this.timer < 0) {
          this.timer = 30
          this.updateData()
        }
      }, 1000)
    } else {
      clearInterval(this.intervalContainer)
      this.timer = 30
    }
  },
  async updateData() {
    if (!this.currentID || !this.currenCity) return
    const data = await busApi.getNearbyStationWithArrival(
      this.currentID,
      this.currenCity
    )
    if (data) nearbyStationDetail.data = data
  }
})

onMounted(() => {
  if (!navigator.geolocation) {
    return toast.error('您的瀏覽器未支援定位功能')
  }

  function success(position: {
    coords: { latitude: number; longitude: number }
  }) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    mapStore.changeUserPosition(lat, lng)
  }

  function error() {
    mapStore.updateNearByStation([])
    toast.error('無法取得您的定位資訊')
  }

  navigator.geolocation.getCurrentPosition(success, error)
})

watch(userPosition, async (newPosition) => {
  if (newPosition) {
    const data = await busApi.getNearbyStation(newPosition[0], newPosition[1])
    if (data) mapStore.updateNearByStation(data)
  }
})
</script>

<template>
  <section v-if="!nearbyStation" class="flex-c h-full text-gray-400">
    <IconGlobe class="mr-2 h-6 w-6 animate-spin"></IconGlobe>
    {{
      lang === 'zh-TW' ? '正在取得您的位置資訊...' : 'Getting your location...'
    }}
  </section>

  <section v-else class="flex h-full w-full flex-col">
    <template v-if="!nearbyStationDetail.isShow">
      <div class="flex-c h-[4rem] flex-grow bg-white px-4">
        <div class="relative w-full rounded-lg bg-gray-300">
          <input
            v-model="keyWord"
            type="search"
            :placeholder="t('typeKeyword')"
            class="peer w-full border-0 bg-transparent focus:ring-0" />
          <IconSearch
            class="absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"></IconSearch>
        </div>
      </div>

      <div class="h-[calc(100%-4rem)] overflow-y-scroll bg-white px-4 pb-4">
        <NearbyCard
          v-for="(station, index) of filterStation"
          :key="index"
          :data="station"
          :index="index"
          @display-detail="
            nearbyStationDetail.show(
              station.StationID,
              station.City,
              station.StationName.Zh_tw,
              station.StationName.En ?? station.StationName.Zh_tw
            )
          ">
        </NearbyCard>
      </div>
    </template>

    <template v-else>
      <section class="h-full bg-white">
        <div class="flex h-[2rem] items-center justify-between px-2">
          <button
            type="button"
            class="flex-c"
            @click="nearbyStationDetail.closeShow">
            <IconLeft></IconLeft>
            <span class="ml-1">{{ t('back') }}</span>
          </button>
        </div>

        <h3 class="flex-c h-[6rem] px-4 text-2xl font-bold">
          {{
            lang === 'zh-TW'
              ? nearbyStationDetail.name
              : nearbyStationDetail.nameEn
          }}
        </h3>

        <div class="flex h-[calc(100%-11rem)] flex-col overflow-y-auto px-4">
          <NearbyDetail
            v-for="(route, index) of nearbyStationDetail.data"
            :key="index"
            :data="route">
          </NearbyDetail>
        </div>

        <div class="relative mx-4 flex h-[3rem] items-center justify-between">
          <div class="absolute top-0 h-[2px] w-full bg-gray-300">
            <div
              class="absolute left-0 h-[2px] bg-primary"
              :class="{ 'process-line': detailRefresher.autoMode }"></div>
          </div>
          <div class="flex-c mt-[1px]">
            <input
              type="checkbox"
              :checked="detailRefresher.autoMode"
              @change="detailRefresher.toggleAutoMode" />
            <span class="ml-1">{{ t('refreshAuto') }}</span>
            <span v-show="detailRefresher.autoMode"
              >（{{ t('afterTime') }} {{ detailRefresher.timer }}
              {{ t('second') }}）</span
            >
          </div>
          <div
            class="flex-c cursor-pointer"
            @click="detailRefresher.updateData">
            <IconRefresh></IconRefresh>
            <span class="ml-1">{{ t('refreshNow') }}</span>
          </div>
        </div>
      </section>
    </template>
  </section>
</template>
