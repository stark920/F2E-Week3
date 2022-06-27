<script setup lang="ts">
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import IconMap from './icons/IconMap.vue'
import VueEasyLightbox from 'vue-easy-lightbox'

import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/lang'
import { useLikesStore } from '@/stores/likes'

import type { nearbyStopOfRoute } from '@/types/interface'
import { ref } from 'vue'

const langStore = useLangStore()
const likesStore = useLikesStore()

const { t } = useI18n()
const { lang } = storeToRefs(langStore)
const { likeStops } = storeToRefs(likesStore)

defineProps<{
  data: nearbyStopOfRoute
}>()

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

function timeToStyle(time?: number) {
  if (time === -1 || !time) {
    return 'bg-gray-500'
  } else if (time < 60) {
    return 'bg-secondary'
  } else {
    return 'bg-primary'
  }
}

const showLightBox = ref(false)
</script>

<template>
  <div
    class="flex items-center rounded-t-lg border-b-[1px] border-gray-500 px-2 py-4 duration-150 hover:bg-gray-300">
    <div
      :class="timeToStyle(data.EstimateTime)"
      class="mr-4 w-[4rem] rounded-lg py-1 text-center text-white">
      {{ timeToText(data.EstimateTime, data.NextBusTime) }}
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <div class="flex-c">
          <span class="text-lg font-bold">{{
            lang === 'zh-TW'
              ? data.RouteName.Zh_tw
              : data.RouteName.En ?? data.RouteName.Zh_tw
          }}</span>
          <IconMap
            class="mx-1 h-5 w-5 cursor-pointer"
            @click="showLightBox = true"></IconMap>
        </div>
        <div class="cursor-pointer" @click="likesStore.toggleLikeStops(data)">
          <IconHeartFill
            v-if="
              likeStops.findIndex((el) => el.RouteUID === data.RouteUID) >= 0
            "
            class="h-5 w-5 text-secondary"></IconHeartFill>
          <IconHeart v-else class="h-5 w-5"></IconHeart>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-gray-600">
          {{ t('goTo') }}
          {{
            lang === 'zh-TW'
              ? data.DestinationStopNameZh
              : data.DestinationStopNameEn ?? data.DestinationStopNameZh
          }}
          <span
            v-if="data.PlateNumb"
            class="ml-1 whitespace-nowrap rounded-md bg-blue p-1 text-white"
            >{{ data.PlateNumb }}</span
          >
          <span
            v-if="data.IsLastBus"
            class="ml-1 whitespace-nowrap rounded-md bg-dark-green p-1 text-white"
            >{{ t('lastBus') }}</span
          >
        </div>
        <div class="text-gray-600">
          {{ t(`city.${data.City}`) }}
        </div>
      </div>
    </div>
  </div>
  <vue-easy-lightbox
    scroll-disabled
    esc-disabled
    move-disabled
    :visible="showLightBox"
    :imgs="data.RouteMapImageUrl"
    @hide="showLightBox = false"></vue-easy-lightbox>
</template>
