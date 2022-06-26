<script setup lang="ts">
import IconInfo from './icons/IconInfo.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section class="flex h-full items-center justify-between px-4">
    <div>
      <slot></slot>
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
