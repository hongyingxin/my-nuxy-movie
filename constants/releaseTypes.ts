/**
 * 上映类型常量
 * 用于电影筛选中的上映类型选择
 *
 * 参考 TMDB API 文档：
 * 1 = Premiere (首映)
 * 2 = Theatrical (limited) (有限影院上映)
 * 3 = Theatrical (影院上映)
 * 4 = Digital (数字发行)
 * 5 = Physical (实体发行)
 * 6 = TV (电视播出)
 */

export const RELEASE_TYPE_NAMES: Record<string, string> = {
  '2|3': '影院上映',
  '3|2': '影院上映',
  '4': '数字发行',
  '5': '实体发行',
  '6': '电视播出',
}

/**
 * 上映类型选项列表
 * 用于下拉选择框
 */
export const RELEASE_TYPE_OPTIONS = [
  { value: '', label: '所有类型' },
  { value: '2|3', label: '影院上映' },
  { value: '3|2', label: '影院上映 (优先)' },
  { value: '4', label: '数字发行' },
  { value: '5', label: '实体发行' },
  { value: '6', label: '电视播出' },
]

/**
 * 获取上映类型名称
 * @param code 上映类型代码
 * @returns 上映类型中文名称，如果不存在则返回空字符串
 */
export const getReleaseTypeName = (code: string): string => {
  return RELEASE_TYPE_NAMES[code] || ''
}

/**
 * 影院上映类型代码
 */
export const THEATRICAL_RELEASE_TYPES = ['2|3', '3|2']

/**
 * 检查是否为影院上映类型
 * @param code 上映类型代码
 * @returns 是否为影院上映
 */
export const isTheatricalRelease = (code: string): boolean => {
  return THEATRICAL_RELEASE_TYPES.includes(code)
}
