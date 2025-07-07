/**
 * 趋势内容相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  TrendingResponse,
  TrendingParams,
  TrendingMediaType,
  TrendingTimeWindow
} from '~/types/apiType'

/**
 * 获取所有趋势内容
 * @param params 请求参数
 * @returns 所有趋势内容列表
 */
export const getAllTrending = (params: TrendingParams = {}) => {
  return useHttp<TrendingResponse>({
    url: '/trending/all/day',
    method: 'GET',
    params
  })
}

/**
 * 获取电影趋势
 * @param page 页码，默认1
 * @returns 电影趋势列表
 */
export const getMovieTrending = (page = 1) => {
  return useHttp<TrendingResponse>({
    url: '/trending/movie/day',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取电视剧趋势
 * @param page 页码，默认1
 * @returns 电视剧趋势列表
 */
export const getTvTrending = (page = 1) => {
  return useHttp<TrendingResponse>({
    url: '/trending/tv/day',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取人物趋势
 * @param page 页码，默认1
 * @returns 人物趋势列表
 */
export const getPersonTrending = (page = 1) => {
  return useHttp<TrendingResponse>({
    url: '/trending/person/day',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取周趋势
 * @param mediaType 媒体类型，默认'all'
 * @param page 页码，默认1
 * @returns 周趋势列表
 */
export const getWeeklyTrending = (mediaType: TrendingMediaType = 'all', page = 1) => {
  return useHttp<TrendingResponse>({
    url: `/trending/${mediaType}/week`,
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取指定时间窗口的趋势内容
 * @param mediaType 媒体类型
 * @param timeWindow 时间窗口
 * @param page 页码，默认1
 * @returns 趋势内容列表
 */
export const getTrending = (mediaType: TrendingMediaType, timeWindow: TrendingTimeWindow, page = 1) => {
  return useHttp<TrendingResponse>({
    url: `/trending/${mediaType}/${timeWindow}`,
    method: 'GET',
    params: { page }
  })
} 