<script setup lang="ts">
import { RouterView } from 'vue-router'
import BusMap from '@/views/MapBoard.vue'
import { useBusStore } from '@/stores/bus'
import { storeToRefs } from 'pinia'
const busStore = useBusStore()
const { showAsideBoard } = storeToRefs(busStore)
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <div class="h-[3rem]">
      <RouterView name="nav" />
    </div>
    <div class="relative h-[calc(100%-3rem)]">
      <aside
        :class="{
          'z-10': showAsideBoard,
          'z-0': !showAsideBoard
        }"
        class="absolute h-full w-full bg-white lg:w-[460px]">
        <RouterView name="main" />
      </aside>
      <div
        :class="{
          'z-0': showAsideBoard,
          'z-10': !showAsideBoard
        }"
        class="absolute z-20 h-full w-full lg:left-[460px] lg:w-[calc(100%-460px)]">
        <BusMap></BusMap>
      </div>
    </div>
  </section>
</template>
