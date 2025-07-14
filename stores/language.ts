import { UI_LOCALES } from '~/constants/languages'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLocale: 'zh-CN' as string,
    locales: UI_LOCALES,
  }),

  getters: {
    getCurrentLocale: state => state.currentLocale,

    getCurrentLocaleInfo: state => {
      return state.locales.find(locale => locale.code === state.currentLocale)
    },

    getAvailableLocales: state => state.locales,

    getOtherLocales: state => {
      return state.locales.filter(locale => locale.code !== state.currentLocale)
    },
  },

  actions: {
    /**
     * 设置当前语言
     */
    setLocale(localeCode: string) {
      if (this.locales.find(locale => locale.code === localeCode)) {
        this.currentLocale = localeCode
      }
    },

    /**
     * 切换语言（不改变路径）
     */
    async switchLanguage(localeCode: string) {
      if (this.currentLocale === localeCode) return

      this.setLocale(localeCode)

      try {
        // 直接使用 i18n 切换语言，不改变路径
        const { $i18n } = useNuxtApp()
        await $i18n.setLocale(localeCode as any)

        console.log(`Language switched to: ${localeCode}`)
      } catch (error) {
        console.error('Failed to switch language:', error)
        // 回滚状态
        this.syncFromI18n()
      }
    },

    /**
     * 从 i18n 同步当前语言状态
     */
    syncFromI18n() {
      const { $i18n } = useNuxtApp()
      if ($i18n?.locale?.value) {
        this.currentLocale = $i18n.locale.value
      }
    },

    /**
     * 初始化语言设置
     */
    initialize() {
      // 从 i18n 获取当前语言
      console.log('initialize', this.currentLocale, this.locales)
      this.syncFromI18n()
    },
  },

  persist: true,
})
