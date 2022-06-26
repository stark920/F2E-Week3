import { defineStore } from 'pinia'

export const useLangStore = defineStore({
  id: 'lang',
  state: () => ({
    lang: localStorage.getItem('locale') ?? 'zh-TW'
  }),
  actions: {
    changeLang(value: string) {
      localStorage.setItem('locale', value)
      this.lang = value
    }
  }
})
