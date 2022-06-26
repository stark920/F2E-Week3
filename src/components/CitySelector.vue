<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'
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
  <section class="flex h-full items-center justify-between px-4">
    <div>
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
    <div>
      <a
        href="https://www.taiwanbus.tw/"
        target="_blank"
        class="flex-c hover:underline">
        <IconInfo class="mr-2 h-6 w-6"></IconInfo>
        {{ t('schedule') }}
      </a>
    </div>
  </section>
</template>
