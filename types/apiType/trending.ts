/**
 * 趋势内容 API 类型定义
 */

import type { MediaType, MovieItem, TvShowItem, PersonItem } from './common'

// ==================== 趋势内容类型 ====================

/**
 * 趋势内容项目类型
 */
export interface TrendingItem {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  original_title?: string
  original_name?: string
  genre_ids: number[]
  media_type: MediaType
  // 电影特有字段
  release_date?: string
  video?: boolean
  // 电视剧特有字段
  first_air_date?: string
  origin_country?: string[]
  // 演员特有字段
  profile_path?: string | null
  known_for_department?: string
  gender?: number
  known_for?: Array<{
    id: number
    title?: string
    name?: string
    media_type: MediaType
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    overview: string
    release_date?: string
    first_air_date?: string
  }>
}

/**
 * 趋势内容响应类型
 */
export interface TrendingResponse {
  page: number
  results: TrendingItem[]
  total_pages: number
  total_results: number
}

// ==================== 时间窗口类型 ====================

/**
 * 趋势时间窗口类型
 */
export type TrendingTimeWindow = 'day' | 'week'

// ==================== 趋势媒体类型 ====================

/**
 * 趋势媒体类型
 */
export type TrendingMediaType = 'all' | 'movie' | 'tv' | 'person'

// ==================== 趋势分类类型 ====================

/**
 * 趋势分类类型
 */
export interface TrendingCategory {
  timeWindow: TrendingTimeWindow
  mediaType: TrendingMediaType
  label: string
  description: string
}

/**
 * 趋势分类选项
 */
export const TRENDING_CATEGORIES: TrendingCategory[] = [
  {
    timeWindow: 'day',
    mediaType: 'all',
    label: '今日趋势',
    description: '今日最热门的电影、电视剧和演员'
  },
  {
    timeWindow: 'week',
    mediaType: 'all',
    label: '本周趋势',
    description: '本周最热门的电影、电视剧和演员'
  },
  {
    timeWindow: 'day',
    mediaType: 'movie',
    label: '今日热门电影',
    description: '今日最热门的电影'
  },
  {
    timeWindow: 'week',
    mediaType: 'movie',
    label: '本周热门电影',
    description: '本周最热门的电影'
  },
  {
    timeWindow: 'day',
    mediaType: 'tv',
    label: '今日热门电视剧',
    description: '今日最热门的电视剧'
  },
  {
    timeWindow: 'week',
    mediaType: 'tv',
    label: '本周热门电视剧',
    description: '本周最热门的电视剧'
  },
  {
    timeWindow: 'day',
    mediaType: 'person',
    label: '今日热门演员',
    description: '今日最热门的演员'
  },
  {
    timeWindow: 'week',
    mediaType: 'person',
    label: '本周热门演员',
    description: '本周最热门的演员'
  }
]

// ==================== 趋势参数类型 ====================

/**
 * 趋势内容请求参数类型
 */
export interface TrendingParams {
  mediaType?: TrendingMediaType
  timeWindow?: TrendingTimeWindow
  page?: number
}

// ==================== 趋势工具类型 ====================

/**
 * 趋势内容工具函数参数类型
 */
export interface TrendingUtilsParams {
  items: TrendingItem[]
  maxItems?: number
  filterMediaType?: MediaType
}

/**
 * 趋势内容分组结果类型
 */
export interface TrendingGroupResult {
  movies: MovieItem[]
  tvShows: TvShowItem[]
  people: PersonItem[]
  all: TrendingItem[]
}

// ==================== 导出类型 ====================

export type {
  MediaType,
  MovieItem,
  TvShowItem,
  PersonItem
} 