<script setup lang="ts">
import { RouterView } from 'vue-router'
import BusMap from '@/views/MapBoard.vue'
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <div class="h-[3rem]">
      <RouterView name="nav" />
    </div>
    <div class="flex h-[calc(100%-3rem)] flex-grow">
      <aside class="h-full w-[460px]">
        <RouterView name="main" />
      </aside>
      <div class="flex-grow">
        <BusMap></BusMap>
      </div>
    </div>
  </section>
</template>
