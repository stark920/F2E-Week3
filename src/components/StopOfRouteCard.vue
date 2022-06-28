<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/lang'
import type { busStop } from '@/types/interface'

const { t } = useI18n()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

defineProps<{
  data: busStop
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
  if (time === -1 || typeof time === 'undefined') {
    return 'bg-gray-500'
  } else if (time < 60) {
    return 'bg-secondary'
  } else {
    return 'bg-primary'
  }
}

const isArriving = (time: number) => {
  return time >= 0 && time < 30
}
</script>

<template>
  <div
    class="relative mx-4 flex items-center justify-between border-b-[1px] border-gray-500 py-4 pr-4 text-center duration-150 hover:bg-gray-300">
    <div class="flex-c">
      <div
        :class="timeToStyle(data.EstimateTime ?? -1)"
        class="mr-4 w-[5rem] flex-shrink-0 rounded-lg py-1 text-white">
        {{ timeToText(data.EstimateTime ?? -1, data.NextBusTime) }}
      </div>
      <div
        :class="{ 'font-bold': isArriving(data.EstimateTime ?? -1) }"
        class="whitespace-pre-wrap text-left">
        {{
          lang === 'zh-TW'
            ? data.StopName.Zh_tw
            : data.StopName.En ?? data.StopName.Zh_tw
        }}
      </div>
    </div>
    <div
      v-if="data.PlateNumb && data.PlateNumb !== '-1'"
      class="whitespace-nowrap p-1 font-bold text-secondary">
      {{ data.PlateNumb }}
    </div>
    <div class="absolute right-0 top-1/2 h-full w-[2px] bg-gray-500"></div>
    <div
      class="absolute right-[1px] h-3 w-3 translate-x-1/2 rounded-full bg-gray-500 ring-[2px] ring-white"></div>
  </div>
</template>
