<script setup lang="ts">
import RouteCard from '@/components/RouteCard.vue'
import NearbyDetail from '@/components/NearbyDetail.vue'

import { useI18n } from 'vue-i18n'
import { useLikesStore } from '@/stores/likes'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'

const { t } = useI18n()
const likeStore = useLikesStore()
const { likeRoutes, likeStops } = storeToRefs(likeStore)

const routeSelections = (() => {
  const result = [] as string[]
  likeRoutes.value.forEach((route) => {
    if (!result.includes(route.City)) result.push(route.City)
  })
  return result
})()

const stopSelections = (() => {
  const result = [] as string[]
  likeStops.value.forEach((stop) => {
    if (!result.includes(stop.City)) result.push(stop.City)
  })
  return result
})()

const viewController = reactive({
  displayView: 'route',
  routeSelectedCity: 'All',
  stopSelectedCity: 'All'
})

const filterRoutes = computed(() => {
  if (viewController.routeSelectedCity === 'All') return likeRoutes.value
  return [...likeRoutes.value].filter(
    (route) => route.City === viewController.routeSelectedCity
  )
})

const filterStops = computed(() => {
  if (viewController.stopSelectedCity === 'All') return likeStops.value
  return likeStops.value.filter(
    (stop) => stop.City === viewController.stopSelectedCity
  )
})
</script>

<template>
  <div class="flex h-full flex-col">
    <section class="flex h-[4rem] items-end justify-center">
      <h3 class="text-xl font-bold">{{ t('page.collect') }}</h3>
    </section>

    <section class="flex-c h-[4rem]">
      <select
        v-if="viewController.displayView === 'route'"
        v-model="viewController.routeSelectedCity"
        class="rounded-md border-none bg-gray-300 py-1 text-gray-700 focus:ring-0">
        <option value="All">{{ t('allCity') }}</option>
        <option v-for="city in routeSelections" :key="city" :value="city">
          {{ t(`city.${city}`) }}
        </option>
      </select>
      <select
        v-if="viewController.displayView === 'stop'"
        v-model="viewController.stopSelectedCity"
        class="rounded-md border-none bg-gray-300 py-1 text-gray-700 focus:ring-0">
        <option value="All">{{ t('allCity') }}</option>
        <option v-for="city in stopSelections" :key="city" :value="city">
          {{ t(`city.${city}`) }}
        </option>
      </select>
    </section>

    <section class="flex h-[3rem]">
      <label class="flex-grow" @change="viewController.displayView = 'route'">
        <input type="radio" name="direction" class="peer hidden" checked />
        <div
          class="flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white">
          {{ t('collect.route') }}
        </div>
      </label>
      <label class="flex-grow" @change="viewController.displayView = 'stop'">
        <input type="radio" name="direction" class="peer hidden" />
        <div
          class="flex-c h-full cursor-pointer gap-2 rounded-t-md bg-gray-300 px-2 peer-checked:bg-primary peer-checked:text-white">
          {{ t('collect.stop') }}
        </div>
      </label>
    </section>

    <div class="h-[calc(100%-9rem)] overflow-y-scroll px-2">
      <template v-if="viewController.displayView === 'route'">
        <RouteCard
          v-for="route in filterRoutes"
          :key="route.RouteUID"
          :data="route"></RouteCard>
      </template>
      <template v-if="viewController.displayView === 'stop'">
        <NearbyDetail
          v-for="stop in filterStops"
          :key="stop.RouteUID"
          :data="stop"></NearbyDetail>
      </template>
    </div>
  </div>
</template>
