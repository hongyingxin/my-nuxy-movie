// 获取所有趋势内容
export const getAllTrending = (params) => {
  return useHttp({
    url: '/trending/all/day',
    method: 'GET',
    params
  })
}

// 获取电影趋势
export const getMovieTrending = (page = 1) => {
  return useHttp({
    url: '/trending/movie/day',
    method: 'GET',
    params: { page }
  })
}

// 获取电视剧趋势
export const getTvTrending = (page = 1) => {
  return useHttp({
    url: '/trending/tv/day',
    method: 'GET',
    params: { page }
  })
}

// 获取人物趋势
export const getPersonTrending = (page = 1) => {
  return useHttp({
    url: '/trending/person/day',
    method: 'GET',
    params: { page }
  })
}

// 获取周趋势
export const getWeeklyTrending = (mediaType = 'all', page = 1) => {
  return useHttp({
    url: `/trending/${mediaType}/week`,
    method: 'GET',
    params: { page }
  })
} 