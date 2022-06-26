<script setup lang="ts">
import RouteCard from '@/components/RouteCard.vue'
import { useI18n } from 'vue-i18n'
import { useLikesStore } from '@/stores/likes'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const likeStore = useLikesStore()
const { likeRoutes } = storeToRefs(likeStore)
</script>

<template>
  <section class="flex h-full flex-col">
    <div class="flex-c h-[3rem]">
      <h3 class="text-xl font-bold">{{ t('page.collect') }}</h3>
    </div>
    <div class="h-[calc(100%-3rem)] overflow-y-scroll px-2">
      <RouteCard
        v-for="route in likeRoutes"
        :key="route.RouteUID"
        :data="route"></RouteCard>
    </div>
  </section>
</template>
