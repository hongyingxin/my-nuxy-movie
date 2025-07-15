import type { SearchResult, SearchMediaType } from '~/types/apiType/search'

export interface SearchIndexPageProps {
  // ==================== 响应式数据 ====================

  // 搜索相关
  searchQuery: string
  currentPage: number
  viewMode: 'grid' | 'list'

  // 过滤器
  selectedMediaTypes: SearchMediaType[]
  selectedYear: string
  includeAdult: boolean

  // 搜索结果
  searchResults: SearchResult[]
  totalResults: number
  totalPages: number
  isLoading: boolean
  error: string | null
  hasSearched: boolean

  // ==================== 常量定义 ====================

  // 媒体类型选项
  mediaTypes: Array<{
    value: SearchMediaType
    label: string
  }>

  // 年份选项
  years: number[]

  // ==================== 计算属性 ====================

  // 是否有搜索结果
  hasResults: boolean

  // 分离不同类型的搜索结果
  mediaResults: SearchResult[]
  personResults: SearchResult[]

  // ==================== 方法 ====================

  // 搜索相关方法
  handleSearch: () => Promise<void>
  performSearch: () => Promise<void>

  // 过滤器相关方法
  clearFilters: () => void

  // 搜索建议相关方法
  handleViewAllResults: () => void

  // ==================== 生命周期相关 ====================

  // URL 参数处理
  queryParams: {
    q: string
    page: string
    types: string
    year: string
    adult: string
  }

  // 路由查询参数类型
  routeQuery: {
    q?: string | string[]
    page?: string | string[]
    types?: string | string[]
    year?: string | string[]
    adult?: string | string[]
  }

  // ==================== 搜索参数类型 ====================

  // 高级搜索参数
  searchParams: {
    year?: string
    first_air_date_year?: string
    include_adult: boolean
  }

  // ==================== 搜索结果处理类型 ====================

  // 搜索结果项（带媒体类型）
  searchResultWithType: SearchResult & {
    media_type: SearchMediaType
  }

  // 搜索结果数组
  allResults: SearchResult[]

  // ==================== 类型工具 ====================

  // 搜索建议类型
  searchSuggestion: {
    title?: string
    name?: string
  }

  // 年份范围类型
  yearRange: {
    currentYear: number
    years: number[]
  }
}
