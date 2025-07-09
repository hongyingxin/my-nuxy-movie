/**
 * 分类相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  MovieGenreResponse,
  TvGenreResponse,
  MovieDiscoverResponse,
  TvShowDiscoverResponse,
} from '~/types/apiType'

/**
 * 获取电影分类
 * @returns 电影分类列表
 */
export const getMovieGenres = () => {
  return useHttp<MovieGenreResponse>({
    url: '/genre/movie/list',
    method: 'GET',
  })
}

/**
 * 获取电视剧分类
 * @returns 电视剧分类列表
 */
export const getTvGenres = () => {
  return useHttp<TvGenreResponse>({
    url: '/genre/tv/list',
    method: 'GET',
  })
}

/**
 * 根据分类获取电影
 * @param genreId 分类ID
 * @param page 页码，默认1
 * @returns 分类电影列表
 */
export const getMoviesByGenre = (genreId: number, page = 1) => {
  return useHttp<MovieDiscoverResponse>({
    url: '/discover/movie',
    method: 'GET',
    params: {
      with_genres: genreId,
      page,
    },
  })
}

/**
 * 根据分类获取电视剧
 * @param genreId 分类ID
 * @param page 页码，默认1
 * @returns 分类电视剧列表
 */
export const getTvShowsByGenre = (genreId: number, page = 1) => {
  return useHttp<TvShowDiscoverResponse>({
    url: '/discover/tv',
    method: 'GET',
    params: {
      with_genres: genreId,
      page,
    },
  })
}
