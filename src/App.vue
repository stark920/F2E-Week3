<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import IconEarth from '@/components/icons/IconEarth.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import { useLangStore } from '@/stores/lang'
import { useBusStore } from './stores/bus'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
const router = useRouter()
const busStore = useBusStore()
const langStore = useLangStore()
const { t, locale } = useI18n()
watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale)
  langStore.changeLang(newLocale)
})

const changeView = (board: string) => {
  busStore.displayBoard = board
  router.push({ name: 'city' })
}
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-body">
    <header class="bg-white">
      <div
        class="mx-auto flex max-w-[1440px] items-center justify-between px-4">
        <RouterLink to="/">
          <div class="flex-c">
            <img
              alt="Taiwan Bus+ logo"
              class="logo h-10 w-10"
              src="@/assets/logo.png" />
            <div class="ml-3 flex flex-col">
              <h1 class="font-extrabold">{{ t('title') }}</h1>
              <small>Taiwan Bus+</small>
            </div>
          </div>
        </RouterLink>

        <nav>
          <RouterLink to="/nearby" class="inline-block p-4 hover:bg-gray-100">{{
            t('nearby')
          }}</RouterLink>
          <div
            class="hidden p-4 hover:bg-gray-100 lg:inline-block"
            @click="changeView('CitySearchBoard')">
            {{ t('cities') }}
          </div>
          <RouterLink
            to="/stop"
            class="hidden p-4 hover:bg-gray-100 lg:inline-block"
            >{{ t('stops') }}</RouterLink
          >
          <div
            class="hidden p-4 hover:bg-gray-100 lg:inline-block"
            @click="changeView('CollectionBoard')">
            {{ t('collections') }}
          </div>
          <IconMenu
            class="inline-block rounded-md ring-primary hover:ring-2 active:ring-2 lg:hidden">
          </IconMenu>
        </nav>

        <div class="hidden lg:flex">
          <IconEarth class="mr-2 h-6 w-6"></IconEarth>
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
      </div>
    </header>

    <main
      class="mx-auto h-full w-full max-w-[1440px] flex-grow overflow-hidden">
      <RouterView />
    </main>

    <footer class="bg-gray-700 py-2 text-white">
      <p class="flex-c mx-auto w-full max-w-[1440px] px-4 text-center text-sm">
        Copyright © 2021 {{ t('title') }} All rights reserved.
      </p>
    </footer>
  </div>
</template>
