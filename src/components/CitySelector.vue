<script setup lang="ts">
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
  <div class="flex-c">
    <span>{{ t('selectCity') }}：</span>
    <select
      id="city"
      v-model="currentCity"
      name="city"
      class="rounded-lg border-none bg-transparent text-center focus:ring-0">
      <option v-for="city in selections" :key="city" :value="city">
        {{ t(`select${city}`) }}
      </option>
    </select>
  </div>
</template>
