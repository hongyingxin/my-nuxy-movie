/**
 * API 类型定义入口文件
 * 统一导出所有 API 相关的 TypeScript 类型
 */

// ==================== 通用类型 ====================
export type {
  MediaType,
  BaseMediaItem,
  MovieItem,
  TvShowItem,
  PersonItem,
  PersonDetail,
  CastMember,
  CrewMember,
  CreditsResponse,
  Video,
  VideosResponse,
  Image,
  ImagesResponse,
  PersonImagesResponse,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  Network,
  Season,
  Keyword,
  ExternalIds,
  PaginatedResponse,
  MoviePaginatedResponse,
  TvShowPaginatedResponse,
  PersonPaginatedResponse,
  SearchResult,
  SearchResponse,
  MediaItem,
  MediaTitle,
  MediaReleaseDate
} from './common'

// ==================== 电影类型 ====================
export type {
  MovieDetail,
  PopularMoviesResponse,
  NowPlayingMoviesResponse,
  UpcomingMoviesResponse,
  TopRatedMoviesResponse,
  SimilarMoviesResponse,
  MovieRecommendationsResponse,
  MovieSearchResult,
  MovieSearchResponse,
  MovieRatingRequest,
  MovieRatingResponse,
  MovieChange,
  MovieChangesResponse,
  MovieAccountStates,
  MovieListItem,
  MovieListResponse
} from './movie'

// ==================== 电视剧类型 ====================
export type {
  TvShowDetail,
  PopularTvShowsResponse,
  OnTheAirTvShowsResponse,
  AiringTodayTvShowsResponse,
  TopRatedTvShowsResponse,
  SimilarTvShowsResponse,
  TvShowRecommendationsResponse,
  TvShowSearchResult,
  TvShowSearchResponse,
  SeasonDetail,
  SeasonResponse,
  EpisodeDetail,
  EpisodeResponse,
  TvShowChange,
  TvShowChangesResponse,
  TvShowAccountStates,
  TvShowListItem,
  TvShowListResponse
} from './tv'

// ==================== 演员类型 ====================
export type {
  PersonCreditItem,
  PersonCreditsResponse,
  PersonMovieCreditItem,
  PersonMovieCrewItem,
  PersonMovieCreditsResponse,
  PersonTvCreditItem,
  PersonTvCrewItem,
  PersonTvCreditsResponse,
  PersonSearchResult,
  PersonSearchResponse,
  PersonChange,
  PersonChangesResponse,
  PersonTaggedImage,
  PersonTaggedImagesResponse,
  PersonListItem,
  PersonListResponse
} from './person'

// ==================== 发现页类型 ====================
export type {
  DiscoverParams,
  DiscoverResponse,
  MovieDiscoverResponse,
  TvShowDiscoverResponse,
  SortOption,
  FilterOption,
  FilterGroup,
  FilterState,
  GenreFilterParams,
  HighRatedParams,
  LatestParams,
  UpcomingParams
} from './discover'

// ==================== 分类类型 ====================
export type {
  Genre,
  GenreResponse,
  MovieGenreResponse,
  TvGenreResponse,
  GenreStats,
  GenreStatsResponse,
  GenreFilterOption,
  GenreFilterGroup,
  GenreMap,
  ReverseGenreMap,
  GenreUtilsParams,
  GenreFormatResult
} from './genre'

// ==================== 趋势内容类型 ====================
export type {
  TrendingItem,
  TrendingResponse,
  TrendingTimeWindow,
  TrendingMediaType,
  TrendingCategory,
  TrendingParams,
  TrendingUtilsParams,
  TrendingGroupResult
} from './trending'

// ==================== 搜索类型 ====================
export type {
  SearchMediaType,
  SearchParams,
  MultiSearchParams,
  MovieSearchResult as SearchMovieResult,
  TvShowSearchResult as SearchTvResult,
  PersonSearchResult as SearchPersonResult,
  MovieSearchResponse as SearchMovieResponse,
  TvShowSearchResponse as SearchTvResponse,
  PersonSearchResponse as SearchPersonResponse,
  MultiSearchResponse,
  SearchSuggestion,
  SearchSuggestionsResponse,
  SearchHistoryItem,
  SearchHistory,
  SearchFilter,
  SearchFilterOption,
  SearchFilterGroup,
  SearchUtilsParams,
  SearchGroupResult,
  SearchStats
} from './search'

// ==================== 类型别名 ====================

/**
 * 所有媒体类型的联合类型
 */
export type AllMediaType = 'movie' | 'tv' | 'person'

/**
 * 所有响应类型的联合类型
 */
export type AllResponseType = 
  | import('./movie').MoviePaginatedResponse
  | import('./tv').TvShowPaginatedResponse
  | import('./person').PersonPaginatedResponse
  | import('./trending').TrendingResponse
  | import('./search').MultiSearchResponse

/**
 * 所有项目类型的联合类型
 */
export type AllItemType = 
  | import('./common').MovieItem
  | import('./common').TvShowItem
  | import('./common').PersonItem
  | import('./trending').TrendingItem
  | import('./search').SearchResult

// ==================== 工具类型 ====================

/**
 * 提取响应类型中的项目类型
 */
export type ExtractItemType<T> = T extends { results: infer R } ? R : never

/**
 * 提取分页响应类型中的项目类型
 */
export type ExtractPaginatedItemType<T> = T extends { results: (infer R)[] } ? R : never

/**
 * 创建可选字段类型
 */
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 创建必需字段类型
 */
export type MakeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * 创建只读字段类型
 */
export type MakeReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>

// ==================== 常用组合类型 ====================

/**
 * 基础列表项类型（包含分页信息）
 */
export interface BaseListItem {
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
  media_type: AllMediaType
}

/**
 * 基础详情项类型（包含完整信息）
 */
export interface BaseDetailItem extends BaseListItem {
  status?: string
  production_companies?: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  production_countries?: Array<{
    iso_3166_1: string
    name: string
  }>
  spoken_languages?: Array<{
    iso_639_1: string
    name: string
  }>
  genres?: Array<{
    id: number
    name: string
  }>
  external_ids?: {
    id: number
    imdb_id: string | null
    facebook_id: string | null
    freebase_mid: string | null
    freebase_id: string | null
    tvrage_id: number | null
    twitter_id: string | null
    instagram_id: string | null
  }
}

/**
 * 基础分页响应类型
 */
export interface BasePaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
} 