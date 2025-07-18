/**
 * 搜索相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  MovieSearchResponse,
  TvShowSearchResponse,
  PersonSearchResponse,
  MultiSearchResponse,
} from '~/types/apiType'

// ==================== 多类型搜索 ====================

/**
 * 多类型搜索（TMDB 官方推荐）
 * 同时搜索电影、电视剧和演员
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param params 额外搜索参数
 * @returns 多类型搜索结果
 */
export const multiSearch = (
  query: string,
  page = 1,
  params: {
    include_adult?: boolean
    language?: string
    region?: string
  } = {}
) => {
  return useHttp<MultiSearchResponse>({
    url: '/search/multi',
    method: 'GET',
    params: {
      query,
      page,
      ...params,
    },
  })
}

// ==================== 单类型搜索 ====================

/**
 * 搜索电影
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param params 额外搜索参数
 * @returns 电影搜索结果
 */
export const searchMovies = (
  query: string,
  page = 1,
  params: {
    year?: number
    include_adult?: boolean
    language?: string
    region?: string
    primary_release_year?: number
  } = {}
) => {
  return useHttp<MovieSearchResponse>({
    url: '/search/movie',
    method: 'GET',
    params: {
      query,
      page,
      ...params,
    },
  })
}

/**
 * 搜索电视剧
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param params 额外搜索参数
 * @returns 电视剧搜索结果
 */
export const searchTvShows = (
  query: string,
  page = 1,
  params: {
    first_air_date_year?: number
    include_adult?: boolean
    language?: string
    region?: string
  } = {}
) => {
  return useHttp<TvShowSearchResponse>({
    url: '/search/tv',
    method: 'GET',
    params: {
      query,
      page,
      ...params,
    },
  })
}

/**
 * 搜索演员
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param params 额外搜索参数
 * @returns 演员搜索结果
 */
export const searchPeople = (
  query: string,
  page = 1,
  params: {
    include_adult?: boolean
    language?: string
    region?: string
  } = {}
) => {
  return useHttp<PersonSearchResponse>({
    url: '/search/person',
    method: 'GET',
    params: {
      query,
      page,
      ...params,
    },
  })
}

// ==================== 通用搜索接口 ====================

/**
 * 通用搜索接口（根据媒体类型）
 * @param mediaType 媒体类型
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param params 额外搜索参数
 * @returns 搜索结果
 */
export const searchByType = (
  mediaType: 'movie' | 'tv' | 'person',
  query: string,
  page = 1,
  params: {
    year?: number
    first_air_date_year?: number
    include_adult?: boolean
    language?: string
    region?: string
    primary_release_year?: number
  } = {}
) => {
  return useHttp<
    MovieSearchResponse | TvShowSearchResponse | PersonSearchResponse
  >({
    url: `/search/${mediaType}`,
    method: 'GET',
    params: {
      query,
      page,
      ...params,
    },
  })
}

// ==================== 高级搜索 ====================

/**
 * 高级多类型搜索
 * 支持过滤特定媒体类型
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @param mediaTypes 要搜索的媒体类型数组
 * @param params 额外搜索参数
 * @returns 过滤后的搜索结果
 */
export const advancedMultiSearch = async (
  query: string,
  page = 1,
  mediaTypes: ('movie' | 'tv' | 'person')[] = ['movie', 'tv', 'person'],
  params: {
    year?: number
    first_air_date_year?: number
    include_adult?: boolean
    language?: string
    region?: string
  } = {}
) => {
  // 如果搜索所有类型，使用 multi search
  if (mediaTypes.length === 3) {
    return multiSearch(query, page, params)
  }

  // 否则分别搜索指定类型
  const searchPromises = []

  if (mediaTypes.includes('movie')) {
    searchPromises.push(
      searchMovies(query, page, {
        year: params.year,
        include_adult: params.include_adult,
        language: params.language,
        region: params.region,
      })
    )
  }

  if (mediaTypes.includes('tv')) {
    searchPromises.push(
      searchTvShows(query, page, {
        first_air_date_year: params.first_air_date_year,
        include_adult: params.include_adult,
        language: params.language,
        region: params.region,
      })
    )
  }

  if (mediaTypes.includes('person')) {
    searchPromises.push(
      searchPeople(query, page, {
        include_adult: params.include_adult,
        language: params.language,
        region: params.region,
      })
    )
  }

  return Promise.all(searchPromises)
}

// ==================== 搜索建议 ====================

/**
 * 搜索建议（使用 multi search 的前几页结果）
 * @param query 搜索关键词
 * @param limit 建议数量，默认5
 * @returns 搜索建议
 */
export const getSearchSuggestions = (query: string) => {
  return useHttp<MultiSearchResponse>({
    url: '/search/multi',
    method: 'GET',
    params: {
      query,
      page: 1,
    },
  })
}
