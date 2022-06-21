<script setup lang="ts">
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'
import { storeToRefs } from 'pinia'
import { useLikesStore } from '@/stores/likes'
import { useBusStore } from '@/stores/bus'
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n'
const likeStore = useLikesStore()
const busStore = useBusStore()
const langStore = useLangStore()
const { likeRoutes } = storeToRefs(likeStore)
const { lang } = storeToRefs(langStore)
const { t } = useI18n()

const props = defineProps<{
  uid: string
  name: string
  nameEn: string
  destination: string
  destinationEn: string
  departure: string
  departureEn: string
  city: string
}>()

const toggleLike = () => {
  const data = { ...props }
  likeStore.toggleLikeRoutes(data)
}

const changeView = () => {
  busStore.currentRoute = { ...props }
  busStore.displayBoard = 'RouteDetailBoard'
}
</script>

<template>
  <div
    class="cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100"
    @click="changeView">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-lg font-bold">
        {{ lang === 'zh-TW' ? name : nameEn }}
      </div>
      <div class="cursor-pointer" @click.stop="toggleLike">
        <IconHeartFill
          v-if="likeRoutes.findIndex((el) => el.uid === uid) >= 0"
          class="h-5 w-5 text-secondary"></IconHeartFill>
        <IconHeart v-else class="h-5 w-5"></IconHeart>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-gray-600">
        {{
          lang === 'zh-TW'
            ? `${departure} - ${destination}`
            : `${departureEn} - ${destinationEn}`
        }}
      </div>
      <div>{{ t(city) }}</div>
    </div>
  </div>
</template>
