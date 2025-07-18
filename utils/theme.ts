import type { ThemeMode } from '~/types/theme'
import { THEME_STORAGE_KEY } from '~/constants/theme'

/**
 * 主题工具函数
 */

/**
 * 检测系统是否支持暗黑模式
 */
export const supportsDarkMode = (): boolean => {
  if (import.meta.server) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 检测系统主题偏好
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (import.meta.server) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * 监听系统主题变化
 */
export const watchSystemTheme = (
  callback: (_theme: 'light' | 'dark') => void
): (() => void) => {
  if (import.meta.server) return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = () => {
    const theme = mediaQuery.matches ? 'dark' : 'light'
    callback(theme)
  }

  mediaQuery.addEventListener('change', handleChange)

  return () => {
    mediaQuery.removeEventListener('change', handleChange)
  }
}

/**
 * 从本地存储获取主题设置
 */
export const getStoredTheme = (): ThemeMode | null => {
  if (import.meta.server) return null

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return (stored as ThemeMode) || null
  } catch {
    return null
  }
}

/**
 * 保存主题设置到本地存储
 */
export const setStoredTheme = (theme: ThemeMode): void => {
  if (import.meta.server) return

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}

/**
 * 应用主题到 DOM
 */
export const applyTheme = (theme: 'light' | 'dark'): void => {
  if (import.meta.server) return

  const root = document.documentElement

  // 移除现有主题类
  root.classList.remove('light', 'dark')

  // 添加新主题类
  root.classList.add(theme)

  // 设置 data-theme 属性
  root.setAttribute('data-theme', theme)
}

/**
 * 计算实际应用的主题
 */
export const calculateCurrentTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    return getSystemTheme()
  }
  return mode
}

/**
 * 获取主题图标
 */
export const getThemeIcon = (theme: ThemeMode): string => {
  switch (theme) {
    case 'light':
      return 'sun'
    case 'dark':
      return 'moon'
    case 'system':
      return 'computer'
    default:
      return 'sun'
  }
}

/**
 * 获取主题切换图标（用于切换按钮）
 */
export const getThemeToggleIcon = (currentTheme: 'light' | 'dark'): string => {
  return currentTheme === 'dark' ? 'sun' : 'moon'
}
