<script setup lang="ts">
import RouteLists from '@/components/RouteLists.vue'
import RouteDetail from '@/components/RouteDetail.vue'

import { watch, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { busApi } from '@/utils/api'
import { storeToRefs } from 'pinia'
import { useBusStore } from '@/stores/bus'

import type { routeList } from '@/types/interface'

const route = useRoute()
const toast = useToast()
const busStore = useBusStore()
const { currentCity } = storeToRefs(busStore)

const routesData = reactive({
  data: [] as routeList[],
  getRoutesData() {
    const city = currentCity.value
    if (!localStorage.getItem(`${city}Routes`)) {
      return this.updateRoutesData()
    }
    const cityData = JSON.parse(localStorage.getItem(`${city}Routes`) as string)
    const dataTime = cityData.time
    const currentTime = Date.now()
    // keep 30 days
    if (currentTime - dataTime > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(`${city}Routes`)
      return this.updateRoutesData()
    }

    this.data = cityData.data
  },
  async updateRoutesData() {
    const city = currentCity.value
    const data = await busApi.getRoutesData(city)
    if (!data) {
      return toast.error('取得資料失敗，請稍後再試')
    }
    this.data = data

    const result = {
      data,
      time: Date.now()
    }
    localStorage.setItem(`${city}Routes`, JSON.stringify(result))
  }
})

const routeDetail = reactive({
  isShow: false,
  currentRoute: {} as routeList,
  data: {
    go: [],
    back: [],
    circle: []
  },
  async show(route: routeList) {
    const apiData = await busApi.getRouteWithArrivalTime(
      route.City,
      route.RouteName.Zh_tw
    )

    if (apiData) {
      routeDetail.data = apiData
      routeDetail.currentRoute = route
      routeDetail.isShow = true
      console.log(apiData)
    } else {
      toast.error('取得資料失敗，請稍後再試')
    }
  }
})

onMounted(() => {
  if (route.query.city) {
    const allowList = ['Taipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung']
    const city = route.query.city.toString()
    if (allowList.includes(city)) {
      currentCity.value = city
    }
  }

  if (!currentCity.value) return

  routesData.getRoutesData()
})

watch(currentCity, () => {
  if (currentCity.value) {
    routesData.getRoutesData()
    routeDetail.isShow = false
  }
})
</script>

<template>
  <RouteLists
    v-if="!routeDetail.isShow"
    :city="currentCity"
    :data="routesData.data"
    @show-detail="routeDetail.show"></RouteLists>
  <RouteDetail
    v-else
    :route="routeDetail.currentRoute"
    :data="routeDetail.data"
    @update-detail="routeDetail.show"
    @close-detail="routeDetail.isShow = false"></RouteDetail>
</template>
