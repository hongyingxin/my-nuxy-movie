/**
 * 搜索 API 类型定义
 */

import type { MovieItem, TvShowItem, PersonItem } from './common'

// ==================== 搜索媒体类型 ====================

/**
 * 搜索媒体类型
 */
export type SearchMediaType = 'movie' | 'tv' | 'person'

// ==================== 搜索参数类型 ====================

/**
 * 搜索请求参数类型
 */
export interface SearchParams {
  query: string
  page?: number
  include_adult?: boolean
  language?: string
  region?: string
  year?: number
  primary_release_year?: number
  first_air_date_year?: number
}

/**
 * 多类型搜索参数类型
 */
export interface MultiSearchParams extends SearchParams {
  mediaType?: SearchMediaType
}

// ==================== 搜索结果类型 ====================

/**
 * 搜索结果基础类型
 */
export interface SearchResult {
  id: number
  title?: string
  name?: string
  media_type: SearchMediaType
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  overview: string
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
  original_title?: string
  original_name?: string
}

/**
 * 电影搜索结果类型
 */
export interface MovieSearchResult extends SearchResult {
  title: string
  original_title: string
  release_date: string
  video: boolean
  media_type: 'movie'
}

/**
 * 电视剧搜索结果类型
 */
export interface TvShowSearchResult extends SearchResult {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
  media_type: 'tv'
}

/**
 * 演员搜索结果类型
 */
export interface PersonSearchResult extends SearchResult {
  name: string
  profile_path: string | null
  known_for_department: string
  gender: number
  known_for: Array<{
    id: number
    title?: string
    name?: string
    media_type: SearchMediaType
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    overview: string
    release_date?: string
    first_air_date?: string
  }>
  media_type: 'person'
}

// ==================== 搜索响应类型 ====================

/**
 * 搜索响应基础类型
 */
export interface SearchResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

/**
 * 电影搜索响应类型
 */
export type MovieSearchResponse = SearchResponse<MovieSearchResult>

/**
 * 电视剧搜索响应类型
 */
export type TvShowSearchResponse = SearchResponse<TvShowSearchResult>

/**
 * 演员搜索响应类型
 */
export type PersonSearchResponse = SearchResponse<PersonSearchResult>

/**
 * 多类型搜索响应类型
 */
export type MultiSearchResponse = SearchResponse<SearchResult>

// ==================== 搜索建议类型 ====================

/**
 * 搜索建议类型
 */
export interface SearchSuggestion {
  id: number
  title?: string
  name?: string
  media_type: SearchMediaType
  poster_path: string | null
  backdrop_path: string | null
  profile_path?: string | null
  vote_average?: number
  overview: string
  release_date?: string
  first_air_date?: string
  genre_ids?: number[]
  popularity: number
  adult?: boolean
  original_language?: string
  original_title?: string
  original_name?: string
  known_for_department?: string
  gender?: number
  known_for?: Array<{
    id: number
    title?: string
    name?: string
    media_type: SearchMediaType
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    overview: string
    release_date?: string
    first_air_date?: string
  }>
}

/**
 * 搜索建议响应类型
 */
export interface SearchSuggestionsResponse {
  page: number
  results: SearchSuggestion[]
  total_pages: number
  total_results: number
}

// ==================== 搜索历史类型 ====================

/**
 * 搜索历史项类型
 */
export interface SearchHistoryItem {
  id: string
  query: string
  timestamp: number
  resultCount?: number
  mediaType?: SearchMediaType
}

/**
 * 搜索历史类型
 */
export interface SearchHistory {
  items: SearchHistoryItem[]
  maxItems?: number
}

// ==================== 搜索过滤器类型 ====================

/**
 * 搜索过滤器类型
 */
export interface SearchFilter {
  mediaType?: SearchMediaType
  year?: number
  includeAdult?: boolean
  language?: string
  region?: string
}

/**
 * 搜索过滤器选项类型
 */
export interface SearchFilterOption {
  value: string | number | boolean
  label: string
  count?: number
}

/**
 * 搜索过滤器组类型
 */
export interface SearchFilterGroup {
  key: string
  label: string
  options: SearchFilterOption[]
  multiple?: boolean
  type?: 'select' | 'checkbox' | 'range'
}

// ==================== 搜索工具类型 ====================

/**
 * 搜索工具函数参数类型
 */
export interface SearchUtilsParams {
  query: string
  results: SearchResult[]
  maxResults?: number
  filterMediaType?: SearchMediaType
}

/**
 * 搜索结果分组类型
 */
export interface SearchGroupResult {
  movies: MovieSearchResult[]
  tvShows: TvShowSearchResult[]
  people: PersonSearchResult[]
  all: SearchResult[]
}

/**
 * 搜索统计类型
 */
export interface SearchStats {
  total: number
  movies: number
  tvShows: number
  people: number
  byYear: { [year: string]: number }
  byLanguage: { [language: string]: number }
}

// ==================== 导出类型 ====================

export type { MovieItem, TvShowItem, PersonItem }
