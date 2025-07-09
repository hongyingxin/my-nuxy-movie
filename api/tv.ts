/**
 * 电视剧相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  TvShowPaginatedResponse,
  TvShowDetail,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  SeasonResponse,
  EpisodeResponse,
} from '~/types/apiType'

/**
 * 获取热门电视剧
 * @param page 页码，默认1
 * @returns 热门电视剧列表
 */
export const getPopularTvShows = (page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: '/tv/popular',
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取正在播出的电视剧
 * @param page 页码，默认1
 * @returns 正在播出电视剧列表
 */
export const getOnTheAirTvShows = (page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: '/tv/on_the_air',
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取即将播出的电视剧
 * @param page 页码，默认1
 * @returns 即将播出电视剧列表
 */
export const getAiringTodayTvShows = (page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: '/tv/airing_today',
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取高分电视剧
 * @param page 页码，默认1
 * @returns 高分电视剧列表
 */
export const getTopRatedTvShows = (page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: '/tv/top_rated',
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取电视剧详情
 * @param id 电视剧ID
 * @returns 电视剧详细信息
 */
export const getTvShowDetail = (id: number) => {
  return useHttp<TvShowDetail>({
    url: `/tv/${id}`,
    method: 'GET',
  })
}

/**
 * 获取相似电视剧
 * @param id 电视剧ID
 * @param page 页码，默认1
 * @returns 相似电视剧列表
 */
export const getSimilarTvShows = (id: number, page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: `/tv/${id}/similar`,
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取推荐电视剧
 * @param id 电视剧ID
 * @param page 页码，默认1
 * @returns 推荐电视剧列表
 */
export const getTvShowRecommendations = (id: number, page = 1) => {
  return useHttp<TvShowPaginatedResponse>({
    url: `/tv/${id}/recommendations`,
    method: 'GET',
    params: { page },
  })
}

/**
 * 获取电视剧演职员
 * @param id 电视剧ID
 * @returns 电视剧演职员信息
 */
export const getTvShowCredits = (id: number) => {
  return useHttp<CreditsResponse>({
    url: `/tv/${id}/credits`,
    method: 'GET',
  })
}

/**
 * 获取电视剧视频
 * @param id 电视剧ID
 * @returns 电视剧视频列表
 */
export const getTvShowVideos = (id: number) => {
  return useHttp<VideosResponse>({
    url: `/tv/${id}/videos`,
    method: 'GET',
  })
}

/**
 * 获取电视剧图片
 * @param id 电视剧ID
 * @returns 电视剧图片列表
 */
export const getTvShowImages = (id: number) => {
  return useHttp<ImagesResponse>({
    url: `/tv/${id}/images`,
    method: 'GET',
  })
}

/**
 * 获取电视剧季数信息
 * @param id 电视剧ID
 * @returns 电视剧详情（包含季数信息）
 */
export const getTvShowSeasons = (id: number) => {
  return useHttp<TvShowDetail>({
    url: `/tv/${id}`,
    method: 'GET',
  })
}

/**
 * 获取季详情
 * @param tvId 电视剧ID
 * @param seasonNumber 季数
 * @returns 季详情信息
 */
export const getSeasonDetail = (tvId: number, seasonNumber: number) => {
  return useHttp<SeasonResponse>({
    url: `/tv/${tvId}/season/${seasonNumber}`,
    method: 'GET',
  })
}

/**
 * 获取集详情
 * @param tvId 电视剧ID
 * @param seasonNumber 季数
 * @param episodeNumber 集数
 * @returns 集详情信息
 */
export const getEpisodeDetail = (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  return useHttp<EpisodeResponse>({
    url: `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
    method: 'GET',
  })
}
