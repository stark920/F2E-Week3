<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/lang'
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

defineProps<{
  time: number
  name: string
  nameEn: string
  plateNumb: string
}>()

const timeToInfo = (time: number) => {
  if (time === -1) {
    return '未發車'
  } else if (time > 1800) {
    const now = Date.now()
    const date = new Date(now + time * 1000)
    const hour = date.getHours()
    const min = date.getMinutes()
    return `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}`
  } else if (time < 30) {
    return '進站中'
  } else if (time < 60) {
    return '即將進站'
  } else {
    return `${(time / 60).toFixed(0)} 分`
  }
}

const timeToState = (time: number) => {
  if (time === -1 || time > 1800) {
    return 'bg-gray-500'
  } else if (time < 60) {
    return 'bg-secondary'
  } else {
    return 'bg-primary'
  }
}

const isArriving = (time: number, value?: string) => {
  time >= 0 && time < 30 ? value ?? true : false
}
</script>

<template>
  <div
    class="relative mx-4 flex items-center justify-between border-b-[1px] border-gray-500 py-4 pr-4 text-center duration-150 hover:bg-gray-300">
    <div class="flex-c">
      <div
        :class="timeToState(time)"
        class="mr-4 w-[5rem] rounded-lg py-1 text-white">
        {{ timeToInfo(time) }}
      </div>
      <div :class="{ 'font-extrabold': isArriving(time) }">
        {{ lang === 'zh-TW' ? name : nameEn }}
      </div>
    </div>
    <div class="font-bold text-secondary">
      {{ isArriving(time, plateNumb) }}
    </div>
    <div class="absolute right-0 top-1/2 h-full w-[2px] bg-gray-500"></div>
    <div
      class="absolute right-[1px] h-3 w-3 translate-x-1/2 rounded-full bg-gray-500 ring-[2px] ring-white"></div>
  </div>
</template>
