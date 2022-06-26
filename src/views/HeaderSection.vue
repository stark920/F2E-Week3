<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconClose from '@/components/icons/IconClose.vue'

import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const displayMobileMenu = ref(false)
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto flex max-w-[1440px] items-center justify-between px-4">
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

      <nav class="flex-c">
        <ul class="flex">
          <li>
            <RouterLink to="/nearby" class="inline-block p-4 hover:bg-gray-100">
              {{ t('page.nearby') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/city"
              class="hidden p-4 hover:bg-gray-100 lg:inline-block">
              {{ t('page.city') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/stop"
              class="hidden p-4 hover:bg-gray-100 lg:inline-block">
              {{ t('page.stop') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/collect"
              class="hidden p-4 hover:bg-gray-100 lg:inline-block">
              {{ t('page.collect') }}
            </RouterLink>
          </li>
        </ul>
        <IconMenu
          class="inline-block rounded-md ring-primary hover:ring-2 active:ring-2 lg:hidden"
          @click="displayMobileMenu = true">
        </IconMenu>
      </nav>

      <LanguageSwitcher class="hidden lg:flex"></LanguageSwitcher>
    </div>

    <div
      v-show="displayMobileMenu"
      class="absolute top-0 left-0 z-20 flex h-full w-full justify-end bg-[#00000080] backdrop-blur-sm lg:hidden">
      <div class="flex min-w-[75%] flex-col bg-white pt-4">
        <div class="flex items-center justify-between p-4">
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
          <IconClose
            class="ml-4 h-6 w-6 hover:shadow-lg"
            @click="displayMobileMenu = false"></IconClose>
        </div>

        <ul class="flex w-4/5 flex-col bg-white">
          <li class="border-t-[1px] border-gray-300">
            <RouterLink to="/city" class="block p-4 hover:bg-gray-100">
              {{ t('page.city') }}
            </RouterLink>
          </li>
          <li class="border-t-[1px] border-gray-300">
            <RouterLink to="/stop" class="block p-4 hover:bg-gray-100">
              {{ t('page.stop') }}
            </RouterLink>
          </li>
          <li class="border-y-[1px] border-gray-300">
            <RouterLink to="/collect" class="block p-4 hover:bg-gray-100">
              {{ t('page.collect') }}
            </RouterLink>
          </li>
        </ul>

        <LanguageSwitcher class="mx-auto mt-8"></LanguageSwitcher>
      </div>
    </div>
  </header>
</template>
