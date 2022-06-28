<script setup lang="ts">
import IconImage from './icons/IconImage.vue'
import VueEasyLightbox from 'vue-easy-lightbox'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/lang'

const { t } = useI18n()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

defineProps<{
  showEstimateInfo: boolean
  nextBus: string
  plateNumb: string
  isLast: boolean
  time: number
  name: string
  nameEn: string
  dep: string
  depEn: string
  dst: string
  dstEn: string
  image: string
  city: string
}>()

const showLightBox = ref(false)

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
</script>

<template>
  <div
    class="flex items-center rounded-t-lg border-b-[1px] border-gray-500 px-2 py-4 duration-150 hover:bg-gray-300">
    <div
      v-if="showEstimateInfo"
      :class="timeToStyle(time)"
      class="mr-4 w-[4rem] rounded-lg py-1 text-center text-white">
      {{ timeToText(time, nextBus) }}
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
        <div class="text-lg font-bold">
          {{ lang === 'zh-TW' ? name : nameEn }}
        </div>
        <div
          class="flex-c cursor-pointer hover:underline"
          @click="showLightBox = true">
          <IconImage class="mr-1 h-4 w-4"></IconImage>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-gray-600">
          {{ t('goTo') }}
          {{ lang === 'zh-TW' ? dst : dstEn }}
          <template v-if="showEstimateInfo">
            <span
              v-if="plateNumb"
              class="ml-1 whitespace-nowrap rounded-md bg-blue p-1 text-white"
              >{{ plateNumb }}</span
            >
            <span
              v-if="isLast"
              class="ml-1 whitespace-nowrap rounded-md bg-dark-green p-1 text-white"
              >{{ t('lastBus') }}</span
            >
          </template>
        </div>
        <div class="whitespace-nowrap text-gray-600">
          {{ t(`city.${city}`) }}
        </div>
      </div>
    </div>
  </div>
  <vue-easy-lightbox
    scroll-disabled
    esc-disabled
    move-disabled
    :visible="showLightBox"
    :imgs="image"
    @hide="showLightBox = false"></vue-easy-lightbox>
</template>
