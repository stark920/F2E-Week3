<script setup lang="ts">
import IconInfo from './icons/IconInfo.vue'
import IconMap from './icons/IconMap.vue'
import IconMapFill from './icons/IconMapFill.vue'

import { useI18n } from 'vue-i18n'
import { useBusStore } from '@/stores/bus'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const busStore = useBusStore()
const { showAsideBoard } = storeToRefs(busStore)
</script>

<template>
  <section class="flex h-full items-center justify-between px-4">
    <div>
      <slot></slot>
    </div>
    <div class="flex-c">
      <a
        href="https://www.taiwanbus.tw/"
        target="_blank"
        class="flex-c mr-2 hover:underline">
        <IconInfo class="mr-1 h-5 w-5"></IconInfo>
        {{ t('schedule') }}
      </a>
      <button
        type="button"
        class="flex-c hover:underline lg:hidden"
        @click="showAsideBoard = !showAsideBoard">
        <IconMap v-show="showAsideBoard" class="mr-1 h-5 w-5"></IconMap>
        <IconMapFill
          v-show="!showAsideBoard"
          class="mr-1 h-5 w-5"></IconMapFill>
        {{ t('showMap') }}
      </button>
    </div>
  </section>
</template>
