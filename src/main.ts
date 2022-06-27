import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'

import './index.css'
import 'vue-toastification/dist/index.css'

import type { PluginOptions, POSITION } from 'vue-toastification'

const app = createApp(App)

// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// toastification
const options: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true,
  position: 'bottom-right' as POSITION,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
};
app.use(Toast, options);

app.use(router)
app.use(i18n)

app.mount('#app')
