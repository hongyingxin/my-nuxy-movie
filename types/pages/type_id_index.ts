import type {
  MovieDetail,
  TvShowDetail,
  CreditsResponse,
  VideosResponse,
  ImagesResponse,
  MoviePaginatedResponse,
  TvShowPaginatedResponse,
} from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface TypeIdIndexPageProps {
  // 路由参数
  mediaType: 'movie' | 'tv'
  mediaId: number

  // 数据相关
  detail: {
    data: Ref<MovieDetail | TvShowDetail | null>
    pending: Ref<boolean>
    error: Ref<FetchError<MovieDetail | TvShowDetail> | null>
  }
  credits: {
    data: Ref<CreditsResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<CreditsResponse> | null>
  }
  videos: {
    data: Ref<VideosResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<VideosResponse> | null>
  }
  similar: {
    data: Ref<MoviePaginatedResponse | TvShowPaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<
      MoviePaginatedResponse | TvShowPaginatedResponse
    > | null>
  }
  images: {
    data: Ref<ImagesResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<ImagesResponse> | null>
  }

  // 媒体标签页状态
  activeMediaTab: 'backdrops' | 'posters' | 'videos'
  mediaTabs: Array<{ id: string; name: string }>

  // 计算属性
  isTv: boolean
  mediaTypeText: string
  hasMoreMedia: boolean

  // 方法
  getRuntimeOrSeasons: () => string
  refresh: () => void
}
