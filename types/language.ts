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

/**
 * TMDB 支持的内容原始语言类型
 *
 * 用于 /configuration/languages 接口返回的语言对象，
 * 可用于内容筛选（with_original_language 参数）等场景。
 *
 * @field iso_639_1      ISO 639-1 语言代码（如 'en', 'zh', 'ja'）
 * @field english_name   语言的英文名称（如 'English', 'Chinese', 'Japanese'）
 * @field name           语言的本地名称（如 'English', '中文', '日本語'）
 */
export interface TmdbLanguage {
  /** ISO 639-1 语言代码 */
  iso_639_1: string
  /** 英文名称 */
  english_name: string
  /** 本地名称 */
  name: string
}
