/**
 * 演员 API 类型定义
 */

import type { 
  PersonItem, 
  PersonPaginatedResponse, 
  PersonDetail,
  PersonImagesResponse,
  ExternalIds,
  MediaType
} from './common'

// ==================== 演员作品类型 ====================

/**
 * 演员作品项目类型
 */
export interface PersonCreditItem {
  id: number
  title?: string
  name?: string
  character: string
  release_date?: string
  first_air_date?: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  media_type: MediaType
  credit_id: string
  order?: number
  job?: string
  department?: string
  episode_count?: number
  adult: boolean
  original_language: string
  original_title?: string
  original_name?: string
  genre_ids: number[]
  popularity: number
  overview: string
}

/**
 * 演员作品响应类型
 */
export interface PersonCreditsResponse {
  id: number
  cast: PersonCreditItem[]
  crew: PersonCreditItem[]
}

// ==================== 演员电影作品类型 ====================

/**
 * 演员电影作品项目类型
 */
export interface PersonMovieCreditItem {
  id: number
  title: string
  character: string
  release_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  credit_id: string
  order: number
  adult: boolean
  original_language: string
  original_title: string
  genre_ids: number[]
  popularity: number
  overview: string
  video: boolean
}

/**
 * 演员电影工作人员项目类型
 */
export interface PersonMovieCrewItem {
  id: number
  title: string
  job: string
  department: string
  release_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  credit_id: string
  adult: boolean
  original_language: string
  original_title: string
  genre_ids: number[]
  popularity: number
  overview: string
  video: boolean
}

/**
 * 演员电影作品响应类型
 */
export interface PersonMovieCreditsResponse {
  id: number
  cast: PersonMovieCreditItem[]
  crew: PersonMovieCrewItem[]
}

// ==================== 演员电视剧作品类型 ====================

/**
 * 演员电视剧作品项目类型
 */
export interface PersonTvCreditItem {
  id: number
  name: string
  character: string
  first_air_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  credit_id: string
  order: number
  adult: boolean
  original_language: string
  original_name: string
  genre_ids: number[]
  popularity: number
  overview: string
  origin_country: string[]
}

/**
 * 演员电视剧工作人员项目类型
 */
export interface PersonTvCrewItem {
  id: number
  name: string
  job: string
  department: string
  first_air_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  credit_id: string
  adult: boolean
  original_language: string
  original_name: string
  genre_ids: number[]
  popularity: number
  overview: string
  origin_country: string[]
}

/**
 * 演员电视剧作品响应类型
 */
export interface PersonTvCreditsResponse {
  id: number
  cast: PersonTvCreditItem[]
  crew: PersonTvCrewItem[]
}

// ==================== 演员搜索类型 ====================

/**
 * 演员搜索结果类型
 */
export interface PersonSearchResult {
  id: number
  name: string
  profile_path: string | null
  adult: boolean
  popularity: number
  known_for_department: string
  gender: number
  known_for: Array<{
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
  media_type: 'person'
}

/**
 * 演员搜索响应类型
 */
export interface PersonSearchResponse {
  page: number
  results: PersonSearchResult[]
  total_pages: number
  total_results: number
}

// ==================== 演员变更类型 ====================

/**
 * 演员变更类型
 */
export interface PersonChange {
  key: string
  items: Array<{
    id: string
    action: string
    time: string
    iso_639_1: string
    iso_3166_1: string
    value: string | number | boolean | object
    original_value: string | number | boolean | object
  }>
}

/**
 * 演员变更响应类型
 */
export interface PersonChangesResponse {
  changes: PersonChange[]
}

// ==================== 演员标签图片类型 ====================

/**
 * 演员标签图片类型
 */
export interface PersonTaggedImage {
  aspect_ratio: number
  file_path: string
  height: number
  id: string
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
  image_type: string
  media: {
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
  }
  media_type: MediaType
}

/**
 * 演员标签图片响应类型
 */
export interface PersonTaggedImagesResponse {
  id: number
  page: number
  results: PersonTaggedImage[]
  total_pages: number
  total_results: number
}

// ==================== 演员列表类型 ====================

/**
 * 演员列表项类型
 */
export interface PersonListItem {
  id: number
  name: string
  profile_path: string | null
  adult: boolean
  popularity: number
  known_for_department: string
  gender: number
  known_for: Array<{
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
  media_type: 'person'
}

/**
 * 演员列表响应类型
 */
export interface PersonListResponse {
  page: number
  results: PersonListItem[]
  total_pages: number
  total_results: number
}

// ==================== 导出类型 ====================

export type {
  PersonItem,
  PersonPaginatedResponse,
  PersonDetail,
  PersonImagesResponse,
  ExternalIds,
  MediaType
} 