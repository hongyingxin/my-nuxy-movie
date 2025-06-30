// ==================== 通用 Discover 接口 ====================

/**
 * 通用 Discover 接口 - 支持电影和电视剧
 * @param type - 内容类型: 'movie' | 'tv'
 * @param params - 筛选参数
 */
export const discoverMedia = (type: 'movie' | 'tv', params: DiscoverParams = {}) => {
  return useHttp({
    url: `/discover/${type}`,
    method: 'GET',
    params: {
      // 默认参数
      sort_by: 'popularity.desc',
      page: 1,
      // 用户传入的参数会覆盖默认值
      ...params
    },
    opts: {
      lazy: false
    }
  })
}

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

// ==================== 便捷方法 ====================

/**
 * 根据分类获取电影
 */
export const getMoviesByGenre = (genreId: number, page = 1, additionalParams: Partial<DiscoverParams> = {}) => {
  return discoverMedia('movie', {
    with_genres: genreId,
    page,
    ...additionalParams
  })
}

/**
 * 根据分类获取电视剧
 */
export const getTvShowsByGenre = (genreId: number, page = 1, additionalParams: Partial<DiscoverParams> = {}) => {
  return discoverMedia('tv', {
    with_genres: genreId,
    page,
    ...additionalParams
  })
}

/**
 * 获取高分电影
 */
export const getHighRatedMovies = (page = 1, minRating = 7.0) => {
  return discoverMedia('movie', {
    'vote_average.gte': minRating,
    'vote_count.gte': 100,
    sort_by: 'vote_average.desc',
    page
  })
}

/**
 * 获取高分电视剧
 */
export const getHighRatedTvShows = (page = 1, minRating = 7.0) => {
  return discoverMedia('tv', {
    'vote_average.gte': minRating,
    'vote_count.gte': 50,
    sort_by: 'vote_average.desc',
    page
  })
}

/**
 * 获取最新电影
 */
export const getLatestMovies = (page = 1) => {
  const today = new Date().toISOString().split('T')[0]
  return discoverMedia('movie', {
    'primary_release_date.lte': today,
    sort_by: 'primary_release_date.desc',
    page
  })
}

/**
 * 获取最新电视剧
 */
export const getLatestTvShows = (page = 1) => {
  const today = new Date().toISOString().split('T')[0]
  return discoverMedia('tv', {
    'first_air_date.lte': today,
    sort_by: 'first_air_date.desc',
    page
  })
}

/**
 * 获取即将上映电影
 */
export const getUpcomingMovies = (page = 1) => {
  const today = new Date().toISOString().split('T')[0]
  return discoverMedia('movie', {
    'primary_release_date.gte': today,
    sort_by: 'primary_release_date.asc',
    page
  })
}

/**
 * 获取即将播出电视剧
 */
export const getUpcomingTvShows = (page = 1) => {
  const today = new Date().toISOString().split('T')[0]
  return discoverMedia('tv', {
    'first_air_date.gte': today,
    sort_by: 'first_air_date.asc',
    page
  })
}

// ==================== 排序选项 ====================

/**
 * 电影排序选项
 */
export const MOVIE_SORT_OPTIONS = [
  { value: 'popularity.asc', label: '热度升序' },
  { value: 'popularity.desc', label: '热度降序' },
  { value: 'release_date.asc', label: '上映日期升序' },
  { value: 'release_date.desc', label: '上映日期降序' },
  { value: 'revenue.asc', label: '票房升序' },
  { value: 'revenue.desc', label: '票房降序' },
  { value: 'primary_release_date.asc', label: '首映日期升序' },
  { value: 'primary_release_date.desc', label: '首映日期降序' },
  { value: 'original_title.asc', label: '标题升序' },
  { value: 'original_title.desc', label: '标题降序' },
  { value: 'vote_average.asc', label: '评分升序' },
  { value: 'vote_average.desc', label: '评分降序' },
  { value: 'vote_count.asc', label: '投票数升序' },
  { value: 'vote_count.desc', label: '投票数降序' }
]

/**
 * 电视剧排序选项
 */
export const TV_SORT_OPTIONS = [
  { value: 'popularity.asc', label: '热度升序' },
  { value: 'popularity.desc', label: '热度降序' },
  { value: 'first_air_date.asc', label: '首播日期升序' },
  { value: 'first_air_date.desc', label: '首播日期降序' },
  { value: 'name.asc', label: '名称升序' },
  { value: 'name.desc', label: '名称降序' },
  { value: 'vote_average.asc', label: '评分升序' },
  { value: 'vote_average.desc', label: '评分降序' },
  { value: 'vote_count.asc', label: '投票数升序' },
  { value: 'vote_count.desc', label: '投票数降序' }
]

// ==================== 筛选条件对比 ====================

/**
 * 电影和电视剧筛选条件对比
 */
export const FILTER_COMPARISON = {
  // 共同支持的筛选条件
  common: [
    'page',
    'sort_by',
    'with_genres',
    'without_genres',
    'vote_average.gte',
    'vote_average.lte',
    'vote_count.gte',
    'with_original_language',
    'with_keywords',
    'without_keywords',
    'with_companies',
    'with_people',
    'include_adult'
  ],
  
  // 电影专用筛选条件
  movie_only: [
    'primary_release_date.gte',
    'primary_release_date.lte',
    'region',
    'with_runtime.gte',
    'with_runtime.lte',
    'certification_country',
    'certification',
    'certification.gte',
    'certification.lte',
    'include_video',
    'year'
  ],
  
  // 电视剧专用筛选条件
  tv_only: [
    'first_air_date.gte',
    'first_air_date.lte',
    'with_origin_country',
    'with_networks',
    'with_status',
    'with_type',
    'air_date.gte',
    'air_date.lte'
  ]
} 