/**
 * 语言常量
 * 用于电影和电视剧筛选中的语言选择
 */

export const LANGUAGE_NAMES: Record<string, string> = {
  zh: '中文',
  en: '英语',
  ja: '日语',
  ko: '韩语',
  fr: '法语',
  de: '德语',
  es: '西班牙语',
}

/**
 * 语言选项列表
 * 用于下拉选择框
 */
export const LANGUAGE_OPTIONS = [
  { value: '', label: '所有语言' },
  { value: 'zh', label: '中文' },
  { value: 'en', label: '英语' },
  { value: 'ja', label: '日语' },
  { value: 'ko', label: '韩语' },
  { value: 'fr', label: '法语' },
  { value: 'de', label: '德语' },
  { value: 'es', label: '西班牙语' },
]

/**
 * 获取语言名称
 * @param code 语言代码
 * @returns 语言中文名称，如果不存在则返回原代码
 */
export const getLanguageName = (code: string): string => {
  return LANGUAGE_NAMES[code] || code
}
