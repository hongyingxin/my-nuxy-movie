/**
 * 电视剧 API 类型定义
 */

import type { 
  TvShowItem, 
  TvShowPaginatedResponse, 
  CreditsResponse, 
  VideosResponse, 
  ImagesResponse,
  ExternalIds,
  Season
} from './common'

// ==================== 电视剧详情类型 ====================

/**
 * 电视剧详情类型
 */
export interface TvShowDetail extends TvShowItem {
  created_by: Array<{
    id: number
    name: string
    gender: number
    profile_path: string | null
  }>
  episode_run_time: number[]
  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  networks: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
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
  seasons: Season[]
  spoken_languages: Array<{
    iso_639_1: string
    name: string
  }>
  status: string
  type: string
  videos: VideosResponse
  images: ImagesResponse
  credits: CreditsResponse
  external_ids: ExternalIds
  content_ratings: {
    results: Array<{
      descriptors: string[]
      iso_3166_1: string
      rating: string
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

// ==================== 电视剧列表类型 ====================

/**
 * 热门电视剧响应类型
 */
export type PopularTvShowsResponse = TvShowPaginatedResponse

/**
 * 正在播出电视剧响应类型
 */
export type OnTheAirTvShowsResponse = TvShowPaginatedResponse

/**
 * 即将播出电视剧响应类型
 */
export type AiringTodayTvShowsResponse = TvShowPaginatedResponse

/**
 * 高分电视剧响应类型
 */
export type TopRatedTvShowsResponse = TvShowPaginatedResponse

/**
 * 相似电视剧响应类型
 */
export type SimilarTvShowsResponse = TvShowPaginatedResponse

/**
 * 推荐电视剧响应类型
 */
export type TvShowRecommendationsResponse = TvShowPaginatedResponse

// ==================== 电视剧搜索类型 ====================

/**
 * 电视剧搜索结果类型
 */
export interface TvShowSearchResult {
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  genre_ids: number[]
  first_air_date: string
  origin_country: string[]
  media_type: 'tv'
}

/**
 * 电视剧搜索响应类型
 */
export interface TvShowSearchResponse {
  page: number
  results: TvShowSearchResult[]
  total_pages: number
  total_results: number
}

// ==================== 季数类型 ====================

/**
 * 季数详情类型
 */
export interface SeasonDetail extends Season {
  episodes: Array<{
    id: number
    name: string
    overview: string
    still_path: string | null
    air_date: string
    episode_number: number
    production_code: string
    season_number: number
    show_id: number
    vote_average: number
    vote_count: number
    crew: Array<{
      id: number
      name: string
      job: string
      department: string
      profile_path: string | null
      credit_id: string
    }>
    guest_stars: Array<{
      id: number
      name: string
      character: string
      profile_path: string | null
      credit_id: string
      order: number
    }>
  }>
  credits: CreditsResponse
  external_ids: ExternalIds
  images: {
    id: number
    posters: Array<{
      aspect_ratio: number
      file_path: string
      height: number
      iso_639_1: string | null
      vote_average: number
      vote_count: number
      width: number
    }>
  }
  videos: VideosResponse
}

/**
 * 季数响应类型
 */
export type SeasonResponse = SeasonDetail

// ==================== 集数类型 ====================

/**
 * 集数详情类型
 */
export interface EpisodeDetail {
  id: number
  name: string
  overview: string
  still_path: string | null
  air_date: string
  episode_number: number
  production_code: string
  season_number: number
  show_id: number
  vote_average: number
  vote_count: number
  crew: Array<{
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
    credit_id: string
  }>
  guest_stars: Array<{
    id: number
    name: string
    character: string
    profile_path: string | null
    credit_id: string
    order: number
  }>
  images: {
    id: number
    stills: Array<{
      aspect_ratio: number
      file_path: string
      height: number
      iso_639_1: string | null
      vote_average: number
      vote_count: number
      width: number
    }>
  }
  videos: VideosResponse
  external_ids: ExternalIds
}

/**
 * 集数响应类型
 */
export type EpisodeResponse = EpisodeDetail

// ==================== 电视剧变更类型 ====================

/**
 * 电视剧变更类型
 */
export interface TvShowChange {
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
 * 电视剧变更响应类型
 */
export interface TvShowChangesResponse {
  changes: TvShowChange[]
}

// ==================== 电视剧账户状态类型 ====================

/**
 * 电视剧账户状态类型
 */
export interface TvShowAccountStates {
  id: number
  favorite: boolean
  rated: {
    value: number
  } | false
  watchlist: boolean
}

// ==================== 电视剧列表类型 ====================

/**
 * 电视剧列表项类型
 */
export interface TvShowListItem {
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  original_language: string
  genre_ids: number[]
  first_air_date: string
  origin_country: string[]
  media_type: 'tv'
}

/**
 * 电视剧列表响应类型
 */
export interface TvShowListResponse {
  page: number
  results: TvShowListItem[]
  total_pages: number
  total_results: number
}

// ==================== 导出类型 ====================

export type {
  TvShowItem,
  TvShowPaginatedResponse,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  ExternalIds,
  Season
} 