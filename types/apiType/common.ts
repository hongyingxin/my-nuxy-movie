/**
 * 通用 API 类型定义
 * 包含电影、电视剧、演员等共用的类型
 */

// ==================== 基础类型 ====================

/**
 * 媒体类型
 */
export type MediaType = 'movie' | 'tv'

/**
 * 基础媒体项目类型
 */
export interface BaseMediaItem {
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
  media_type?: MediaType
}

/**
 * 电影项目类型
 */
export interface MovieItem extends BaseMediaItem {
  title: string
  original_title: string
  release_date: string
  video: boolean
  // 电影特有字段
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  spoken_languages?: SpokenLanguage[]
  genres?: Genre[]
  keywords?: {
    keywords: Keyword[]
  }
}

/**
 * 电视剧项目类型
 */
export interface TvShowItem extends BaseMediaItem {
  name: string
  original_name: string
  first_air_date: string
  last_air_date?: string
  // 电视剧特有字段
  number_of_seasons?: number
  number_of_episodes?: number
  status?: string
  type?: string
  in_production?: boolean
  networks?: Network[]
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  spoken_languages?: SpokenLanguage[]
  genres?: Genre[]
  seasons?: Season[]
  episode_run_time?: number[]
  origin_country?: string[]
}

/**
 * 演员项目类型
 */
export interface PersonItem {
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
}

// ==================== 详情类型 ====================

/**
 * 演员详情类型
 */
export interface PersonDetail {
  id: number
  name: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  biography: string
  profile_path: string | null
  known_for_department: string
  popularity: number
  gender: number
  imdb_id: string | null
  homepage: string | null
}

/**
 * 演职员类型
 */
export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  credit_id: string
  order: number
  known_for_department: string
  gender: number
  popularity: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
  credit_id: string
  known_for_department: string
  gender: number
  popularity: number
}

/**
 * 演职员响应类型
 */
export interface CreditsResponse {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

// ==================== 视频类型 ====================

/**
 * 视频类型
 */
export interface Video {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  iso_639_1: string
  iso_3166_1: string
}

/**
 * 视频响应类型
 */
export interface VideosResponse {
  id: number
  results: Video[]
}

// ==================== 图片类型 ====================

/**
 * 图片类型
 */
export interface Image {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

/**
 * 图片响应类型
 */
export interface ImagesResponse {
  id: number
  backdrops: Image[]
  posters: Image[]
  logos: Image[]
}

/**
 * 演员图片响应类型
 */
export interface PersonImagesResponse {
  id: number
  profiles: Image[]
}

// ==================== 辅助类型 ====================

/**
 * 分类类型
 */
export interface Genre {
  id: number
  name: string
}

/**
 * 制作公司类型
 */
export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

/**
 * 制作国家类型
 */
export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

/**
 * 语言类型
 */
export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

/**
 * 网络类型
 */
export interface Network {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

/**
 * 季数类型
 */
export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date: string
}

/**
 * 关键词类型
 */
export interface Keyword {
  id: number
  name: string
}

/**
 * 外部ID类型
 */
export interface ExternalIds {
  id: number
  imdb_id: string | null
  facebook_id: string | null
  freebase_mid: string | null
  freebase_id: string | null
  tvrage_id: number | null
  twitter_id: string | null
  instagram_id: string | null
}

// ==================== 分页响应类型 ====================

/**
 * 分页响应基础类型
 */
export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

/**
 * 电影分页响应类型
 */
export type MoviePaginatedResponse = PaginatedResponse<MovieItem>

/**
 * 电视剧分页响应类型
 */
export type TvShowPaginatedResponse = PaginatedResponse<TvShowItem>

/**
 * 演员分页响应类型
 */
export type PersonPaginatedResponse = PaginatedResponse<PersonItem>

// ==================== 搜索类型 ====================

/**
 * 搜索结果类型
 */
export interface SearchResult {
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
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
  original_title?: string
  original_name?: string
}

/**
 * 搜索响应类型
 */
export type SearchResponse = PaginatedResponse<SearchResult>

// ==================== 工具类型 ====================

/**
 * 媒体项目联合类型
 */
export type MediaItem = MovieItem | TvShowItem

/**
 * 获取媒体标题的工具类型
 */
export type MediaTitle = {
  [K in MediaType]: K extends 'movie' ? { title: string } : { name: string }
}[MediaType]

/**
 * 获取媒体发布日期的工具类型
 */
export type MediaReleaseDate = {
  [K in MediaType]: K extends 'movie' ? { release_date: string } : { first_air_date: string }
}[MediaType] 