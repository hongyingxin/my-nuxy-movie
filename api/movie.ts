// 获取热门电影
export const getPopularMovies = (page = 1) => {
  return fetch({
    url: '/movie/popular',
    method: 'GET',
    params: { page }
  })
}

// 获取正在上映的电影
export const getNowPlayingMovies = (page = 1) => {
  return fetch({
    url: '/movie/now_playing',
    method: 'GET',
    params: { page }
  })
}

// 获取即将上映的电影
export const getUpcomingMovies = (page = 1) => {
  return fetch({
    url: '/movie/upcoming',
    method: 'GET',
    params: { page }
  })
}

// 获取高分电影
export const getTopRatedMovies = (page = 1) => {
  return fetch({
    url: '/movie/top_rated',
    method: 'GET',
    params: { page }
  })
}

// 获取电影详情
export const getMovieDetail = (id: number) => {
  return fetch({
    url: `/movie/${id}`,
    method: 'GET'
  })
}

// 搜索电影
export const searchMovies = (query: string, page = 1) => {
  return fetch({
    url: '/search/movie',
    method: 'GET',
    params: { query, page }
  })
}

// 获取相似电影
export const getSimilarMovies = (id: number, page = 1) => {
  return fetch({
    url: `/movie/${id}/similar`,
    method: 'GET',
    params: { page }
  })
}

// 获取推荐电影
export const getMovieRecommendations = (id: number, page = 1) => {
  return fetch({
    url: `/movie/${id}/recommendations`,
    method: 'GET',
    params: { page }
  })
}

// 获取电影演职员
export const getMovieCredits = (id: number) => {
  return fetch({
    url: `/movie/${id}/credits`,
    method: 'GET'
  })
}

// 获取电影视频
export const getMovieVideos = (id: number) => {
  return fetch({
    url: `/movie/${id}/videos`,
    method: 'GET'
  })
}

// 获取电影图片
export const getMovieImages = (id: number) => {
  return fetch({
    url: `/movie/${id}/images`,
    method: 'GET'
  })
}

// 评分电影 (POST 请求)
export const rateMovie = (id: number, rating: number) => {
  return fetch({
    url: `/movie/${id}/rating`,
    method: 'POST',
    params: { value: rating }
  })
} 