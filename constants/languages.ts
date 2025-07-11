/**
 * 语言常量
 * 明确区分界面语言和内容筛选语言
 */

// ==================== 界面语言配置 ====================
/**
 * 界面语言选项（用于 TMDB API 的 language 参数）
 * 影响返回数据的语言（标题翻译、简介翻译等）
 */
export const UI_LANGUAGE_OPTIONS = [
  { value: 'zh-CN', label: '中文（简体）' },
  { value: 'zh-TW', label: '中文（繁体）' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' },
]

/**
 * 默认界面语言
 */
export const DEFAULT_UI_LANGUAGE = 'zh-CN'

// ==================== 内容筛选语言配置 ====================
/**
 * 内容原始语言名称映射
 */
export const CONTENT_LANGUAGE_NAMES: Record<string, string> = {
  zh: '中文',
  en: '英语',
  ja: '日语',
  ko: '韩语',
  fr: '法语',
  de: '德语',
  es: '西班牙语',
  pt: '葡萄牙语',
  ru: '俄语',
  it: '意大利语',
  ar: '阿拉伯语',
  hi: '印地语',
  th: '泰语',
}

/**
 * 内容筛选语言选项（用于 TMDB API 的 with_original_language 参数）
 * 用于筛选特定原始语言的电影/电视剧
 */
export const CONTENT_LANGUAGE_OPTIONS = [
  { value: '', label: '所有语言' },
  { value: 'zh', label: '中文' },
  { value: 'en', label: '英语' },
  { value: 'ja', label: '日语' },
  { value: 'ko', label: '韩语' },
  { value: 'fr', label: '法语' },
  { value: 'de', label: '德语' },
  { value: 'es', label: '西班牙语' },
  { value: 'pt', label: '葡萄牙语' },
  { value: 'ru', label: '俄语' },
  { value: 'it', label: '意大利语' },
  { value: 'ar', label: '阿拉伯语' },
  { value: 'hi', label: '印地语' },
  { value: 'th', label: '泰语' },
]

// ==================== 兼容性导出 ====================
/**
 * @deprecated 使用 CONTENT_LANGUAGE_NAMES 替代
 */
export const LANGUAGE_NAMES = CONTENT_LANGUAGE_NAMES

/**
 * @deprecated 使用 CONTENT_LANGUAGE_OPTIONS 替代
 */
export const LANGUAGE_OPTIONS = CONTENT_LANGUAGE_OPTIONS

// ==================== 工具函数 ====================
/**
 * 获取内容语言名称
 * @param code 语言代码
 * @returns 语言中文名称，如果不存在则返回原代码
 */
export const getContentLanguageName = (code: string): string => {
  return CONTENT_LANGUAGE_NAMES[code] || code
}

/**
 * 获取界面语言名称
 * @param code 语言代码
 * @returns 语言名称，如果不存在则返回原代码
 */
export const getUILanguageName = (code: string): string => {
  const option = UI_LANGUAGE_OPTIONS.find(opt => opt.value === code)
  return option?.label || code
}

/**
 * @deprecated 使用 getContentLanguageName 替代
 */
export const getLanguageName = getContentLanguageName
