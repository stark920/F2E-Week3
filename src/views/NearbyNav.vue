<script setup lang="ts">
import BreadCrumb from '@/components/BreadCrumb.vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <BreadCrumb>
    <div>
      <span class="hidden lg:inline-block"
        ><RouterLink
          :to="{ name: 'home' }"
          class="cursor-pointer hover:underline">
          {{ t('page.home') }}</RouterLink
        >
        /
      </span>
      {{ t('page.nearby') }}
    </div>
  </BreadCrumb>
</template>
