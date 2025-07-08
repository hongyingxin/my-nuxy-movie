/**
 * 演员相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'
import type {
  PersonDetail,
  PersonImagesResponse,
  PersonCreditsResponse,
  PersonMovieCreditsResponse,
  PersonTvCreditsResponse,
  ExternalIds,
  PersonPaginatedResponse,
} from '~/types/apiType'

/**
 * 获取演员基本信息
 * @param personId 演员ID
 * @returns 演员基本信息
 */
export function getPersonDetail(personId: number) {
  return useHttp<PersonDetail>({
    url: `/person/${personId}`,
    method: 'GET'
  })
}

/**
 * 获取演员照片
 * @param personId 演员ID
 * @returns 演员照片列表
 */
export function getPersonImages(personId: number) {
  return useHttp<PersonImagesResponse>({
    url: `/person/${personId}/images`,
    method: 'GET'
  })
}

/**
 * 获取演员作品（电影+电视剧）
 * @param personId 演员ID
 * @returns 演员作品列表
 */
export function getPersonCredits(personId: number) {
  return useHttp<PersonCreditsResponse>({
    url: `/person/${personId}/combined_credits`,
    method: 'GET'
  })
}

/**
 * 获取演员电影作品
 * @param personId 演员ID
 * @returns 演员电影作品列表
 */
export function getPersonMovieCredits(personId: number) {
  return useHttp<PersonMovieCreditsResponse>({
    url: `/person/${personId}/movie_credits`,
    method: 'GET'
  })
}

/**
 * 获取演员电视剧作品
 * @param personId 演员ID
 * @returns 演员电视剧作品列表
 */
export function getPersonTvCredits(personId: number) {
  return useHttp<PersonTvCreditsResponse>({
    url: `/person/${personId}/tv_credits`,
    method: 'GET'
  })
}

/**
 * 获取演员外部ID
 * @param personId 演员ID
 * @returns 演员外部ID信息
 */
export function getPersonExternalIds(personId: number) {
  return useHttp<ExternalIds>({
    url: `/person/${personId}/external_ids`,
    method: 'GET'
  })
}

/**
 * 获取热门演员列表
 * @param page 页码，默认1
 * @returns 热门演员列表
 */
export function getPopularPeople(page: number = 1) {
  return useHttp<PersonPaginatedResponse>({
    url: '/person/popular',
    method: 'GET',
    params: { page }
  })
} 