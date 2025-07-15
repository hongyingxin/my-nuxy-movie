import type { AsyncData } from 'nuxt/app'
import type {
  MovieListResponse,
  TvShowListResponse,
  TrendingResponse,
  TrendingItem,
} from '~/types/apiType'

// API 响应数据类型
export interface HomePageData {
  popularMovies: AsyncData<MovieListResponse, Error>
  upcomingMovies: AsyncData<MovieListResponse, Error>
  popularTvShows: AsyncData<TvShowListResponse, Error>
  onTheAirTvShows: AsyncData<TvShowListResponse, Error>
  heroContent: AsyncData<TrendingResponse, Error>
}

// 计算属性类型
export type CurrentHeroItem = Partial<TrendingItem> & {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path: string | null
  vote_average: number
  popularity: number
  release_date?: string
  first_air_date?: string
  media_type: 'movie' | 'tv'
}
