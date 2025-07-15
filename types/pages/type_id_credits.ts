import type {
  MovieDetail,
  TvShowDetail,
  CreditsResponse,
} from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface TypeIdCreditsPageProps {
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

  // 计算属性
  groupedCrew: Record<
    string,
    Array<{
      credit_id: string
      department: string
      gender: number
      id: number
      job: string
      name: string
      profile_path: string | null
    }>
  >
}
