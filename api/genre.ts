import { fetch } from '~/composables/useHttp'

// 获取电影分类
export const getMovieGenres = () => {
  return fetch({
    url: '/genre/movie/list',
    method: 'GET'
  })
}

// 获取电视剧分类
export const getTvGenres = () => {
  return fetch({
    url: '/genre/tv/list',
    method: 'GET'
  })
}

// 根据分类获取电影
export const getMoviesByGenre = (genreId: number, page = 1) => {
  return fetch({
    url: '/discover/movie',
    method: 'GET',
    params: { 
      with_genres: genreId,
      page 
    }
  })
}

// 根据分类获取电视剧
export const getTvShowsByGenre = (genreId: number, page = 1) => {
  return fetch({
    url: '/discover/tv',
    method: 'GET',
    params: { 
      with_genres: genreId,
      page 
    }
  })
} 