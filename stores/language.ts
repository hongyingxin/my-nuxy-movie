import { UI_LOCALES } from '~/constants/languages'
import { getLanguagesConfiguration } from '~/api/detail'
import type { TmdbLanguage, UILanguageCode } from '~/types/language'

/**
 * 语言相关 Pinia Store
 *
 * - 管理界面语言（UI_LOCALES）和当前语言状态
 * - 提供多语言切换、同步、初始化等功能
 * - 支持拉取并缓存 TMDB 支持的内容原始语言列表（tmdbLanguages），用于内容筛选
 */
export const useLanguageStore = defineStore('language', {
  state: () => ({
    /** 当前界面语言（i18n 语言） */
    currentLocale: 'zh-CN' as UILanguageCode,
    /** 界面可用语言列表（UI 语言切换） */
    locales: UI_LOCALES,
    /**
     * TMDB 支持的内容原始语言列表
     * 通过 /configuration/languages 接口获取，
     * 用于内容筛选（with_original_language 参数）等场景
     */
    tmdbLanguages: [] as TmdbLanguage[],
  }),

  getters: {
    /** 获取当前界面语言 code */
    getCurrentLocale: state => state.currentLocale,

    /** 获取当前界面语言的详细信息 */
    getCurrentLocaleInfo: state => {
      return state.locales.find(locale => locale.code === state.currentLocale)
    },

    /** 获取所有可用界面语言 */
    getAvailableLocales: state => state.locales,

    /** 获取除当前语言外的其他界面语言 */
    getOtherLocales: state => {
      return state.locales.filter(locale => locale.code !== state.currentLocale)
    },

    /** 获取 TMDB 支持的内容原始语言列表 */
    getTmdbLanguages: state => state.tmdbLanguages,
  },

  actions: {
    /**
     * 设置当前界面语言
     * @param localeCode 语言 code
     */
    setLocale(localeCode: UILanguageCode) {
      if (this.locales.find(locale => locale.code === localeCode)) {
        this.currentLocale = localeCode
      }
    },

    /**
     * 切换界面语言（不改变路径，仅切换 i18n 状态）
     * @param localeCode 目标语言 code
     */
    async switchLanguage(localeCode: UILanguageCode) {
      if (this.currentLocale === localeCode) return

      this.setLocale(localeCode)

      try {
        // 直接使用 i18n 切换语言，不改变路径
        const { $i18n } = useNuxtApp()
        await $i18n.setLocale(localeCode as UILanguageCode)

        console.log(`Language switched to: ${localeCode}`)

        // 刷新页面
        window.location.reload()
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
     * 初始化语言设置（从 i18n 获取当前语言）
     */
    initialize() {
      // 从 i18n 获取当前语言
      console.log('initialize', this.currentLocale, this.locales)
      this.syncFromI18n()
    },

    /**
     * 拉取 TMDB 支持的内容原始语言列表
     * 通过 getLanguagesConfiguration API 获取，结果存入 tmdbLanguages
     * 适用于内容筛选等场景
     */
    async fetchTmdbLanguages() {
      try {
        // 如果已缓存数据，直接返回，避免重复请求
        if (this.tmdbLanguages && this.tmdbLanguages.length > 0) {
          return
        }
        const res = await getLanguagesConfiguration()
        // 兼容 useHttp 返回 AsyncData 结构
        console.log('fetchTmdbLanguages-----------------', res)
        const data = (res?.data?.value as TmdbLanguage[]) || []
        this.tmdbLanguages = data
      } catch (error) {
        console.error('Failed to fetch TMDB languages:', error)
        this.tmdbLanguages = []
      }
    },
  },

  persist: true,
})
