<script setup lang="ts">
import IconGlobe from '@/components/icons/IconGlobe.vue'
import NearbyStations from '@/components/NearbyStations.vue'
import NearbyStationsDetail from '@/components/NearbyStationsDetail.vue'

import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useMapStore } from '@/stores/map'

const { t } = useI18n()
const toast = useToast()
const mapStore = useMapStore()
const { userPosition } = storeToRefs(mapStore)

const isGettingLocation = ref(true)
const showDetail = ref(false)

onMounted(() => {
  if (!navigator.geolocation) {
    return toast.error('您的瀏覽器未提供定位功能')
  }

  function success(position: {
    coords: { latitude: number; longitude: number }
  }) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    mapStore.changeUserPosition(lat, lng)
    isGettingLocation.value = false
  }

  function error() {
    toast.error('無法取得您的定位資訊')
    isGettingLocation.value = false
  }

  navigator.geolocation.getCurrentPosition(success, error)
})
</script>

<template>
  <div v-if="isGettingLocation" class="flex-c h-full w-full text-gray-400">
    <IconGlobe class="mr-2 h-6 w-6 animate-spin"></IconGlobe>
    {{ t('getLocation') }}
  </div>

  <div v-else class="h-full w-full">
    <div v-if="!userPosition" class="flex-c h-full w-full text-secondary">
      {{ t('getLocationFailed') }}
    </div>
    <template v-else>
      <NearbyStations
        v-if="!showDetail"
        @show-detail="showDetail = true"></NearbyStations>
      <NearbyStationsDetail
        v-else
        @close-detail="showDetail = false"></NearbyStationsDetail>
    </template>
  </div>
</template>
