<script setup lang="ts">
import IconLeft from './icons/IconLeft.vue'
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import IconRefresh from './icons/IconRefresh.vue'
import StationDetailCard from './StationDetailCard.vue'

import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { useLangStore } from '@/stores/lang'
import { useLikesStore } from '@/stores/likes'
import { busApi } from '@/utils/api'
import type { nearbyStopOfRoute } from '@/types/interface'

const toast = useToast()
const mapStore = useMapStore()
const langStore = useLangStore()
const likesStore = useLikesStore()

const { t } = useI18n()
const { lang } = storeToRefs(langStore)
const { selectedStationData } = storeToRefs(mapStore)
const { likeStations } = storeToRefs(likesStore)

const emits = defineEmits(['closeDetail'])

function toggleLikeStations() {
  if (selectedStationData.value) {
    likesStore.toggleLikeStations(selectedStationData.value)
  }
}

const dataController = reactive({
  id: '',
  city: '',
  data: [] as nearbyStopOfRoute[],
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
    if (!this.id || !this.city) return
    const data = await busApi.getNearbyStationWithArrival(this.id, this.city)
    data ? (this.data = data) : toast.error('無法取得資料，請稍後再試')
  }
})

onMounted(() => {
  if (selectedStationData.value) {
    dataController.id = selectedStationData.value.StationID
    dataController.city = selectedStationData.value.City
    dataController.updateData()
  } else {
    toast.error('資料異常')
    emits('closeDetail')
  }
})

onBeforeUnmount(() => {
  if (dataController.intervalContainer) {
    clearInterval(dataController.intervalContainer)
  }
})
</script>

<template>
  <div class="h-full w-full">
    <section class="flex h-[2rem] items-center justify-between px-2">
      <button type="button" class="flex-c" @click="$emit('closeDetail')">
        <IconLeft></IconLeft>
        <span class="ml-1">{{ t('back') }}</span>
      </button>
    </section>

    <section
      v-if="selectedStationData"
      class="flex items-center justify-between px-4">
      <h3 class="flex-c h-[6rem] px-4 text-2xl font-bold">
        {{
          lang === 'zh-TW'
            ? selectedStationData.StationName.Zh_tw
            : selectedStationData.StationName.En ??
              selectedStationData.StationName.Zh_tw
        }}
      </h3>

      <div class="cursor-pointer" @click="toggleLikeStations">
        <IconHeartFill
          v-if="
            likeStations.findIndex(
              (el) => el.StationUID === selectedStationData?.StationUID
            ) >= 0
          "
          class="h-5 w-5 text-secondary"></IconHeartFill>
        <IconHeart v-else class="h-5 w-5"></IconHeart>
      </div>
    </section>

    <div class="flex h-[calc(100%-11rem)] flex-col overflow-y-auto px-4">
      <StationDetailCard
        v-for="route of dataController.data"
        :key="route.RouteUID"
        :show-estimate-info="true"
        :next-bus="route.PlateNumb ?? ''"
        :is-last="route.IsLastBus ?? false"
        :plate-numb="route.PlateNumb ?? ''"
        :time="route.EstimateTime ?? -1"
        :name="route.RouteName.Zh_tw"
        :name-en="route.RouteName.En ?? route.RouteName.Zh_tw"
        :dep="route.DepartureStopNameZh"
        :dep-en="route.DepartureStopNameEn ?? route.DepartureStopNameZh"
        :dst="route.DestinationStopNameZh"
        :dst-en="route.DestinationStopNameEn ?? route.DestinationStopNameZh"
        :image="route.RouteMapImageUrl ?? ''"
        :city="route.City">
      </StationDetailCard>
    </div>

    <div class="relative mx-4 flex h-[3rem] items-center justify-between">
      <div class="absolute top-0 h-[2px] w-full bg-gray-300">
        <div
          class="absolute left-0 h-[2px] bg-primary"
          :class="{ 'process-line': dataController.autoMode }"></div>
      </div>
      <div class="flex-c mt-[1px]">
        <input
          type="checkbox"
          :checked="dataController.autoMode"
          @change="dataController.toggleAutoMode" />
        <span class="ml-1">{{ t('refreshAuto') }}</span>
        <span v-show="dataController.autoMode"
          >（{{ t('afterTime') }} {{ dataController.timer }}
          {{ t('second') }}）</span
        >
      </div>
      <div class="flex-c cursor-pointer" @click="dataController.updateData">
        <IconRefresh></IconRefresh>
        <span class="ml-1">{{ t('refreshNow') }}</span>
      </div>
    </div>
  </div>
</template>
