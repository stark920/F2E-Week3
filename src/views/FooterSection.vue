<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <footer class="bg-gray-700 py-2 text-white">
    <p class="flex-c mx-auto w-full max-w-[1440px] px-4 text-center text-sm">
      Copyright © 2021 {{ t('title') }} All rights reserved.
    </p>
  </footer>
</template>
