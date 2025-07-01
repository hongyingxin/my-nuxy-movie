// 通用详情接口 - 支持电影和电视剧
export const getDetail = (mediaType: 'movie' | 'tv', id: number) => {
  return useHttp({
    url: `/${mediaType}/${id}`,
    method: 'GET'
  })
}

// 通用演职员接口
export const getCredits = (mediaType: 'movie' | 'tv', id: number) => {
  return useHttp({
    url: `/${mediaType}/${id}/credits`,
    method: 'GET'
  })
}

// 通用视频接口
export const getVideos = (mediaType: 'movie' | 'tv', id: number) => {
  return useHttp({
    url: `/${mediaType}/${id}/videos`,
    method: 'GET'
  })
}

// 通用图片接口
export const getImages = (mediaType: 'movie' | 'tv', id: number) => {
  return useHttp({
    url: `/${mediaType}/${id}/images`,
    method: 'GET',
    params: {
      // include_image_language: 'en,null',
      language: ''
    }
  })
}

// 通用相似内容接口
export const getSimilar = (mediaType: 'movie' | 'tv', id: number, page = 1) => {
  return useHttp({
    url: `/${mediaType}/${id}/similar`,
    method: 'GET',
    params: { page }
  })
}

// 通用推荐内容接口
export const getRecommendations = (mediaType: 'movie' | 'tv', id: number, page = 1) => {
  return useHttp({
    url: `/${mediaType}/${id}/recommendations`,
    method: 'GET',
    params: { page }
  })
}

// 通用搜索接口
export const searchMedia = (mediaType: 'movie' | 'tv', query: string, page = 1) => {
  return useHttp({
    url: `/search/${mediaType}`,
    method: 'GET',
    params: { query, page }
  })
}

// 评分接口 (仅电影支持)
export const rateMedia = (mediaType: 'movie' | 'tv', id: number, rating: number) => {
  if (mediaType === 'tv') {
    throw new Error('TV shows do not support rating via API')
  }
  return useHttp({
    url: `/${mediaType}/${id}/rating`,
    method: 'POST',
    params: { value: rating }
  })
} 