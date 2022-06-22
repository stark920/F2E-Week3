<script setup lang="ts">
import BusMap from '@/components/BusMap.vue'
import CitySelect from '@/components/CitySelect.vue'
import CitySelectFullScreen from '@/components/CitySelectFullScreen.vue'
import CitySearchBoard from '@/components/CitySearchBoard.vue'
import RouteDetailBoard from '@/components/RouteDetailBoard.vue'
import CollectionBoard from '@/components/CollectionBoard.vue'
import { useBusStore } from '@/stores/bus'
const busStore = useBusStore()
const boards = { CitySearchBoard, RouteDetailBoard, CollectionBoard }
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <div class="h-[3rem]">
      <CitySelectFullScreen
        v-if="busStore.currentCity === ''"></CitySelectFullScreen>
      <CitySelect v-else></CitySelect>
    </div>

    <div class="flex h-[calc(100%-3rem)] flex-grow">
      <aside class="h-full w-[460px]">
        <component
          :is="boards[busStore.displayBoard as keyof typeof boards]"></component>
      </aside>

      <div class="flex-grow">
        <BusMap></BusMap>
      </div>
    </div>
  </section>
</template>
