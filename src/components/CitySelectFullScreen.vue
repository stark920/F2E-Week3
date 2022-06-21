<script setup lang="ts">
import { useBusStore } from '@/stores/bus'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const busStore = useBusStore()
const { currentCity, displayBoard } = storeToRefs(busStore)
const selections = [
  'Taipei',
  'Taoyuan',
  'Taichung',
  'Tainan',
  'Kaohsiung',
  'Hsinchu',
  'MiaoliCounty',
  'ChanghuaCounty',
  'NantouCounty',
  'YunlinCounty',
  'Chiayi',
  'PingtungCounty',
  'YilanCounty',
  'HualienCounty',
  'TaitungCounty',
  'PenghuCounty',
  'KinmenCounty'
]
const changeView = () => {
  if (displayBoard.value !== 'CitySearchBoard') {
    displayBoard.value = 'CitySearchBoard'
  }
}
</script>

<template>
  <div
    class="flex-c absolute top-0 left-0 z-[1000] h-full w-full bg-[#00000050]">
    <div class="rounded bg-white p-8">
      <span>{{ t('selectCity') }}：</span>
      <select
        id="city"
        v-model="currentCity"
        name="city"
        class="rounded-lg border-none bg-transparent"
        @change="changeView">
        <option v-for="city in selections" :key="city" :value="city">
          {{ t(`select${city}`) }}
        </option>
      </select>
    </div>
  </div>
</template>
