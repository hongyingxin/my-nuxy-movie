/**
 * 分类 API 类型定义
 */

// ==================== 分类类型 ====================

/**
 * 分类类型
 */
export interface Genre {
  id: number
  name: string
}

/**
 * 分类响应类型
 */
export interface GenreResponse {
  genres: Genre[]
}

// ==================== 电影分类类型 ====================

/**
 * 电影分类响应类型
 */
export type MovieGenreResponse = GenreResponse

// ==================== 电视剧分类类型 ====================

/**
 * 电视剧分类响应类型
 */
export type TvGenreResponse = GenreResponse

// ==================== 分类统计类型 ====================

/**
 * 分类统计类型
 */
export interface GenreStats {
  genreId: number
  genreName: string
  count: number
  percentage: number
}

/**
 * 分类统计响应类型
 */
export interface GenreStatsResponse {
  stats: GenreStats[]
  total: number
}

// ==================== 分类筛选类型 ====================

/**
 * 分类筛选选项类型
 */
export interface GenreFilterOption {
  id: number
  name: string
  count?: number
  selected?: boolean
}

/**
 * 分类筛选组类型
 */
export interface GenreFilterGroup {
  label: string
  options: GenreFilterOption[]
  multiple?: boolean
}

// ==================== 分类映射类型 ====================

/**
 * 分类映射类型
 */
export interface GenreMap {
  [key: number]: string
}

/**
 * 反向分类映射类型
 */
export interface ReverseGenreMap {
  [key: string]: number
}

// ==================== 分类工具类型 ====================

/**
 * 分类工具函数参数类型
 */
export interface GenreUtilsParams {
  genreIds: number[]
  genreMap: GenreMap
  maxDisplay?: number
  separator?: string
}

/**
 * 分类格式化结果类型
 */
export interface GenreFormatResult {
  display: string
  full: string
  truncated: boolean
  count: number
} 