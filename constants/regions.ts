/**
 * 地区常量
 * 用于电影筛选中的地区选择
 */

export const REGION_NAMES: Record<string, string> = {
  US: '美国',
  CN: '中国',
  JP: '日本',
  KR: '韩国',
  GB: '英国',
  FR: '法国',
  DE: '德国',
  CA: '加拿大',
  AU: '澳大利亚',
  IN: '印度',
}

/**
 * 地区选项列表
 * 用于下拉选择框
 */
export const REGION_OPTIONS = [
  { value: '', label: '全球' },
  { value: 'US', label: '美国' },
  { value: 'CN', label: '中国' },
  { value: 'JP', label: '日本' },
  { value: 'KR', label: '韩国' },
  { value: 'GB', label: '英国' },
  { value: 'FR', label: '法国' },
  { value: 'DE', label: '德国' },
  { value: 'CA', label: '加拿大' },
  { value: 'AU', label: '澳大利亚' },
  { value: 'IN', label: '印度' },
]

/**
 * 获取地区名称
 * @param code 地区代码
 * @returns 地区中文名称，如果不存在则返回原代码
 */
export const getRegionName = (code: string): string => {
  return REGION_NAMES[code] || code
}
