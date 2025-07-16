/**
 * Discover 页面类型定义
 * 用于 /discover/[type] 页面的类型定义
 */

import type { AsyncData } from 'nuxt/app'
import type {
  MovieDiscoverResponse,
  TvShowDiscoverResponse,
} from '~/types/apiType'
import type { FetchError } from 'ofetch'

/**
 * HTTP 响应包装类型
 */
export interface ResOptions<T> {
  data: T
  code: number
  success: boolean
  detail?: string
}

// ==================== 列表数据类型 ====================

export type ListAsyncData =
  | AsyncData<
      MovieDiscoverResponse | TvShowDiscoverResponse,
      FetchError<ResOptions<MovieDiscoverResponse | TvShowDiscoverResponse>>
    >
  | undefined

// ==================== 筛选器类型 ====================

/**
 * 筛选条件类型
 */
export interface DiscoverFilters {
  sort_by: string
  with_genres: number[]
  'vote_average.gte': number
  'air_date.gte': string | null
  'air_date.lte': string | null
  'primary_release_date.gte': string | null
  'primary_release_date.lte': string | null
  'release_date.gte': string | null
  'release_date.lte': string | null
  'first_air_date.gte': string | null
  'first_air_date.lte': string | null
  with_original_language: string
  with_status: string | null
  region: string
  with_release_type: string
}

/**
 * 日期范围类型
 */
export interface DateRange {
  startDate: string | null
  endDate: string | null
}

/**
 * 筛选参数类型
 */
export interface FilterParams {
  sortBy: string
  withStatus: string | null
  airDateGte: string | null
  airDateLte: string | null
}

// ==================== 工具类型 ====================

/**
 * 路由参数类型
 */
export interface DiscoverRouteParams {
  type: 'movie' | 'tv'
}
