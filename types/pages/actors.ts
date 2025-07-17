/**
 * Actors 页面类型定义
 * 用于 /actors 和 /actors/[id] 页面的类型定义
 */

import type { AsyncData } from 'nuxt/app'
import type {
  PersonPaginatedResponse,
  PersonDetail,
  PersonCreditsResponse,
  PersonCreditItem,
} from '~/types/apiType'

// ==================== 列表页面类型 ====================

/**
 * 演员列表页面数据类型
 */
export interface ActorsPageData {
  actors: AsyncData<PersonPaginatedResponse, Error>
}

/**
 * 当前页码类型
 */
export type CurrentPage = number

/**
 * 演员列表项类型
 */
export type ActorListItem = PersonPaginatedResponse['results'][0]

// ==================== 详情页面类型 ====================

/**
 * 演员详情页面数据类型
 */
export interface ActorDetailPageData {
  detail: AsyncData<PersonDetail, Error>
  credits: AsyncData<PersonCreditsResponse, Error>
}

/**
 * 作品过滤类型
 */
export type WorkFilterType = 'all' | 'movie' | 'tv'

/**
 * 滚动状态类型
 */
export interface ScrollState {
  position: number
  maxScroll: number
  progress: number
}

/**
 * 时间轴年份组类型
 */
export interface TimelineYearGroup {
  year: number
  works: PersonCreditItem[]
}

/**
 * 作品导航类型
 */
export interface WorkNavigation {
  media_type: 'movie' | 'tv'
  id: number
}

/**
 * 滚动指示器类型
 */
export type ScrollIndicatorClass = 'bg-red-600' | 'bg-gray-300' | 'bg-gray-400'

// ==================== 工具类型 ====================

/**
 * 页面跳转参数类型
 */
export interface PageChangeParams {
  page: number
}

/**
 * 演员导航参数类型
 */
export interface ActorNavigationParams {
  actorId: number
}
