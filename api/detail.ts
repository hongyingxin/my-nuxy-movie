/**
 * 详情页相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  MediaType,
  MovieDetail,
  TvShowDetail,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  MoviePaginatedResponse,
  TvShowPaginatedResponse,
  MovieSearchResponse,
  TvShowSearchResponse,
  MovieRatingResponse
} from '~/types/apiType'

/**
 * 通用详情接口 - 支持电影和电视剧
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @returns 媒体详情信息
 */
export const getDetail = (mediaType: MediaType, id: number) => {
  return useHttp<MovieDetail | TvShowDetail>({
    url: `/${mediaType}/${id}`,
    method: 'GET'
  })
}

/**
 * 通用演职员接口
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @returns 演职员信息
 */
export const getCredits = (mediaType: MediaType, id: number) => {
  return useHttp<CreditsResponse>({
    url: `/${mediaType}/${id}/credits`,
    method: 'GET'
  })
}

/**
 * 通用视频接口
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @returns 视频列表
 */
export const getVideos = (mediaType: MediaType, id: number) => {
  return useHttp<VideosResponse>({
    url: `/${mediaType}/${id}/videos`,
    method: 'GET'
  })
}

/**
 * 通用图片接口
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @returns 图片列表
 */
export const getImages = (mediaType: MediaType, id: number) => {
  return useHttp<ImagesResponse>({
    url: `/${mediaType}/${id}/images`,
    method: 'GET',
    params: {
      // include_image_language: 'en,null',
      language: ''
    }
  })
}

/**
 * 通用相似内容接口
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @param page 页码，默认1
 * @returns 相似内容列表
 */
export const getSimilar = (mediaType: MediaType, id: number, page = 1) => {
  return useHttp<MoviePaginatedResponse | TvShowPaginatedResponse>({
    url: `/${mediaType}/${id}/similar`,
    method: 'GET',
    params: { page }
  })
}

/**
 * 通用推荐内容接口
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @param page 页码，默认1
 * @returns 推荐内容列表
 */
export const getRecommendations = (mediaType: MediaType, id: number, page = 1) => {
  return useHttp<MoviePaginatedResponse | TvShowPaginatedResponse>({
    url: `/${mediaType}/${id}/recommendations`,
    method: 'GET',
    params: { page }
  })
}

/**
 * 评分接口 (仅电影支持)
 * @param mediaType 媒体类型
 * @param id 媒体ID
 * @param rating 评分值 (0.5-10)
 * @returns 评分结果
 */
export const rateMedia = (mediaType: MediaType, id: number, rating: number) => {
  if (mediaType === 'tv') {
    throw new Error('TV shows do not support rating via API')
  }
  return useHttp<MovieRatingResponse>({
    url: `/${mediaType}/${id}/rating`,
    method: 'POST',
    params: { value: rating }
  })
} 