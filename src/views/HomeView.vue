<script setup lang="ts">
import IconBus from '@/components/icons/IconBus.vue'
import { useRouter } from 'vue-router'
import { useBusStore } from '@/stores/bus'
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
const router = useRouter()
const busStore = useBusStore()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

const cities = [
  {
    ch: '台北市 / 新北市',
    en: 'Taipei / New Taipei',
    value: 'Taipei',
    color: 'black'
  },
  {
    ch: '桃園市',
    en: 'Taoyuan',
    value: 'Taoyuan',
    color: 'blue'
  },
  {
    ch: '台中市',
    en: 'Taichung',
    value: 'Taichung',
    color: 'secondary'
  },
  {
    ch: '台南市',
    en: 'Tainan',
    value: 'Tainan',
    color: 'green'
  },
  {
    ch: '高雄市',
    en: 'Kaohsiung',
    value: 'Kaohsiung',
    color: 'teal'
  },
  {
    ch: '其他地區',
    en: 'Other City',
    value: '',
    color: 'dark-green'
  }
]

const toCityPage = (value: string) => {
  busStore.displayBoard = 'CitySearchBoard'
  busStore.currentCity = value
  router.push({ name: 'city' })
}
</script>

<template>
  <div class="flex h-full w-full flex-col justify-around gap-4 pb-4">
    <section class="relative w-full flex-grow overflow-hidden">
      <img
        src="@/assets/banner.webp"
        alt="banner"
        class="h-full w-full object-cover" />
      <div
        class="absolute left-[10%] top-[50%] z-10 -translate-y-[50%] text-xl tracking-widest text-white lg:[writing-mode:vertical-lr]">
        <p class="mr-4 font-thin lg:-mt-8">TAIWAN BUS+</p>
        <p class="mr-4 text-2xl font-normal tracking-[0.6rem] lg:-mt-8">
          臺灣公車動態
        </p>
        <p class="text-2xl font-bold tracking-[0.6rem]">時刻查詢系統</p>
      </div>
    </section>
    <section class="grid w-full grid-cols-2 gap-4 px-4 lg:grid-cols-6">
      <div
        v-for="(city, index) of cities"
        :key="index"
        :class="`text-${city.color} ring-${city.color}`"
        class="flex-c flex-1 cursor-pointer flex-col rounded-lg bg-white p-6 duration-200 hover:ring-2 active:ring-2 lg:aspect-square"
        @click="toCityPage(city.value)">
        <IconBus :class="`text-${city.color} ring-${city.color}`"></IconBus>
        <p>{{ lang === 'zh-TW' ? city.ch : city.en }}</p>
        <small>{{ lang === 'zh-TW' ? city.en : city.ch }}</small>
      </div>
    </section>
  </div>
</template>
