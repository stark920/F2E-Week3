<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLikesStore } from '@/stores/likes'
import { storeToRefs } from 'pinia'
import RouteInfoCard from './RouteInfoCard.vue'
const { t } = useI18n()
const likeStore = useLikesStore()
const { likeRoutes } = storeToRefs(likeStore)
</script>

<template>
  <section class="flex h-full flex-col">
    <div class="flex-c h-[3rem]">
      <h3 class="text-xl font-bold">{{ t('collections') }}</h3>
    </div>
    <div class="h-[calc(100%-3rem)] overflow-y-scroll px-2">
      <RouteInfoCard
        v-for="rt in likeRoutes"
        :key="rt.uid"
        :uid="rt.uid"
        :name="rt.name"
        :name-en="rt.nameEn ?? ''"
        :departure="rt.departure"
        :destination="rt.destination"
        :departure-en="rt.departureEn ?? ''"
        :destination-en="rt.destinationEn ?? ''"
        :city="rt.city"></RouteInfoCard>
    </div>
  </section>
</template>
