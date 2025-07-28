import type { ThemeMode } from '~/types/theme'
import { DEFAULT_THEME_MODE } from '~/constants/theme'
import {
  applyTheme,
  calculateCurrentTheme,
  watchSystemTheme,
} from '~/utils/theme'

/**
 * 主题状态管理 Store
 *
 * 功能：
 * - 管理主题模式（light/dark/system）
 * - 自动检测系统主题偏好
 * - 持久化主题设置
 * - 提供主题切换功能
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    /** 当前主题模式 */
    mode: DEFAULT_THEME_MODE as ThemeMode,
    /** 实际应用的主题（根据系统偏好计算得出） */
    current: 'light' as 'light' | 'dark',
    /** 是否已初始化 */
  }),

  getters: {
    /** 获取当前主题模式 */
    getMode: state => state.mode,

    /** 获取实际应用的主题 */
    getCurrent: state => state.current,

    /** 是否为暗黑模式 */
    isDark: state => state.current === 'dark',

    /** 是否为明亮模式 */
    isLight: state => state.current === 'light',

    /** 是否为系统模式 */
    isSystem: state => state.mode === 'system',
  },

  actions: {
    /**
     * 初始化主题
     */
    initialize() {
      // 计算实际应用的主题
      this.updateCurrentTheme()

      // 应用主题到 DOM
      applyTheme(this.current)

      // 监听系统主题变化（仅在系统模式下）
      if (this.mode === 'system') {
        this.watchSystemTheme()
      }
    },

    /**
     * 切换主题模式
     */
    setTheme(mode: ThemeMode) {
      this.mode = mode

      // 更新实际应用的主题
      this.updateCurrentTheme()

      // 应用主题到 DOM
      applyTheme(this.current)

      // 处理系统主题监听
      if (mode === 'system') {
        this.watchSystemTheme()
      } else {
        this.unwatchSystemTheme()
      }
    },

    /**
     * 切换明亮/暗黑模式
     */
    toggleTheme() {
      const newMode: ThemeMode = this.current === 'dark' ? 'light' : 'dark'
      this.setTheme(newMode)
    },

    /**
     * 更新实际应用的主题
     */
    updateCurrentTheme() {
      this.current = calculateCurrentTheme(this.mode)
    },

    /**
     * 监听系统主题变化
     */
    watchSystemTheme() {
      if (import.meta.server) return

      // 清理之前的监听器
      this.unwatchSystemTheme()

      // 设置新的监听器
      this.unwatchSystemTheme = watchSystemTheme(theme => {
        if (this.mode === 'system') {
          this.current = theme
          applyTheme(theme)
        }
      })
    },

    /**
     * 清理系统主题监听器
     */
    unwatchSystemTheme() {
      // 这个函数会在 watchSystemTheme 中被重新赋值
    },
  },

  persist: true,
})
