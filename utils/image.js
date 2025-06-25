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

/**
 * 生成 TMDB 图片 URL
 * @param {string} path - 图片路径
 * @param {string} type - 图片类型 ('poster', 'backdrop', 'profile')
 * @param {string} size - 图片尺寸
 * @returns {string} 完整的图片 URL
 */
export function getTmdbImageUrl(path, type = 'poster', size = 'medium') {
  if (!path) return null
  
  const sizeConfig = IMAGE_SIZES[type]
  if (!sizeConfig) {
    console.warn(`Unknown image type: ${type}`)
    return null
  }
  
  const sizeValue = sizeConfig[size] || sizeConfig.medium
  return `${getTmdbImageBaseUrl()}/${sizeValue}${path}`
}

/**
 * 生成海报图片 URL
 * @param {string} path - 图片路径
 * @param {string} size - 尺寸 ('small', 'medium', 'large', 'xlarge', 'original')
 * @returns {string} 海报图片 URL
 */
export function getPosterUrl(path, size = 'medium') {
  return getTmdbImageUrl(path, 'poster', size)
}

/**
 * 生成背景图片 URL
 * @param {string} path - 图片路径
 * @param {string} size - 尺寸 ('small', 'medium', 'large', 'original')
 * @returns {string} 背景图片 URL
 */
export function getBackdropUrl(path, size = 'medium') {
  return getTmdbImageUrl(path, 'backdrop', size)
}

/**
 * 生成头像图片 URL
 * @param {string} path - 图片路径
 * @param {string} size - 尺寸 ('small', 'medium', 'large', 'original')
 * @returns {string} 头像图片 URL
 */
export function getProfileUrl(path, size = 'medium') {
  return getTmdbImageUrl(path, 'profile', size)
}

/**
 * 生成响应式图片 URL 数组
 * @param {string} path - 图片路径
 * @param {string} type - 图片类型
 * @returns {Array} 响应式图片 URL 数组
 */
export function getResponsiveImageUrls(path, type = 'poster') {
  if (!path) return []
  
  const sizes = Object.keys(IMAGE_SIZES[type] || {})
  return sizes.map(size => ({
    size,
    url: getTmdbImageUrl(path, type, size)
  }))
} 