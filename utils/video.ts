/**
 * 视频处理工具函数
 */

import type { Video } from '~/types/apiType'

/**
 * 视频类型枚举
 */
export enum VideoType {
  TRAILER = 'Trailer',
  TEASER = 'Teaser',
  CLIP = 'Clip',
  FEATURETTE = 'Featurette',
  BEHIND_THE_SCENES = 'Behind the Scenes',
  BLOOPERS = 'Bloopers',
  RECAP = 'Recap',
}

/**
 * 视频网站枚举
 */
export enum VideoSite {
  YOUTUBE = 'YouTube',
  VIMEO = 'Vimeo',
}

/**
 * 视频优先级配置
 */
interface VideoPriority {
  type: VideoType
  priority: number
  official: boolean
}

/**
 * 视频优先级配置表
 * 数字越小优先级越高
 */
const VIDEO_PRIORITY_CONFIG: VideoPriority[] = [
  { type: VideoType.TRAILER, priority: 1, official: true },
  { type: VideoType.TRAILER, priority: 2, official: false },
  { type: VideoType.TEASER, priority: 3, official: true },
  { type: VideoType.TEASER, priority: 4, official: false },
  { type: VideoType.CLIP, priority: 5, official: true },
  { type: VideoType.CLIP, priority: 6, official: false },
  { type: VideoType.FEATURETTE, priority: 7, official: true },
  { type: VideoType.FEATURETTE, priority: 8, official: false },
  { type: VideoType.BEHIND_THE_SCENES, priority: 9, official: true },
  { type: VideoType.BEHIND_THE_SCENES, priority: 10, official: false },
  { type: VideoType.BLOOPERS, priority: 11, official: true },
  { type: VideoType.BLOOPERS, priority: 12, official: false },
  { type: VideoType.RECAP, priority: 13, official: true },
  { type: VideoType.RECAP, priority: 14, official: false },
]

/**
 * 获取视频的优先级分数
 * @param video 视频对象
 * @returns 优先级分数（数字越小优先级越高）
 */
export function getVideoPriority(video: Video): number {
  const config = VIDEO_PRIORITY_CONFIG.find(
    item => item.type === video.type && item.official === video.official
  )
  return config?.priority || 999 // 未匹配的配置给予最低优先级
}

/**
 * 检查视频是否为主要预告片
 * @param video 视频对象
 * @returns 是否为主要预告片
 */
export function isMainTrailer(video: Video): boolean {
  return (
    video.type === VideoType.TRAILER &&
    video.official === true &&
    video.site === VideoSite.YOUTUBE
  )
}

/**
 * 检查视频是否为官方预告片
 * @param video 视频对象
 * @returns 是否为官方预告片
 */
export function isOfficialTrailer(video: Video): boolean {
  return video.type === VideoType.TRAILER && video.official === true
}

/**
 * 检查视频是否为预告片（包括官方和非官方）
 * @param video 视频对象
 * @returns 是否为预告片
 */
export function isTrailer(video: Video): boolean {
  return video.type === VideoType.TRAILER
}

/**
 * 检查视频是否为花絮
 * @param video 视频对象
 * @returns 是否为花絮
 */
export function isFeaturette(video: Video): boolean {
  return video.type === VideoType.FEATURETTE
}

/**
 * 检查视频是否为幕后花絮
 * @param video 视频对象
 * @returns 是否为幕后花絮
 */
export function isBehindTheScenes(video: Video): boolean {
  return video.type === VideoType.BEHIND_THE_SCENES
}

/**
 * 检查视频是否为片段
 * @param video 视频对象
 * @returns 是否为片段
 */
export function isClip(video: Video): boolean {
  return video.type === VideoType.CLIP
}

/**
 * 检查视频是否为花絮
 * @param video 视频对象
 * @returns 是否为花絮
 */
export function isBloopers(video: Video): boolean {
  return video.type === VideoType.BLOOPERS
}

/**
 * 检查视频是否为回顾
 * @param video 视频对象
 * @returns 是否为回顾
 */
export function isRecap(video: Video): boolean {
  return video.type === VideoType.RECAP
}

/**
 * 检查视频是否为预告片
 * @param video 视频对象
 * @returns 是否为预告片
 */
export function isTeaser(video: Video): boolean {
  return video.type === VideoType.TEASER
}

/**
 * 检查视频是否来自 YouTube
 * @param video 视频对象
 * @returns 是否来自 YouTube
 */
export function isYouTubeVideo(video: Video): boolean {
  return video.site === VideoSite.YOUTUBE
}

/**
 * 检查视频是否来自 Vimeo
 * @param video 视频对象
 * @returns 是否来自 Vimeo
 */
export function isVimeoVideo(video: Video): boolean {
  return video.site === VideoSite.VIMEO
}

/**
 * 获取最佳预告片
 * 根据以下优先级选择：
 * 1. 官方预告片（YouTube）
 * 2. 官方预告片（其他平台）
 * 3. 非官方预告片（YouTube）
 * 4. 非官方预告片（其他平台）
 * @param videos 视频列表
 * @returns 最佳预告片，如果没有则返回 null
 */
export function getBestTrailer(videos: Video[]): Video | null {
  // 过滤出所有预告片
  const trailers = videos.filter(isTrailer)

  if (trailers.length === 0) {
    return null
  }

  // 按优先级排序
  trailers.sort((a, b) => getVideoPriority(a) - getVideoPriority(b))

  return trailers[0]
}

/**
 * 获取主要预告片
 * 优先选择官方 YouTube 预告片
 * @param videos 视频列表
 * @returns 主要预告片，如果没有则返回 null
 */
export function getMainTrailer(videos: Video[]): Video | null {
  // 首先尝试找到官方 YouTube 预告片
  const mainTrailer = videos.find(isMainTrailer)
  if (mainTrailer) {
    return mainTrailer
  }

  // 如果没有官方 YouTube 预告片，返回最佳预告片
  return getBestTrailer(videos)
}

/**
 * 获取所有预告片
 * @param videos 视频列表
 * @returns 预告片列表
 */
export function getAllTrailers(videos: Video[]): Video[] {
  return videos
    .filter(isTrailer)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有花絮
 * @param videos 视频列表
 * @returns 花絮列表
 */
export function getAllFeaturettes(videos: Video[]): Video[] {
  return videos
    .filter(isFeaturette)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有幕后花絮
 * @param videos 视频列表
 * @returns 幕后花絮列表
 */
export function getAllBehindTheScenes(videos: Video[]): Video[] {
  return videos
    .filter(isBehindTheScenes)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有片段
 * @param videos 视频列表
 * @returns 片段列表
 */
export function getAllClips(videos: Video[]): Video[] {
  return videos
    .filter(isClip)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有花絮
 * @param videos 视频列表
 * @returns 花絮列表
 */
export function getAllBloopers(videos: Video[]): Video[] {
  return videos
    .filter(isBloopers)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有回顾
 * @param videos 视频列表
 * @returns 回顾列表
 */
export function getAllRecaps(videos: Video[]): Video[] {
  return videos
    .filter(isRecap)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 获取所有预告片
 * @param videos 视频列表
 * @returns 预告片列表
 */
export function getAllTeasers(videos: Video[]): Video[] {
  return videos
    .filter(isTeaser)
    .sort((a, b) => getVideoPriority(a) - getVideoPriority(b))
}

/**
 * 按类型分组视频
 * @param videos 视频列表
 * @returns 按类型分组的视频对象
 */
export function groupVideosByType(videos: Video[]): Record<string, Video[]> {
  const grouped: Record<string, Video[]> = {
    trailers: getAllTrailers(videos),
    teasers: getAllTeasers(videos),
    clips: getAllClips(videos),
    featurettes: getAllFeaturettes(videos),
    behindTheScenes: getAllBehindTheScenes(videos),
    bloopers: getAllBloopers(videos),
    recaps: getAllRecaps(videos),
  }

  return grouped
}

/**
 * 获取视频播放 URL
 * @param video 视频对象
 * @returns 视频播放 URL
 */
export function getVideoUrl(video: Video): string {
  switch (video.site) {
    case VideoSite.YOUTUBE:
      return `https://www.youtube.com/watch?v=${video.key}`
    case VideoSite.VIMEO:
      return `https://vimeo.com/${video.key}`
    default:
      return `https://www.youtube.com/watch?v=${video.key}` // 默认使用 YouTube
  }
}

/**
 * 获取视频嵌入 URL
 * @param video 视频对象
 * @returns 视频嵌入 URL
 */
export function getVideoEmbedUrl(video: Video): string {
  switch (video.site) {
    case VideoSite.YOUTUBE:
      return `https://www.youtube.com/embed/${video.key}`
    case VideoSite.VIMEO:
      return `https://player.vimeo.com/video/${video.key}`
    default:
      return `https://www.youtube.com/embed/${video.key}` // 默认使用 YouTube
  }
}

/**
 * 获取视频缩略图 URL
 * @param video 视频对象
 * @returns 视频缩略图 URL
 */
export function getVideoThumbnailUrl(video: Video): string {
  switch (video.site) {
    case VideoSite.YOUTUBE:
      return `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`
    case VideoSite.VIMEO:
      // Vimeo 需要额外的 API 调用来获取缩略图，这里使用默认图片
      return '/images/video-placeholder.jpg'
    default:
      return `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`
  }
}

/**
 * 获取视频类型的中文名称
 * @param video 视频对象
 * @returns 视频类型的中文名称
 */
export function getVideoTypeName(video: Video): string {
  switch (video.type) {
    case VideoType.TRAILER:
      return '预告片'
    case VideoType.TEASER:
      return '先导片'
    case VideoType.CLIP:
      return '片段'
    case VideoType.FEATURETTE:
      return '花絮'
    case VideoType.BEHIND_THE_SCENES:
      return '幕后花絮'
    case VideoType.BLOOPERS:
      return '花絮'
    case VideoType.RECAP:
      return '回顾'
    default:
      return '视频'
  }
}

/**
 * 获取视频网站的中文名称
 * @param video 视频对象
 * @returns 视频网站的中文名称
 */
export function getVideoSiteName(video: Video): string {
  switch (video.site) {
    case VideoSite.YOUTUBE:
      return 'YouTube'
    case VideoSite.VIMEO:
      return 'Vimeo'
    default:
      return video.site
  }
}
