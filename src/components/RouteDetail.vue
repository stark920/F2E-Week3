<script setup lang="ts">
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import IconLeft from './icons/IconLeft.vue'
import IconRefresh from './icons/IconRefresh.vue'
import StopCard from './StopCard.vue'

import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import { useLikesStore } from '@/stores/likes'
import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'
import type { busStop, routeList } from '@/types/interface'
import { computed } from 'vue'

const { t } = useI18n()
const langStore = useLangStore()
const likeStore = useLikesStore()
const mapStore = useMapStore()
const { lang } = storeToRefs(langStore)
const { likeRoutes } = storeToRefs(likeStore)

const props = defineProps<{
  route: routeList
  data: {
    go: busStop[]
    back: busStop[]
    circle: busStop[]
  }
}>()

const emits = defineEmits(['closeDetail', 'updateDetail'])

const refreshController = reactive({
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
          emits('updateDetail', props.route)
        }
      }, 1000)
    } else {
      clearInterval(this.intervalContainer)
      this.timer = 30
    }
  }
})

const showRoutes = reactive({
  currentDirection: 0,
  data: computed(() => {
    switch (showRoutes.currentDirection) {
      case 0:
        return props.data.go
      case 1:
        return props.data.back
      case 2:
        return props.data.circle
      default:
        return []
    }
  })
})

function timeToText(time: number, nextBus?: string) {
  if (time === -1) {
    return nextBus ? getTime(nextBus) : t('noDeparture')
  }

  if (time < 30) {
    return t('arriving')
  } else if (time < 60) {
    return t('upcoming')
  } else {
    const num = (time / 60).toFixed(0)
    return t('minute', { num })
  }
}

function getTime(data: string) {
  const date = new Date(data)
  const hour = date.getHours()
  const min = date.getMinutes()
  return `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}`
}

const createMapRouteData = () => {
  const currentData = showRoutes.data
  const mapRouteData = currentData.map((data: busStop) => {
    const formateData = {
      TimeString: timeToText(data.EstimateTime ?? -1, data.NextBusTime),
      StopName: data.StopName,
      StopPosition: {
        PositionLon: data.StopPosition.PositionLon,
        PositionLat: data.StopPosition.PositionLat
      }
    }
    return formateData
  })
  mapStore.routeLine = mapRouteData
}

onMounted(() => {
  if (props.data.go.length > 0) {
    showRoutes.currentDirection = 0
  } else if (props.data.back.length > 0) {
    showRoutes.currentDirection = 1
  } else {
    showRoutes.currentDirection = 2
  }
  createMapRouteData()
})

onBeforeUnmount(() => {
  if (refreshController.intervalContainer) {
    clearInterval(refreshController.intervalContainer)
  }
})
</script>

<template>
  <section class="flex h-[2rem] items-center justify-between px-2">
    <button type="button" class="flex-c" @click="$emit('closeDetail')">
      <IconLeft></IconLeft>
      <span class="ml-1">{{ t('back') }}</span>
    </button>
    <div class="cursor-pointer" @click="likeStore.toggleLikeRoutes(route)">
      <IconHeartFill
        v-if="likeRoutes.findIndex((el) => el.RouteUID === route.RouteUID) >= 0"
        class="h-5 w-5 text-secondary"></IconHeartFill>
      <IconHeart v-else class="h-5 w-5"></IconHeart>
    </div>
  </section>

  <section class="flex-c h-[6rem] flex-col">
    <h3 class="text-4xl font-bold">
      {{
        lang === 'zh-TW'
          ? route.RouteName.Zh_tw
          : route.RouteName.En ?? route.RouteName.Zh_tw
      }}
    </h3>
    <small> {{ route.RouteName.En ?? route.RouteName.Zh_tw }} </small>
  </section>

  <section class="flex h-[2rem]">
    <label
      v-if="data.go.length > 0"
      class="flex-grow"
      @change="showRoutes.currentDirection = 0">
      <input type="radio" name="direction" class="peer hidden" checked />
      <div
        class="cursor-pointer rounded-t-md bg-gray-300 py-2 text-center peer-checked:bg-primary peer-checked:text-white">
        {{ t('goTo') }}
        <strong>
          {{
            lang === 'zh-TW'
              ? route.DepartureStopNameZh
              : route.DepartureStopNameEn ?? route.DepartureStopNameZh
          }}
        </strong>
      </div>
    </label>
    <label
      v-if="data.back.length > 0"
      class="flex-grow"
      @change="showRoutes.currentDirection = 1">
      <input type="radio" name="direction" class="peer hidden" />
      <div
        class="cursor-pointer rounded-t-md bg-gray-300 py-2 text-center peer-checked:bg-primary peer-checked:text-white">
        {{ t('goTo') }}
        <strong>
          {{
            lang === 'zh-TW'
              ? route.DestinationStopNameZh
              : route.DestinationStopNameEn ?? route.DestinationStopNameZh
          }}
        </strong>
      </div>
    </label>
    <label
      v-if="data.circle.length > 0"
      class="flex-grow"
      @change="showRoutes.currentDirection = 2">
      <input type="radio" name="direction" class="peer hidden" checked />
      <div
        class="cursor-pointer rounded-t-md bg-gray-300 py-2 text-center peer-checked:bg-primary peer-checked:text-white">
        <strong>
          {{
            lang === 'zh-TW'
              ? route.DepartureStopNameZh
              : route.DepartureStopNameEn ?? route.DepartureStopNameZh
          }}
          <span> | </span>
          {{
            lang === 'zh-TW'
              ? route.DestinationStopNameZh
              : route.DestinationStopNameEn ?? route.DestinationStopNameZh
          }}
        </strong>
      </div>
    </label>
  </section>

  <section class="h-[calc(100%-13rem)] overflow-y-scroll pb-8 pt-4">
    <StopCard
      v-for="stop in showRoutes.data"
      :key="stop.StopUID"
      :data="stop"></StopCard>
  </section>

  <section class="relative mx-4 flex h-[3rem] items-center justify-between">
    <div class="absolute top-0 h-[2px] w-full bg-gray-300">
      <div
        class="absolute left-0 h-[2px] bg-primary"
        :class="{ 'process-line': refreshController.autoMode }"></div>
    </div>
    <div class="flex-c mt-[1px]">
      <input
        type="checkbox"
        :checked="refreshController.autoMode"
        @change="refreshController.toggleAutoMode" />
      <span class="ml-1">{{ t('refreshAuto') }}</span>
      <span v-show="refreshController.autoMode"
        >（{{ t('afterTime') }} {{ refreshController.timer }}
        {{ t('second') }}）</span
      >
    </div>
    <div class="flex-c cursor-pointer" @click="$emit('updateDetail', route)">
      <IconRefresh></IconRefresh>
      <span class="ml-1">{{ t('refreshNow') }}</span>
    </div>
  </section>
</template>
