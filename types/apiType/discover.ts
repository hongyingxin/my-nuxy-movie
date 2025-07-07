/**
 * 发现页 API 类型定义
 */

import type { MediaType, MovieItem, TvShowItem } from './common'

// ==================== Discover 参数类型 ====================

/**
 * Discover 筛选参数类型定义
 */
export interface DiscoverParams {
  // 基础参数
  page?: number
  sort_by?: string
  
  // 分类筛选
  with_genres?: string | number
  without_genres?: string | number
  
  // 评分筛选
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  'vote_count.gte'?: number
  
  // 日期筛选
  'primary_release_date.gte'?: string // 电影专用
  'primary_release_date.lte'?: string // 电影专用
  'first_air_date.gte'?: string // 电视剧专用
  'first_air_date.lte'?: string // 电视剧专用
  
  // 语言筛选
  with_original_language?: string
  
  // 地区筛选
  with_origin_country?: string // 电视剧专用
  region?: string // 电影专用
  
  // 关键词筛选
  with_keywords?: string | number
  without_keywords?: string | number
  
  // 公司筛选
  with_companies?: string | number
  
  // 网络筛选 (电视剧专用)
  with_networks?: string | number
  
  // 人员筛选
  with_people?: string | number
  
  // 时长筛选 (电影专用)
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  
  // 状态筛选
  with_status?: string // 电视剧专用: 0=Returning Series, 1=Planned, 2=In Production, 3=Ended, 4=Cancelled, 5=Pilot
  
  // 类型筛选
  with_type?: string // 电视剧专用: 0=Scripted, 1=Documentary, 2=News, 3=Reality, 4=Talk Show, 5=Miniseries
  
  // 认证筛选 (电影专用)
  certification_country?: string
  certification?: string
  'certification.gte'?: string
  'certification.lte'?: string
  
  // 包含成人内容
  include_adult?: boolean
  
  // 包含视频
  include_video?: boolean // 电影专用
  
  // 年份筛选
  year?: number // 电影专用
  'air_date.gte'?: string // 电视剧专用
  'air_date.lte'?: string // 电视剧专用
}

// ==================== Discover 响应类型 ====================

/**
 * Discover 响应类型
 */
export interface DiscoverResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

/**
 * 电影 Discover 响应类型
 */
export type MovieDiscoverResponse = DiscoverResponse<MovieItem>

/**
 * 电视剧 Discover 响应类型
 */
export type TvShowDiscoverResponse = DiscoverResponse<TvShowItem>

// ==================== 排序选项类型 ====================

/**
 * 排序选项类型
 */
export interface SortOption {
  value: string
  label: string
  description?: string
}

/**
 * 电影排序选项
 */
export const MOVIE_SORT_OPTIONS: SortOption[] = [
  { value: 'popularity.asc', label: '人气升序', description: '按人气从低到高排序' },
  { value: 'popularity.desc', label: '人气降序', description: '按人气从高到低排序' },
  { value: 'release_date.asc', label: '上映日期升序', description: '按上映日期从早到晚排序' },
  { value: 'release_date.desc', label: '上映日期降序', description: '按上映日期从晚到早排序' },
  { value: 'revenue.asc', label: '票房升序', description: '按票房从低到高排序' },
  { value: 'revenue.desc', label: '票房降序', description: '按票房从高到低排序' },
  { value: 'primary_release_date.asc', label: '首映日期升序', description: '按首映日期从早到晚排序' },
  { value: 'primary_release_date.desc', label: '首映日期降序', description: '按首映日期从晚到早排序' },
  { value: 'original_title.asc', label: '原标题升序', description: '按原标题字母顺序排序' },
  { value: 'original_title.desc', label: '原标题降序', description: '按原标题字母倒序排序' },
  { value: 'vote_average.asc', label: '评分升序', description: '按评分从低到高排序' },
  { value: 'vote_average.desc', label: '评分降序', description: '按评分从高到低排序' },
  { value: 'vote_count.asc', label: '投票数升序', description: '按投票数从少到多排序' },
  { value: 'vote_count.desc', label: '投票数降序', description: '按投票数从多到少排序' }
]

/**
 * 电视剧排序选项
 */
export const TV_SORT_OPTIONS: SortOption[] = [
  { value: 'popularity.asc', label: '人气升序', description: '按人气从低到高排序' },
  { value: 'popularity.desc', label: '人气降序', description: '按人气从高到低排序' },
  { value: 'air_date.asc', label: '播出日期升序', description: '按播出日期从早到晚排序' },
  { value: 'air_date.desc', label: '播出日期降序', description: '按播出日期从晚到早排序' },
  { value: 'first_air_date.asc', label: '首播日期升序', description: '按首播日期从早到晚排序' },
  { value: 'first_air_date.desc', label: '首播日期降序', description: '按首播日期从晚到早排序' },
  { value: 'name.asc', label: '名称升序', description: '按名称字母顺序排序' },
  { value: 'name.desc', label: '名称降序', description: '按名称字母倒序排序' },
  { value: 'original_name.asc', label: '原名升序', description: '按原名字母顺序排序' },
  { value: 'original_name.desc', label: '原名降序', description: '按原名字母倒序排序' },
  { value: 'vote_average.asc', label: '评分升序', description: '按评分从低到高排序' },
  { value: 'vote_average.desc', label: '评分降序', description: '按评分从高到低排序' },
  { value: 'vote_count.asc', label: '投票数升序', description: '按投票数从少到多排序' },
  { value: 'vote_count.desc', label: '投票数降序', description: '按投票数从多到少排序' }
]

// ==================== 筛选器类型 ====================

/**
 * 筛选器选项类型
 */
export interface FilterOption {
  value: string | number
  label: string
  count?: number
}

/**
 * 筛选器组类型
 */
export interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
  multiple?: boolean
  type?: 'select' | 'range' | 'date' | 'checkbox'
}

/**
 * 筛选器状态类型
 */
export interface FilterState {
  [key: string]: string | number | (string | number)[] | undefined
}

// ==================== 便捷方法参数类型 ====================

/**
 * 根据分类获取媒体参数类型
 */
export interface GenreFilterParams {
  genreId: number
  page?: number
  additionalParams?: Partial<DiscoverParams>
}

/**
 * 获取高分媒体参数类型
 */
export interface HighRatedParams {
  page?: number
  minRating?: number
  minVoteCount?: number
}

/**
 * 获取最新媒体参数类型
 */
export interface LatestParams {
  page?: number
  maxDate?: string
}

/**
 * 获取即将上映媒体参数类型
 */
export interface UpcomingParams {
  page?: number
  minDate?: string
}

// ==================== 导出类型 ====================

export type {
  MediaType,
  MovieItem,
  TvShowItem
} 