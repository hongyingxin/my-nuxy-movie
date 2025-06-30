// 获取热门电视剧
export const getPopularTvShows = (page = 1) => {
  return useHttp({
    url: '/tv/popular',
    method: 'GET',
    params: { page }
  })
}

// 获取正在播出的电视剧
export const getOnTheAirTvShows = (page = 1) => {
  return useHttp({
    url: '/tv/on_the_air',
    method: 'GET',
    params: { page }
  })
}

// 获取即将播出的电视剧
export const getAiringTodayTvShows = (page = 1) => {
  return useHttp({
    url: '/tv/airing_today',
    method: 'GET',
    params: { page }
  })
}

// 获取高分电视剧
export const getTopRatedTvShows = (page = 1) => {
  return useHttp({
    url: '/tv/top_rated',
    method: 'GET',
    params: { page }
  })
}

// 获取电视剧详情
export const getTvShowDetail = (id: number) => {
  return useHttp({
    url: `/tv/${id}`,
    method: 'GET'
  })
}

// 搜索电视剧
export const searchTvShows = (query: string, page = 1) => {
  return useHttp({
    url: '/search/tv',
    method: 'GET',
    params: { query, page }
  })
}

// 获取相似电视剧
export const getSimilarTvShows = (id: number, page = 1) => {
  return useHttp({
    url: `/tv/${id}/similar`,
    method: 'GET',
    params: { page }
  })
}

// 获取推荐电视剧
export const getTvShowRecommendations = (id: number, page = 1) => {
  return useHttp({
    url: `/tv/${id}/recommendations`,
    method: 'GET',
    params: { page }
  })
}

// 获取电视剧演职员
export const getTvShowCredits = (id: number) => {
  return useHttp({
    url: `/tv/${id}/credits`,
    method: 'GET'
  })
}

// 获取电视剧视频
export const getTvShowVideos = (id: number) => {
  return useHttp({
    url: `/tv/${id}/videos`,
    method: 'GET'
  })
}

// 获取电视剧图片
export const getTvShowImages = (id: number) => {
  return useHttp({
    url: `/tv/${id}/images`,
    method: 'GET'
  })
}

// 获取电视剧季数
export const getTvShowSeasons = (id: number) => {
  return useHttp({
    url: `/tv/${id}`,
    method: 'GET'
  })
}

// 获取季详情
export const getSeasonDetail = (tvId: number, seasonNumber: number) => {
  return useHttp({
    url: `/tv/${tvId}/season/${seasonNumber}`,
    method: 'GET'
  })
}

// 获取集详情
export const getEpisodeDetail = (tvId: number, seasonNumber: number, episodeNumber: number) => {
  return useHttp({
    url: `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
    method: 'GET'
  })
} 