import type { MovieDetail, TvShowDetail, ImagesResponse } from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface TypeIdGalleryPageProps {
  // 路由参数
  mediaType: 'movie' | 'tv'
  mediaId: number

  // 数据相关
  detail: {
    data: Ref<MovieDetail | TvShowDetail | null>
    pending: Ref<boolean>
    error: Ref<FetchError<MovieDetail | TvShowDetail> | null>
  }
  images: {
    data: Ref<ImagesResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<ImagesResponse> | null>
  }

  // 图片分类标签
  imageTabs: Array<{ id: string; name: string }>
  activeTab: 'posters' | 'backdrops'

  // 无限滚动相关
  currentPage: number
  isLoading: boolean
  hasMore: boolean
  observerTarget: HTMLElement | null

  // 计算属性
  currentImages: Array<{
    file_path: string
    width: number
    height: number
    aspect_ratio: number
    vote_average: number
    vote_count: number
  }>

  // 方法
  reset: () => void

  // PhotoSwipe 相关
  lightbox: unknown | null
  initPhotoSwipe: () => void
}
