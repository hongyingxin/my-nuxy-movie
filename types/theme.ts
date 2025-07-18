/**
 * 主题相关类型定义
 */

/** 主题模式枚举 */
export type ThemeMode = 'light' | 'dark' | 'system'

/** 主题状态 */
export interface ThemeState {
  /** 当前主题模式 */
  mode: ThemeMode
  /** 实际应用的主题（根据系统偏好计算得出） */
  current: 'light' | 'dark'
  /** 是否已初始化 */
  initialized: boolean
}

/** 主题切换选项 */
export interface ThemeOption {
  /** 主题值 */
  value: ThemeMode
  /** 显示名称 */
  label: string
  /** 图标 */
  icon: string
  /** 描述 */
  description: string
}
