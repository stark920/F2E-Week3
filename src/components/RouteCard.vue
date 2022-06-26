<script setup lang="ts">
import IconHeart from './icons/IconHeart.vue'
import IconHeartFill from './icons/IconHeartFill.vue'

import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useLikesStore } from '@/stores/likes'
import { useLangStore } from '@/stores/lang'

import type { routeList } from '@/types/interface'

const likeStore = useLikesStore()
const langStore = useLangStore()
const { likeRoutes } = storeToRefs(likeStore)
const { lang } = storeToRefs(langStore)
const { t } = useI18n()

defineProps<{
  data: routeList
}>()

defineEmits(['displayDetail'])
</script>

<template>
  <div
    class="cursor-pointer rounded-t-lg border-b-[1px] border-gray-300 p-4 pb-2 hover:bg-gray-100"
    @click="$emit('displayDetail', data.City, data.RouteName.Zh_tw)">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-lg font-bold">
        {{
          lang === 'zh-TW'
            ? data.RouteName.Zh_tw
            : data.RouteName.En ?? data.RouteName.Zh_tw
        }}
      </div>
      <div
        class="cursor-pointer"
        @click.stop="likeStore.toggleLikeRoutes(data)">
        <IconHeartFill
          v-if="
            likeRoutes.findIndex((el) => el.RouteUID === data.RouteUID) >= 0
          "
          class="h-5 w-5 text-secondary"></IconHeartFill>
        <IconHeart v-else class="h-5 w-5"></IconHeart>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="text-gray-600">
        {{
          lang === 'zh-TW'
            ? `${data.DepartureStopNameZh} - ${data.DestinationStopNameZh}`
            : `${data.DepartureStopNameEn} - ${data.DestinationStopNameEn}`
        }}
      </div>
      <div>{{ t(`city.${data.City}`) }}</div>
    </div>
  </div>
</template>
