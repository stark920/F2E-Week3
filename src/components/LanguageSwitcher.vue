<script setup lang="ts">
import IconWeb from '@/components/icons/IconWeb.vue'
import { useLangStore } from '@/stores/lang'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
const langStore = useLangStore()
const { t, locale } = useI18n()
watch(locale, (newLocale) => {
  langStore.changeLang(newLocale)
})
</script>

<template>
  <div class="flex">
    <IconWeb class="mr-2 h-6 w-6"></IconWeb>
    <label>
      <input
        v-model="locale"
        type="radio"
        value="zh-TW"
        name="lang"
        class="peer hidden"
        checked />
      <div class="cursor-pointer px-2 peer-checked:font-bold">
        {{ t('zh') }}
      </div>
    </label>
    <span>｜</span>
    <label>
      <input
        v-model="locale"
        type="radio"
        value="en-US"
        name="lang"
        class="peer hidden" />
      <div class="cursor-pointer px-2 peer-checked:font-bold">
        {{ t('en') }}
      </div>
    </label>
  </div>
</template>
