import type {
  MoviePaginatedResponse,
  TvShowPaginatedResponse,
  Genre,
} from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface DiscoverTypePageProps {
  // 路由参数
  type: 'movie' | 'tv'

  // 筛选相关
  showFilters: boolean
  viewMode: 'grid' | 'list'
  filters: {
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
  initialFilters: Record<
    string,
    string | number | boolean | null | string[] | number[]
  > // 初始筛选条件状态
  hasFilterChanges: boolean

  // 分页相关
  currentPage: number
  totalResults: number

  // 数据相关
  list: {
    data: Ref<MoviePaginatedResponse | TvShowPaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<
      MoviePaginatedResponse | TvShowPaginatedResponse
    > | null>
  }
  genres: Genre[]

  // 语言相关
  languageOptions: Array<{ value: string; label: string }>
  languageSearch: string
  filteredLanguageOptions: Array<{ value: string; label: string }>
  selectedLanguageLabel: string
  dropdownOpen: boolean

  // 地区相关
  regionOptions: Array<{ value: string; label: string }>

  // 排序选项
  sortOptions: Array<{ value: string; label: string }>

  // 计算属性
  isMovie: boolean
  isApplyButtonVisible: boolean

  // 引用
  applyFilterBtn: HTMLElement | null
}
