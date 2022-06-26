<script setup lang="ts">
import BreadCrumb from '../components/BreadCrumb.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <BreadCrumb>
    <div>{{ t('page.home') }} / {{ t('page.collect') }}</div>
  </BreadCrumb>
</template>
