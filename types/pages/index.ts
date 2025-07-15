import type {
  MoviePaginatedResponse,
  TvShowPaginatedResponse,
  TrendingResponse,
} from '~/types/apiType'
import type { FetchError } from 'ofetch'

export interface IndexPageProps {
  // 热门电影数据
  popularMovies: {
    data: Ref<MoviePaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<MoviePaginatedResponse> | null>
  }
  // 即将上映电影数据
  upcomingMovies: {
    data: Ref<MoviePaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<MoviePaginatedResponse> | null>
  }
  // 热门电视剧数据
  popularTvShows: {
    data: Ref<TvShowPaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<TvShowPaginatedResponse> | null>
  }
  // 正在播出电视剧数据
  onTheAirTvShows: {
    data: Ref<TvShowPaginatedResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<TvShowPaginatedResponse> | null>
  }
  // 趋势内容数据（Hero 轮播）
  heroContent: {
    data: Ref<TrendingResponse | null>
    pending: Ref<boolean>
    error: Ref<FetchError<TrendingResponse> | null>
  }
  // 当前轮播索引
  currentHeroIndex: number
  // 收藏的内容ID集合
  favorites: Set<number>
}
