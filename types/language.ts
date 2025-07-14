// 语言相关类型定义

/**
 * 支持的界面语言 code 联合类型
 */
export type UILanguageCode = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'ar-SA'

/**
 * 界面语言配置项类型
 */
export interface UILocale {
  code: UILanguageCode
  name: string
  iso: string
  flag: string
}
