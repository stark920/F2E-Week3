<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import RouteCard from '@/components/RouteCard.vue'
import { computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLangStore } from '@/stores/lang'
import type { routeList } from '@/types/interface'
const { t } = useI18n()
const langStore = useLangStore()
const buttons = {
  Taipei: [
    {
      text: ['buttonBoard.red', 'buttonBoard.blue', 1, 2, 3],
      color: ['#E87E7E', '#3591C5']
    },
    {
      text: ['buttonBoard.green', 'buttonBoard.brown', 4, 5, 6],
      color: ['#5CC1A9', '#A86556']
    },
    {
      text: ['buttonBoard.orange', 'buttonBoard.small', 7, 8, 9],
      color: ['#EEA12E', '#DEBE4E']
    },
    {
      text: ['buttonBoard.F', 'buttonBoard.metro', 0, 'buttonBoard.clean'],
      color: ['#888888', '#888888']
    }
  ],
  Taoyuan: [
    {
      text: [1, 2, 3],
      color: []
    },
    {
      text: [4, 5, 6],
      color: []
    },
    {
      text: [7, 8, 9],
      color: []
    },
    {
      text: ['buttonBoard.L', 0, 'buttonBoard.clean'],
      color: ['#DEBE4E']
    }
  ],
  Tainan: [
    {
      text: ['buttonBoard.red', 'buttonBoard.blue', 1, 2, 3],
      color: ['#E87E7E', '#3591C5']
    },
    {
      text: ['buttonBoard.green', 'buttonBoard.brown', 4, 5, 6],
      color: ['#5CC1A9', '#A86556']
    },
    {
      text: ['buttonBoard.orange', 'buttonBoard.yellow', 7, 8, 9],
      color: ['#EEA12E', '#DEBE4E']
    },
    {
      text: [0, 'buttonBoard.clean'],
      color: []
    }
  ],
  Kaohsiung: [
    {
      text: ['buttonBoard.red', 1, 2, 3],
      color: ['#E87E7E']
    },
    {
      text: ['buttonBoard.orange', 4, 5, 6],
      color: ['#EEA12E']
    },
    {
      text: ['buttonBoard.yellow', 7, 8, 9],
      color: ['#DEBE4E']
    },
    {
      text: ['buttonBoard.JOY', 'buttonBoard.express', 0, 'buttonBoard.clean'],
      color: ['#283C43', '#283C43']
    }
  ],
  Other: [
    {
      text: [1, 2, 3],
      color: []
    },
    {
      text: [4, 5, 6],
      color: []
    },
    {
      text: [7, 8, 9],
      color: []
    },
    {
      text: [0, 'buttonBoard.clean'],
      color: []
    }
  ]
}

const props = defineProps<{
  city: string
  data: routeList[]
}>()

defineEmits(['showDetail'])

const routesFilter = reactive({
  keyParamFirst: '',
  keyParamLast: '',
  keyword: '',
  keyboard: computed(() => {
    if (!props.city) return buttons.Other
    return Object.prototype.hasOwnProperty.call(buttons, props.city)
      ? buttons[props.city as keyof typeof buttons]
      : buttons.Other
  }),
  data: computed(() => {
    const data = props.data
    if (!data || data.length === 0) {
      return []
    }

    let result: routeList[]
    if (langStore.lang === 'zh-TW') {
      result = data.filter(
        (route: routeList) =>
          route.RouteName.Zh_tw.indexOf(routesFilter.keyword) >= 0
      )
    } else {
      result = data.filter((route: routeList) =>
        route.RouteName.En
          ? route.RouteName.En.indexOf(routesFilter.keyword) >= 0
          : route.RouteName.Zh_tw.indexOf(routesFilter.keyword) >= 0
      )
    }
    return result
  }),
  changeKeyByButton(text: string | number) {
    if (text === '清除' || text === 'Clean') {
      this.keyParamFirst = ''
      this.keyParamLast = ''
    } else if (isNaN(Number(text))) {
      this.keyParamFirst = text.toString()
    } else {
      this.keyParamLast += text
    }
    this.keyword = this.keyParamFirst + this.keyParamLast
  },
  reset() {
    this.keyParamFirst = ''
    this.keyParamLast = ''
    this.keyword = ''
  }
})

const filterData = computed(() => {
  const data = props.data

  if (!data || data.length === 0) {
    return [] as routeList[]
  }

  return langStore.lang === 'zh-TW'
    ? data.filter(
        (route: routeList) =>
          route.RouteName.Zh_tw.indexOf(routesFilter.keyword) >= 0
      )
    : data.filter((route: routeList) =>
        route.RouteName.En
          ? route.RouteName.En.indexOf(routesFilter.keyword) >= 0
          : route.RouteName.Zh_tw.indexOf(routesFilter.keyword) >= 0
      )
})

watch(
  () => props.city,
  () => {
    routesFilter.reset()
  }
)
</script>
<template>
  <section class="flex h-full w-full flex-col">
    <div class="flex-c h-[4rem] flex-grow bg-white px-4">
      <div class="relative w-full rounded-lg bg-gray-300">
        <input
          id="bus-filter"
          v-model="routesFilter.keyword"
          type="search"
          name="bus-filter"
          :placeholder="t('typeKeyword')"
          class="peer w-full border-0 bg-transparent focus:ring-0" />
        <IconSearch
          class="absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"></IconSearch>
      </div>
    </div>

    <div class="h-[calc(100%-22rem)] overflow-y-scroll bg-white px-4 pb-4">
      <RouteCard
        v-for="route in filterData"
        :key="route.RouteUID"
        :data="route"
        @click="$emit('showDetail', route)"></RouteCard>
    </div>

    <div class="flex-c h-[16rem] flex-col bg-gray-100 p-4">
      <ul
        v-for="(btn, row) of routesFilter.keyboard"
        :key="row"
        class="mb-2 flex w-full gap-2 last:mb-0">
        <li
          v-for="(text, index) of btn.text"
          :key="index"
          :style="`background-color: ${btn.color[index] ?? '#D5D5D5'}`"
          :class="{ 'text-white': btn.color[index] }"
          class="flex-1 cursor-pointer rounded-lg py-3 text-center hover:ring-1 hover:ring-gray-700 hover:brightness-110"
          @click="
            routesFilter.changeKeyByButton(
              typeof text === 'string' ? t(text) : text.toString()
            )
          ">
          {{ typeof text === 'string' ? t(text) : text.toString() }}
        </li>
      </ul>
    </div>
  </section>
</template>
