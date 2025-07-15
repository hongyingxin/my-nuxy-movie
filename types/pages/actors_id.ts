import type { PersonDetail, CreditsResponse } from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface ActorsIdPageProps {
  // 路由参数
  actorId: number

  // 数据相关
  detail: {
    data: Ref<PersonDetail | null>
    pending: Ref<boolean>
    error: Ref<FetchError<PersonDetail> | null>
  }
  credits: {
    data: Ref<CreditsResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<CreditsResponse> | null>
  }

  // 响应式数据
  activeTab: 'all' | 'movie' | 'tv'
  scrollContainer: HTMLElement | null
  scrollPosition: number
  maxScroll: number
  scrollProgress: number

  // 计算属性
  filteredWorks: Array<{
    id: number
    title?: string
    name?: string
    media_type: 'movie' | 'tv'
    release_date?: string
    first_air_date?: string
    character?: string
    job?: string
  }>
  timelineData: Array<{
    year: number
    works: Array<{
      id: number
      title?: string
      name?: string
      media_type: 'movie' | 'tv'
      release_date?: string
      first_air_date?: string
      character?: string
      job?: string
    }>
  }>
}
