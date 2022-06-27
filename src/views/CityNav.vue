<script setup lang="ts">
import BreadCrumb from '@/components/BreadCrumb.vue'

import { useBusStore } from '@/stores/bus'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const busStore = useBusStore()
const { currentCity } = storeToRefs(busStore)

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
</script>

<template>
  <div
    v-if="busStore.currentCity === ''"
    class="flex-c absolute top-0 left-0 z-[1000] h-full w-full bg-[#00000050]">
    <div class="rounded bg-white p-8">
      <span>{{ t('select.City') }}：</span>
      <select
        id="city"
        v-model="currentCity"
        name="city"
        class="rounded-lg border-none bg-gray-300 text-gray-700 focus:ring-0">
        <option value="" disabled selected>{{ t('select.City') }}</option>
        <option v-for="city in selections" :key="city" :value="city">
          {{ t(`select.${city}`) }}
        </option>
      </select>
    </div>
  </div>

  <BreadCrumb>
    <span>{{ t('select.City') }}：</span>
    <select
      id="city"
      v-model="currentCity"
      name="city"
      class="rounded-lg border-none bg-transparent text-center focus:ring-0">
      <option v-for="city in selections" :key="city" :value="city">
        {{ t(`select.${city}`) }}
      </option>
    </select>
  </BreadCrumb>
</template>
