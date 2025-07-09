/**
 * 排序选项常量
 * 用于电影和电视剧的排序选择
 */

import type { SortOption } from '~/types/apiType'

/**
 * 电影排序选项
 */
export const MOVIE_SORT_OPTIONS: SortOption[] = [
  {
    value: 'popularity.asc',
    label: '人气升序',
    description: '按人气从低到高排序',
  },
  {
    value: 'popularity.desc',
    label: '人气降序',
    description: '按人气从高到低排序',
  },
  {
    value: 'release_date.asc',
    label: '上映日期升序',
    description: '按上映日期从早到晚排序',
  },
  {
    value: 'release_date.desc',
    label: '上映日期降序',
    description: '按上映日期从晚到早排序',
  },
  {
    value: 'revenue.asc',
    label: '票房升序',
    description: '按票房从低到高排序',
  },
  {
    value: 'revenue.desc',
    label: '票房降序',
    description: '按票房从高到低排序',
  },
  {
    value: 'primary_release_date.asc',
    label: '首映日期升序',
    description: '按首映日期从早到晚排序',
  },
  {
    value: 'primary_release_date.desc',
    label: '首映日期降序',
    description: '按首映日期从晚到早排序',
  },
  {
    value: 'original_title.asc',
    label: '原标题升序',
    description: '按原标题字母顺序排序',
  },
  {
    value: 'original_title.desc',
    label: '原标题降序',
    description: '按原标题字母倒序排序',
  },
  {
    value: 'vote_average.asc',
    label: '评分升序',
    description: '按评分从低到高排序',
  },
  {
    value: 'vote_average.desc',
    label: '评分降序',
    description: '按评分从高到低排序',
  },
  {
    value: 'vote_count.asc',
    label: '投票数升序',
    description: '按投票数从少到多排序',
  },
  {
    value: 'vote_count.desc',
    label: '投票数降序',
    description: '按投票数从多到少排序',
  },
]

/**
 * 电视剧排序选项
 */
export const TV_SORT_OPTIONS: SortOption[] = [
  {
    value: 'popularity.asc',
    label: '人气升序',
    description: '按人气从低到高排序',
  },
  {
    value: 'popularity.desc',
    label: '人气降序',
    description: '按人气从高到低排序',
  },
  {
    value: 'air_date.asc',
    label: '播出日期升序',
    description: '按播出日期从早到晚排序',
  },
  {
    value: 'air_date.desc',
    label: '播出日期降序',
    description: '按播出日期从晚到早排序',
  },
  {
    value: 'first_air_date.asc',
    label: '首播日期升序',
    description: '按首播日期从早到晚排序',
  },
  {
    value: 'first_air_date.desc',
    label: '首播日期降序',
    description: '按首播日期从晚到早排序',
  },
  { value: 'name.asc', label: '名称升序', description: '按名称字母顺序排序' },
  { value: 'name.desc', label: '名称降序', description: '按名称字母倒序排序' },
  {
    value: 'original_name.asc',
    label: '原名升序',
    description: '按原名字母顺序排序',
  },
  {
    value: 'original_name.desc',
    label: '原名降序',
    description: '按原名字母倒序排序',
  },
  {
    value: 'vote_average.asc',
    label: '评分升序',
    description: '按评分从低到高排序',
  },
  {
    value: 'vote_average.desc',
    label: '评分降序',
    description: '按评分从高到低排序',
  },
  {
    value: 'vote_count.asc',
    label: '投票数升序',
    description: '按投票数从少到多排序',
  },
  {
    value: 'vote_count.desc',
    label: '投票数降序',
    description: '按投票数从多到少排序',
  },
]

/**
 * 根据媒体类型获取排序选项
 * @param mediaType 媒体类型 ('movie' | 'tv')
 * @returns 对应的排序选项数组
 */
export const getSortOptions = (mediaType: 'movie' | 'tv'): SortOption[] => {
  return mediaType === 'movie' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS
}

/**
 * 根据排序值获取排序选项
 * @param value 排序值
 * @param mediaType 媒体类型
 * @returns 排序选项对象，如果不存在则返回 null
 */
export const getSortOptionByValue = (
  value: string,
  mediaType: 'movie' | 'tv'
): SortOption | null => {
  const options = getSortOptions(mediaType)
  return options.find(option => option.value === value) || null
}
