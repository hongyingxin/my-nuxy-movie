/**
 * 电影 API 类型定义
 */

import type {
  MovieItem,
  MoviePaginatedResponse,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  ExternalIds,
} from './common'

// ==================== 电影详情类型 ====================

/**
 * 电影详情类型
 */
export interface MovieDetail extends MovieItem {
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
  budget: number
  revenue: number
  runtime: number
  status: string
  tagline: string
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  spoken_languages: Array<{
    iso_639_1: string
    name: string
  }>
  genres: Array<{
    id: number
    name: string
  }>
  keywords: {
    keywords: Array<{
      id: number
      name: string
    }>
  }
  videos: VideosResponse
  images: ImagesResponse
  credits: CreditsResponse
  external_ids: ExternalIds
  release_dates: {
    results: Array<{
      iso_3166_1: string
      release_dates: Array<{
        certification: string
        descriptors: string[]
        iso_639_1: string
        note: string
        release_date: string
        type: number
      }>
    }>
  }
  watch_providers: {
    results: {
      [countryCode: string]: {
        link: string
        flatrate?: Array<{
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }>
        rent?: Array<{
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }>
        buy?: Array<{
          logo_path: string
          provider_id: number
          provider_name: string
          display_priority: number
        }>
      }
    }
  }
}

// ==================== 电影列表类型 ====================

/**
 * 热门电影响应类型
 */
export type PopularMoviesResponse = MoviePaginatedResponse

/**
 * 正在上映电影响应类型
 */
export type NowPlayingMoviesResponse = MoviePaginatedResponse

/**
 * 即将上映电影响应类型
 */
export type UpcomingMoviesResponse = MoviePaginatedResponse

/**
 * 高分电影响应类型
 */
export type TopRatedMoviesResponse = MoviePaginatedResponse

/**
 * 相似电影响应类型
 */
export type SimilarMoviesResponse = MoviePaginatedResponse

/**
 * 推荐电影响应类型
 */
export type MovieRecommendationsResponse = MoviePaginatedResponse

// ==================== 电影搜索类型 ====================

/**
 * 电影搜索结果类型
 */
export interface MovieSearchResult {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  genre_ids: number[]
  release_date: string
  video: boolean
  media_type: 'movie'
}

/**
 * 电影搜索响应类型
 */
export interface MovieSearchResponse {
  page: number
  results: MovieSearchResult[]
  total_pages: number
  total_results: number
}

// ==================== 电影评分类型 ====================

/**
 * 电影评分请求类型
 */
export interface MovieRatingRequest {
  value: number
}

/**
 * 电影评分响应类型
 */
export interface MovieRatingResponse {
  status_code: number
  status_message: string
}

// ==================== 电影变更类型 ====================

/**
 * 电影变更类型
 */
export interface MovieChange {
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
 * 电影变更响应类型
 */
export interface MovieChangesResponse {
  changes: MovieChange[]
}

// ==================== 电影账户状态类型 ====================

/**
 * 电影账户状态类型
 */
export interface MovieAccountStates {
  id: number
  favorite: boolean
  rated:
    | {
        value: number
      }
    | false
  watchlist: boolean
}

// ==================== 电影列表类型 ====================

/**
 * 电影列表项类型
 */
export interface MovieListItem {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  genre_ids: number[]
  release_date: string
  video: boolean
  media_type: 'movie'
}

/**
 * 电影列表响应类型
 */
export interface MovieListResponse {
  page: number
  results: MovieListItem[]
  total_pages: number
  total_results: number
}

// ==================== 导出类型 ====================

export type {
  MovieItem,
  MoviePaginatedResponse,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  ExternalIds,
}
