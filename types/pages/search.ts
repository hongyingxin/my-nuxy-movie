import type { AsyncData } from 'nuxt/app'
import type {
  SearchMediaType,
  SearchFilter,
  MultiSearchResponse,
  MovieSearchResult,
  TvShowSearchResult,
  PersonSearchResult,
} from '~/types/apiType/search'
import type { LocationQueryValue } from 'vue-router'

// 媒体类型选项
export interface MediaTypeOption {
  value: SearchMediaType
  label: string
}

// 搜索结果类型
export type SearchResultItem =
  | MovieSearchResult
  | TvShowSearchResult
  | PersonSearchResult

// 搜索页面数据
export interface SearchPageData {
  searchResults: AsyncData<MultiSearchResponse, Error>[]
}

// 视图模式
export type ViewMode = 'grid' | 'list'

// 搜索查询参数
export interface SearchQueryParams
  extends Record<string, LocationQueryValue | LocationQueryValue[]> {
  q: string | LocationQueryValue | LocationQueryValue[]
  page: string | LocationQueryValue | LocationQueryValue[]
  types: string | LocationQueryValue | LocationQueryValue[]
  year: string | LocationQueryValue | LocationQueryValue[]
  adult: LocationQueryValue | LocationQueryValue[]
}

// 搜索过滤器参数
export type SearchFilterParams = SearchFilter
