/**
 * 电影相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  MoviePaginatedResponse,
  MovieDetail,
  MovieSearchResponse,
  MovieSearchResult,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  MovieRatingRequest,
  MovieRatingResponse
} from '~/types/apiType'

/**
 * 获取热门电影
 * @param page 页码，默认1
 * @returns 热门电影列表
 */
export const getPopularMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/popular',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取正在上映的电影
 * @param page 页码，默认1
 * @returns 正在上映电影列表
 */
export const getNowPlayingMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/now_playing',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取即将上映的电影
 * @param page 页码，默认1
 * @returns 即将上映电影列表
 */
export const getUpcomingMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/upcoming',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取高分电影
 * @param page 页码，默认1
 * @returns 高分电影列表
 */
export const getTopRatedMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/top_rated',
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取电影详情
 * @param id 电影ID
 * @returns 电影详细信息
 */
export const getMovieDetail = (id: number) => {
  return useHttp<MovieDetail>({
    url: `/movie/${id}`,
    method: 'GET'
  })
}

/**
 * 搜索电影
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @returns 电影搜索结果
 */
export const searchMovies = (query: string, page = 1) => {
  return useHttp<MovieSearchResponse>({
    url: '/search/movie',
    method: 'GET',
    params: { query, page }
  })
}

/**
 * 获取相似电影
 * @param id 电影ID
 * @param page 页码，默认1
 * @returns 相似电影列表
 */
export const getSimilarMovies = (id: number, page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: `/movie/${id}/similar`,
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取推荐电影
 * @param id 电影ID
 * @param page 页码，默认1
 * @returns 推荐电影列表
 */
export const getMovieRecommendations = (id: number, page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: `/movie/${id}/recommendations`,
    method: 'GET',
    params: { page }
  })
}

/**
 * 获取电影演职员
 * @param id 电影ID
 * @returns 电影演职员信息
 */
export const getMovieCredits = (id: number) => {
  return useHttp<CreditsResponse>({
    url: `/movie/${id}/credits`,
    method: 'GET'
  })
}

/**
 * 获取电影视频
 * @param id 电影ID
 * @returns 电影视频列表
 */
export const getMovieVideos = (id: number) => {
  return useHttp<VideosResponse>({
    url: `/movie/${id}/videos`,
    method: 'GET'
  })
}

/**
 * 获取电影图片
 * @param id 电影ID
 * @returns 电影图片列表
 */
export const getMovieImages = (id: number) => {
  return useHttp<ImagesResponse>({
    url: `/movie/${id}/images`,
    method: 'GET'
  })
}

/**
 * 评分电影 (POST 请求)
 * @param id 电影ID
 * @param rating 评分值 (0.5-10)
 * @returns 评分结果
 */
export const rateMovie = (id: number, rating: number) => {
  return useHttp<MovieRatingResponse>({
    url: `/movie/${id}/rating`,
    method: 'POST',
    params: { value: rating }
  })
} 