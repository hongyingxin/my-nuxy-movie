/**
 * 演员相关 API 接口
 */

import { useHttp } from '~/composables/useHttp'

/**
 * 获取演员基本信息
 * @param personId 演员ID
 * @returns 演员基本信息
 */
export function getPersonDetail(personId: number) {
  return useHttp<{
    id: number
    name: string
    birthday: string | null
    deathday: string | null
    place_of_birth: string | null
    biography: string
    profile_path: string | null
    known_for_department: string
    popularity: number
    gender: number
    imdb_id: string | null
    homepage: string | null
  }>({
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
  return useHttp<{
    id: number
    profiles: Array<{
      aspect_ratio: number
      file_path: string
      height: number
      iso_639_1: string | null
      vote_average: number
      vote_count: number
      width: number
    }>
  }>({
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
  return useHttp<{
    id: number
    cast: Array<{
      id: number
      title?: string
      name?: string
      character: string
      release_date?: string
      first_air_date?: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
      media_type: 'movie' | 'tv'
    }>
    crew: Array<{
      id: number
      title?: string
      name?: string
      job: string
      department: string
      release_date?: string
      first_air_date?: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
      media_type: 'movie' | 'tv'
    }>
  }>({
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
  return useHttp<{
    id: number
    cast: Array<{
      id: number
      title: string
      character: string
      release_date: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
    }>
    crew: Array<{
      id: number
      title: string
      job: string
      department: string
      release_date: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
    }>
  }>({
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
  return useHttp<{
    id: number
    cast: Array<{
      id: number
      name: string
      character: string
      first_air_date: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
    }>
    crew: Array<{
      id: number
      name: string
      job: string
      department: string
      first_air_date: string
      vote_average: number
      poster_path: string | null
      backdrop_path: string | null
    }>
  }>({
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
  return useHttp<{
    id: number
    imdb_id: string | null
    facebook_id: string | null
    freebase_mid: string | null
    freebase_id: string | null
    tvrage_id: number | null
    twitter_id: string | null
    instagram_id: string | null
  }>({
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
  return useHttp<{
    page: number
    results: Array<{
      id: number
      name: string
      profile_path: string | null
      adult: boolean
      popularity: number
      known_for_department: string
      gender: number
      known_for: Array<{
        id: number
        title?: string
        name?: string
        poster_path: string | null
        backdrop_path: string | null
        media_type: 'movie' | 'tv'
        release_date?: string
        first_air_date?: string
        vote_average: number
        overview: string
      }>
    }>
    total_pages: number
    total_results: number
  }>({
    url: '/person/popular',
    method: 'GET',
    params: { page }
  })
}

/**
 * 搜索演员
 * @param query 搜索关键词
 * @param page 页码，默认1
 * @returns 搜索结果
 */
export function searchPeople(query: string, page: number = 1) {
  return useHttp<{
    page: number
    results: Array<{
      id: number
      name: string
      profile_path: string | null
      adult: boolean
      popularity: number
      known_for_department: string
      gender: number
      known_for: Array<{
        id: number
        title?: string
        name?: string
        poster_path: string | null
        backdrop_path: string | null
        media_type: 'movie' | 'tv'
        release_date?: string
        first_air_date?: string
        vote_average: number
        overview: string
      }>
    }>
    total_pages: number
    total_results: number
  }>({
    url: '/search/person',
    method: 'GET',
    params: { query, page }
  })
} 