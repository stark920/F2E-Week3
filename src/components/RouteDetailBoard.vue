<script setup lang="ts">
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import IconLeft from './icons/IconLeft.vue'
import IconRefresh from './icons/IconRefresh.vue'
import StopInfoCard from './StopInfoCard.vue'
import { useI18n } from 'vue-i18n'
import { busApi } from '@/utils/api'
import { computed, onMounted, reactive, type ComputedRef } from 'vue'
import { useLangStore } from '@/stores/lang'
import { useBusStore } from '@/stores/bus'
import { useLikesStore } from '@/stores/likes'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
const { t } = useI18n()
const toast = useToast()
const langStore = useLangStore()
const busStore = useBusStore()
const likeStore = useLikesStore()
const { lang } = storeToRefs(langStore)
const { likeRoutes } = storeToRefs(likeStore)

let timerCounter: number | undefined
const refreshData = reactive({
  timer: 30,
  autoMode: false,
  toggleAutoMode() {
    this.autoMode = !this.autoMode
    if (this.autoMode) {
      timerCounter = setInterval(() => {
        this.timer -= 1
        if (this.timer < 0) {
          this.timer = 30
          getRouteData()
        }
      }, 1000)
    } else {
      clearInterval(timerCounter)
      this.timer = 30
    }
  }
})

interface busStop {
  StopUID: string
  StopName: {
    Zh_tw: string
    En: string
  }
  EstimateTime?: number
  StopPosition: {
    PositionLon: number
    PositionLat: number
  }
  PlateNumb: string
}

const stopsData = reactive({
  forward: [] as busStop[],
  backward: [] as busStop[],
  direction: true
})
const currentStops: ComputedRef<busStop[]> = computed(() => {
  return stopsData.direction ? stopsData.forward : stopsData.backward
})

const getRouteData = async () => {
  const data = await busApi.getRouteWithArrivalTime()
  if (!data) {
    toast.error('無法取得資料，請稍後再試')
    return
  }
  stopsData.forward = data.forward
  stopsData.backward = data.backward
  busStore.currentStops = currentStops.value
}

const backToSearchBoard = () => {
  busStore.displayBoard = 'CitySearchBoard'
}

const toggleLike = () => {
  const data = { ...busStore.currentRoute }
  likeStore.toggleLikeRoutes(data)
}

onMounted(() => {
  getRouteData()
})
</script>

<template>
  <section class="flex h-[2rem] items-center justify-between px-2">
    <button type="button" class="flex-c" @click="backToSearchBoard">
      <IconLeft></IconLeft>
      <span class="ml-1">{{ t('back') }}</span>
    </button>
    <div class="flex-c cursor-pointer" @click="toggleLike">
      <IconHeartFill
        v-if="
          likeRoutes.findIndex((el) => el.uid === busStore.currentRoute.uid) >=
          0
        "
        class="h-5 w-5 text-secondary"></IconHeartFill>
      <IconHeart v-else class="h-5 w-5"></IconHeart>
    </div>
  </section>

  <section class="flex h-[8rem] flex-col">
    <div class="flex-c flex-grow flex-col text-center">
      <h3 class="text-4xl font-bold">
        {{
          lang === 'zh-TW'
            ? busStore.currentRoute.name
            : busStore.currentRoute.nameEn
        }}
      </h3>
      <small>
        {{
          lang === 'zh-TW'
            ? busStore.currentRoute.nameEn
            : busStore.currentRoute.name
        }}
      </small>
    </div>
    <div class="flex">
      <label class="flex-1" @change="stopsData.direction = true">
        <input
          id="forward"
          type="radio"
          name="direct"
          class="peer hidden"
          checked />
        <div
          class="cursor-pointer rounded-t-md bg-gray-300 py-2 text-center peer-checked:bg-primary peer-checked:text-white">
          {{ lang === 'zh-TW' ? '往' : 'To' }}
          <strong>
            {{
              lang === 'zh-TW'
                ? busStore.currentRoute.departure
                : busStore.currentRoute.departureEn
            }}
          </strong>
        </div>
      </label>
      <label class="flex-1" @change="stopsData.direction = false">
        <input id="backward" type="radio" name="direct" class="peer hidden" />
        <div
          class="cursor-pointer rounded-t-md bg-gray-300 py-2 text-center peer-checked:bg-primary peer-checked:text-white">
          {{ lang === 'zh-TW' ? '往' : 'To' }}
          <strong>
            {{
              lang === 'zh-TW'
                ? busStore.currentRoute.destination
                : busStore.currentRoute.destinationEn
            }}
          </strong>
        </div>
      </label>
    </div>
  </section>

  <section class="h-[calc(100%-13rem)] overflow-y-scroll pb-8 pt-4">
    <StopInfoCard
      v-for="stop in currentStops"
      :key="stop.StopUID"
      :time="stop?.EstimateTime ?? -1"
      :name="stop.StopName.Zh_tw"
      :name-en="stop.StopName.En"
      :plate-numb="stop?.PlateNumb ?? '234'"></StopInfoCard>
  </section>

  <section class="relative mx-4 flex h-[3rem] items-center justify-between">
    <div class="absolute top-0 h-[2px] w-full bg-gray-300">
      <div
        class="absolute left-0 h-[2px] bg-primary"
        :class="{ 'process-line': refreshData.autoMode }"></div>
    </div>
    <div class="flex-c mt-[1px]">
      <input
        type="checkbox"
        :checked="refreshData.autoMode"
        @change="refreshData.toggleAutoMode" />
      <span class="ml-1">{{ t('refreshAuto') }}</span>
      <span v-show="refreshData.autoMode"
        >（{{ t('afterTime') }} {{ refreshData.timer }}
        {{ t('second') }}）</span
      >
    </div>
    <div class="flex-c cursor-pointer" @click="getRouteData">
      <IconRefresh></IconRefresh>
      <span class="ml-1">{{ t('refreshNow') }}</span>
    </div>
  </section>
</template>

<style scoped>
.process-line {
  animation: 30s width0-100 linear infinite;
}
@keyframes width0-100 {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
