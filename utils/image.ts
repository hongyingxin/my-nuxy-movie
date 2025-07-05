// 获取 TMDB 图片基础 URL
function getTmdbImageBaseUrl() {
  const config = useRuntimeConfig()
  return config.public.tmdbImageBaseUrl
}

// 图片尺寸配置
export const IMAGE_SIZES = {
  // 海报图片尺寸
  poster: {
    small: 'w154',    // 154px
    medium: 'w342',   // 342px (默认)
    large: 'w500',    // 500px
    xlarge: 'w780',   // 780px
    original: 'original' // 原始尺寸
  },
  // 背景图片尺寸
  backdrop: {
    small: 'w300',    // 300px
    medium: 'w780',   // 780px
    large: 'w1280',   // 1280px
    original: 'original' // 原始尺寸
  },
  // 头像图片尺寸
  profile: {
    small: 'w45',     // 45px
    medium: 'w185',   // 185px
    large: 'h632',    // 632px
    original: 'original' // 原始尺寸
  }
}

// 本地 SVG 占位符（内联数据 URL）
const PLACEHOLDER_SVGS = {
  // 电影海报占位符
  poster: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU0IiBoZWlnaHQ9IjIzMSIgdmlld0JveD0iMCAwIDE1NCAyMzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTQiIGhlaWdodD0iMjMxIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9Ijc3IiB5PSIxMTUuNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOUNBMEE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Nb3ZpZTwvdGV4dD4KPC9zdmc+',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQyIiBoZWlnaHQ9IjUxMyIgdmlld0JveD0iMCAwIDM0MiA1MTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNDIiIGhlaWdodD0iNTEzIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE3MSIgeT0iMjU2LjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTBBNiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW92aWU8L3RleHQ+Cjwvc3ZnPgo=',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vdmllPC90ZXh0Pgo8L3N2Zz4K',
    original: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMzc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vdmllPC90ZXh0Pgo8L3N2Zz4K'
  },
  // 背景图片占位符
  backdrop: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgdmlld0JveD0iMCAwIDMwMCAxNjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTY5IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iODQuNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBMEE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CYWNrZHJvcDwvdGV4dD4KPC9zdmc+',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzgwIiBoZWlnaHQ9IjQzOSIgdmlld0JveD0iMCAwIDc4MCA0MzkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI3ODAiIGhlaWdodD0iNDM5IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjM5MCIgeT0iMjE5LjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTBBNiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QmFja2Ryb3A8L3RleHQ+Cjwvc3ZnPgo=',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0MCIgeT0iMzYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhY2tkcm9wPC90ZXh0Pgo8L3N2Zz4K',
    original: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0MCIgeT0iMzYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhY2tkcm9wPC90ZXh0Pgo8L3N2Zz4K'
  },
  // 演员头像占位符
  profile: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA0NSA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ1IiBoZWlnaHQ9IjY4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIyLjUiIHk9IjM0IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBlcnNvbjwvdGV4dD4KPC9zdmc+',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg1IiBoZWlnaHQ9IjI3OCIgdmlld0JveD0iMCAwIDE4NSAyNzgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODUiIGhlaWdodD0iMjc4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjkyLjUiIHk9IjEzOSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBMEE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QZXJzb248L3RleHQ+Cjwvc3ZnPgo=',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBlcnNvbjwvdGV4dD4KPC9zdmc+',
    original: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EwQTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBlcnNvbjwvdGV4dD4KPC9zdmc+'
  }
}

// 类型定义
type ImageType = 'poster' | 'backdrop' | 'profile'
type PosterSize = 'small' | 'medium' | 'large' | 'xlarge' | 'original'
type BackdropSize = 'small' | 'medium' | 'large' | 'original'
type ProfileSize = 'small' | 'medium' | 'large' | 'original'
type ImageSize = PosterSize | BackdropSize | ProfileSize

/**
 * 生成 TMDB 图片 URL
 * @param {string | null} path - 图片路径
 * @param {ImageType} type - 图片类型 ('poster', 'backdrop', 'profile')
 * @param {ImageSize} size - 图片尺寸
 * @returns {string} 完整的图片 URL
 */
function getTmdbImageUrl(path: string | null, type: ImageType = 'poster', size: ImageSize = 'medium'): string {
  if (!path) {
    // 返回本地 SVG 占位符，处理 xlarge 尺寸
    const fallbackSize = size === 'xlarge' && type !== 'poster' ? 'large' : size
    return PLACEHOLDER_SVGS[type]?.[fallbackSize as keyof typeof PLACEHOLDER_SVGS[typeof type]] || PLACEHOLDER_SVGS.poster.medium
  }
  
  const sizeConfig = IMAGE_SIZES[type]
  if (!sizeConfig) {
    console.warn(`Unknown image type: ${type}`)
    return PLACEHOLDER_SVGS.poster.medium
  }
  
  // 处理 xlarge 尺寸，只有 poster 类型支持
  const actualSize = size === 'xlarge' && type !== 'poster' ? 'large' : size
  const sizeValue = sizeConfig[actualSize as keyof typeof sizeConfig] || sizeConfig.medium
  return `${getTmdbImageBaseUrl()}/${sizeValue}${path}`
}

/**
 * 生成海报图片 URL
 * @param {string | null} path - 图片路径
 * @param {PosterSize} size - 尺寸 ('small', 'medium', 'large', 'xlarge', 'original')
 * @returns {string} 海报图片 URL
 */
function getPosterUrl(path: string | null, size: PosterSize = 'medium'): string {
  return getTmdbImageUrl(path, 'poster', size)
}

/**
 * 生成背景图片 URL
 * @param {string | null} path - 图片路径
 * @param {BackdropSize} size - 尺寸 ('small', 'medium', 'large', 'original')
 * @returns {string} 背景图片 URL
 */
function getBackdropUrl(path: string | null, size: BackdropSize = 'medium'): string {
  return getTmdbImageUrl(path, 'backdrop', size)
}

/**
 * 生成头像图片 URL
 * @param {string | null} path - 图片路径
 * @param {ProfileSize} size - 尺寸 ('small', 'medium', 'large', 'original')
 * @returns {string} 头像图片 URL
 */
function getProfileUrl(path: string | null, size: ProfileSize = 'medium'): string {
  return getTmdbImageUrl(path, 'profile', size)
}

/**
 * 生成响应式图片 URL 数组
 * @param {string | null} path - 图片路径
 * @param {ImageType} type - 图片类型
 * @returns {Array} 响应式图片 URL 数组
 */
function getResponsiveImageUrls(path: string | null, type: ImageType = 'poster'): Array<{size: string, url: string}> {
  if (!path) return []
  
  const sizes = Object.keys(IMAGE_SIZES[type] || {}) as ImageSize[]
  return sizes.map(size => ({
    size,
    url: getTmdbImageUrl(path, type, size)
  }))
}

// 导出 image 对象，包含所有图片处理函数
export default {
  getTmdbImageUrl,
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  getResponsiveImageUrls
}

// 为了向后兼容，也导出单独的函数
// export {
//   getTmdbImageUrl,
//   getPosterUrl,
//   getBackdropUrl,
//   getProfileUrl,
//   getResponsiveImageUrls
// } 