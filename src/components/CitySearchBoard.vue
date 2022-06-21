<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import RouteInfoCard from './RouteInfoCard.vue'
import { useToast } from 'vue-toastification'
import {
  watch,
  onMounted,
  reactive,
  computed,
  type ComputedRef,
  ref,
  type Ref
} from 'vue'
import { busApi } from '@/utils/api'
import { useBusStore } from '@/stores/bus'
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const toast = useToast()
const busStore = useBusStore()
const langStore = useLangStore()
const { currentCity } = storeToRefs(busStore)

// filter
const buttons = {
  Taipei: [
    {
      text: ['紅', '藍', '1', '2', '3'],
      color: ['#E87E7E', '#3591C5']
    },
    {
      text: ['綠', '棕', '4', '5', '6'],
      color: ['#5CC1A9', '#A86556']
    },
    {
      text: ['橘', '黃', '7', '8', '9'],
      color: ['#EEA12E', '#DEBE4E']
    },
    {
      text: ['F', '小', '其他', '0', '清除'],
      color: ['#888888', '#888888', '#283C43']
    }
  ],
  Taoyuan: [
    {
      text: ['1', '2', '3'],
      color: []
    },
    {
      text: ['4', '5', '6'],
      color: []
    },
    {
      text: ['7', '8', '9'],
      color: []
    },
    {
      text: ['L', '0', '清除'],
      color: ['#DEBE4E']
    }
  ],
  Taichung: [
    {
      text: ['1', '2', '3'],
      color: []
    },
    {
      text: ['4', '5', '6'],
      color: []
    },
    {
      text: ['7', '8', '9'],
      color: []
    },
    {
      text: ['專用道', '0', '清除'],
      color: ['#283C43']
    }
  ],
  Tainan: [
    {
      text: ['紅', '藍', '1', '2', '3'],
      color: ['#E87E7E', '#3591C5']
    },
    {
      text: ['綠', '棕', '4', '5', '6'],
      color: ['#5CC1A9', '#A86556']
    },
    {
      text: ['橘', '黃', '7', '8', '9'],
      color: ['#EEA12E', '#DEBE4E']
    },
    {
      text: ['高鐵', '其他', '0', '清除'],
      color: ['#EEA12E', '#888888']
    }
  ],
  Kaohsiung: [
    {
      text: ['紅', 'JOY', '1', '2', '3'],
      color: ['#E87E7E', '#283C43']
    },
    {
      text: ['橘', '幹線', '4', '5', '6'],
      color: ['#EEA12E', '#283C43']
    },
    {
      text: ['黃', '快線', '7', '8', '9'],
      color: ['#DEBE4E', '#283C43']
    },
    {
      text: ['其他', '0', '清除'],
      color: ['#888888']
    }
  ],
  Other: [
    {
      text: ['1', '2', '3'],
      color: []
    },
    {
      text: ['4', '5', '6'],
      color: []
    },
    {
      text: ['7', '8', '9'],
      color: []
    },
    {
      text: ['其他', '0', '清除'],
      color: ['#888888']
    }
  ]
}
const filter = reactive({
  keyParamFirst: '',
  keyParamLast: '',
  keyWord: '',
  keyboard: computed(() => {
    const city = currentCity.value as keyof typeof buttons
    return Object.prototype.hasOwnProperty.call(buttons, city)
      ? buttons[city]
      : buttons.Other
  }),
  changeKey(text: string) {
    if (text === '清除') {
      this.keyParamFirst = ''
      this.keyParamLast = ''
    } else if (text === '其他') {
      this.keyParamFirst = '其他'
      this.keyParamLast = ''
    } else if (isNaN(Number(text))) {
      this.keyParamFirst = text
    } else {
      if (this.keyParamFirst === '其他') {
        this.keyParamFirst = ''
      }
      this.keyParamLast += text
    }
    this.keyWord = this.keyParamFirst + this.keyParamLast
  }
})

// routes
interface route {
  RouteUID: string
  RouteName: {
    Zh_tw: string
    En: string
  }
  DepartureStopNameZh: string
  DestinationStopNameZh: string
  DepartureStopNameEn: string
  DestinationStopNameEn: string
  City: string
}
const routesOriginData = {
  Taipei: [] as route[],
  Taoyuan: [] as route[],
  Taichung: [] as route[],
  Tainan: [] as route[],
  Kaohsiung: [] as route[],
  Hsinchu: [] as route[],
  MiaoliCounty: [] as route[],
  ChanghuaCounty: [] as route[],
  NantouCounty: [] as route[],
  YunlinCounty: [] as route[],
  Chiayi: [] as route[],
  PingtungCounty: [] as route[],
  YilanCounty: [] as route[],
  HualienCounty: [] as route[],
  TaitungCounty: [] as route[],
  PenghuCounty: [] as route[],
  KinmenCounty: [] as route[]
}
const routesCurrentCity: Ref<route[]> = ref([])
const routesDisplay: ComputedRef<route[]> = computed(() => {
  if (!routesCurrentCity.value || routesCurrentCity.value.length === 0) {
    return []
  }
  if (langStore.lang === 'zh-TW') {
    return routesCurrentCity.value.filter(
      (el: route) => el.RouteName['Zh_tw'].indexOf(filter.keyWord) >= 0
    )
  } else {
    return routesCurrentCity.value.filter(
      (el: route) => el.RouteName['En'].indexOf(filter.keyWord) >= 0
    )
  }
})

const getRoutesData = async () => {
  const city = currentCity.value as keyof typeof routesOriginData
  const data = await busApi.getRoutesData()

  if (data) {
    const tempData = {
      data,
      date: Date.now()
    }

    localStorage.setItem(`${city}Routes`, JSON.stringify(tempData))
    routesOriginData[city] = tempData.data
    routesCurrentCity.value = tempData.data
  } else {
    toast.error('取得資料失敗，請稍後再試')
  }
}

const checkRoutesData = () => {
  const city = currentCity.value as keyof typeof routesOriginData
  console.log(routesOriginData[city])
  if (routesOriginData[city].length > 0) {
    routesCurrentCity.value = routesOriginData[city]
    return
  }

  if (localStorage.getItem(`${city}Routes`)) {
    const tempData = JSON.parse(localStorage.getItem(`${city}Routes`) as string)
    // check if data created over 7 days
    const createDate = tempData.date
    const currentDate = Date.now()
    if (currentDate - createDate > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(`${city}Routes`)
    } else {
      routesOriginData[city] = tempData.data
      routesCurrentCity.value = tempData.data
      return
    }
  }

  getRoutesData()
}

onMounted(() => {
  if (currentCity.value !== '') {
    checkRoutesData()
  }
})

watch(currentCity, () => {
  checkRoutesData()
})
</script>

<template>
  <section class="flex h-full w-full flex-col">
    <div class="flex-c h-[4rem] flex-grow bg-white px-4">
      <div class="relative w-full rounded-lg bg-gray-300">
        <input
          id="bus-filter"
          v-model="filter.keyWord"
          type="search"
          name="bus-filter"
          :placeholder="t('typeKeyword')"
          class="peer w-full border-0 bg-transparent focus:ring-0" />
        <IconSearch
          class="absolute right-3 top-[50%] h-4 w-4 -translate-y-[50%] peer-hover:hidden peer-focus:hidden"></IconSearch>
      </div>
    </div>

    <div class="h-[calc(100%-22rem)] overflow-y-scroll bg-white px-4 pb-4">
      <RouteInfoCard
        v-for="rt in routesDisplay"
        :key="rt.RouteUID"
        :uid="rt.RouteUID"
        :name="rt.RouteName.Zh_tw"
        :name-en="rt.RouteName.En"
        :departure="rt.DepartureStopNameZh"
        :destination="rt.DestinationStopNameZh"
        :departure-en="rt.DepartureStopNameEn"
        :destination-en="rt.DestinationStopNameEn"
        :city="rt.City"></RouteInfoCard>
    </div>

    <div class="flex-c h-[18rem] flex-col bg-gray-100 p-4">
      <ul
        v-for="(data, row) of filter.keyboard"
        :key="row"
        class="mb-2 flex w-full gap-2 last:mb-0">
        <li
          v-for="(el, index) of data.text"
          :key="index"
          :style="`background-color: ${data.color[index] ?? '#D5D5D5'}`"
          :class="{ 'text-white': data.color[index] }"
          class="flex-1 cursor-pointer rounded-lg p-4 text-center hover:brightness-110"
          @click="filter.changeKey(el)">
          {{ el }}
        </li>
      </ul>
    </div>
  </section>
</template>
