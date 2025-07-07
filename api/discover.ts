/**
 * 发现页相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  DiscoverParams,
  MovieDiscoverResponse,
  TvShowDiscoverResponse,
  MediaType
} from '~/types/apiType'

// ==================== 通用 Discover 接口 ====================

/**
 * 通用 Discover 接口 - 支持电影和电视剧
 * discover是一个功能非常强大的接口，可以用来获取电影和电视剧的列表，支持多种筛选条件，如分类、评分、日期、语言、地区、关键词、公司、网络、人员、时长、状态、类型、认证等。
 * 基本上可以覆盖掉特定的/movie/popular、/movie/now_playing、/movie/upcoming、/movie/top_rated、/tv/popular、/tv/on_the_air、/tv/airing_today、/tv/top_rated等接口。
 * 你可以看作 discover 是这些接口的集合。
 * @param type - 内容类型: 'movie' | 'tv'
 * @param params - 筛选参数
 * @returns 发现页响应数据
 */
export const discoverMedia = (type: MediaType, params: DiscoverParams = {}) => {
  return useHttp<MovieDiscoverResponse | TvShowDiscoverResponse>({
    url: `/discover/${type}`,
    method: 'GET',
    params: {
      // 默认参数
      sort_by: 'popularity.desc',
      page: 1,
      // 用户传入的参数会覆盖默认值
      ...params
    }
  })
}

// ==================== 便捷方法 ====================

/**
 * 根据分类获取电影
 * @param genreId 分类ID
 * @param page 页码，默认1
 * @param additionalParams 额外筛选参数
 * @returns 分类电影列表
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
 * @param genreId 分类ID
 * @param page 页码，默认1
 * @param additionalParams 额外筛选参数
 * @returns 分类电视剧列表
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
 * @param page 页码，默认1
 * @param minRating 最低评分，默认7.0
 * @returns 高分电影列表
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
 * @param page 页码，默认1
 * @param minRating 最低评分，默认7.0
 * @returns 高分电视剧列表
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
 * @param page 页码，默认1
 * @returns 最新电影列表
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
 * @param page 页码，默认1
 * @returns 最新电视剧列表
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
 * @param page 页码，默认1
 * @returns 即将上映电影列表
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
 * @param page 页码，默认1
 * @returns 即将播出电视剧列表
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
  { value: 'popularity.asc', label: '人气升序', description: '按人气从低到高排序' },
  { value: 'popularity.desc', label: '人气降序', description: '按人气从高到低排序' },
  { value: 'release_date.asc', label: '上映日期升序', description: '按上映日期从早到晚排序' },
  { value: 'release_date.desc', label: '上映日期降序', description: '按上映日期从晚到早排序' },
  { value: 'revenue.asc', label: '票房升序', description: '按票房从低到高排序' },
  { value: 'revenue.desc', label: '票房降序', description: '按票房从高到低排序' },
  { value: 'primary_release_date.asc', label: '首映日期升序', description: '按首映日期从早到晚排序' },
  { value: 'primary_release_date.desc', label: '首映日期降序', description: '按首映日期从晚到早排序' },
  { value: 'original_title.asc', label: '原标题升序', description: '按原标题字母顺序排序' },
  { value: 'original_title.desc', label: '原标题降序', description: '按原标题字母倒序排序' },
  { value: 'vote_average.asc', label: '评分升序', description: '按评分从低到高排序' },
  { value: 'vote_average.desc', label: '评分降序', description: '按评分从高到低排序' },
  { value: 'vote_count.asc', label: '投票数升序', description: '按投票数从少到多排序' },
  { value: 'vote_count.desc', label: '投票数降序', description: '按投票数从多到少排序' }
]

/**
 * 电视剧排序选项
 */
export const TV_SORT_OPTIONS = [
  { value: 'popularity.asc', label: '人气升序', description: '按人气从低到高排序' },
  { value: 'popularity.desc', label: '人气降序', description: '按人气从高到低排序' },
  { value: 'air_date.asc', label: '播出日期升序', description: '按播出日期从早到晚排序' },
  { value: 'air_date.desc', label: '播出日期降序', description: '按播出日期从晚到早排序' },
  { value: 'first_air_date.asc', label: '首播日期升序', description: '按首播日期从早到晚排序' },
  { value: 'first_air_date.desc', label: '首播日期降序', description: '按首播日期从晚到早排序' },
  { value: 'name.asc', label: '名称升序', description: '按名称字母顺序排序' },
  { value: 'name.desc', label: '名称降序', description: '按名称字母倒序排序' },
  { value: 'original_name.asc', label: '原名升序', description: '按原名字母顺序排序' },
  { value: 'original_name.desc', label: '原名降序', description: '按原名字母倒序排序' },
  { value: 'vote_average.asc', label: '评分升序', description: '按评分从低到高排序' },
  { value: 'vote_average.desc', label: '评分降序', description: '按评分从高到低排序' },
  { value: 'vote_count.asc', label: '投票数升序', description: '按投票数从少到多排序' },
  { value: 'vote_count.desc', label: '投票数降序', description: '按投票数从多到少排序' }
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