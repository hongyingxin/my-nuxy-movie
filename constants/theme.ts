import type { ThemeOption } from '~/types/theme'

/**
 * 主题相关常量
 */

/** 主题切换选项 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'theme.lightMode',
    icon: 'sun',
    description: 'theme.lightModeDescription',
  },
  {
    value: 'dark',
    label: 'theme.darkMode',
    icon: 'moon',
    description: 'theme.darkModeDescription',
  },
  {
    value: 'system',
    label: 'theme.systemMode',
    icon: 'computer',
    description: 'theme.systemModeDescription',
  },
]

/** 默认主题模式 */
export const DEFAULT_THEME_MODE = 'system' as const

/** CSS 变量前缀 */
export const CSS_VAR_PREFIX = '--nuxt-movie'

/** 主题切换动画持续时间（毫秒） */
export const THEME_TRANSITION_DURATION = 200
