/**
 * 导航菜单常量配置
 */

// 获取当前日期字符串（用于动态查询）
const getTodayString = () => new Date().toISOString().split('T')[0]

// 主导航菜单配置
export const NAV_MENUS = [
  {
    label: '首页',
    to: '/',
  },
  {
    label: '电影',
    dropdown: [
      {
        label: '热门电影',
        to: '/discover/movie?sort_by=popularity.desc',
        desc: '最受欢迎的电影',
      },
      {
        label: '即将上映',
        to: '/discover/movie?sort_by=release_date.asc&with_release_type=2|3',
        desc: '即将上映的新片',
      },
      {
        label: '正在上映',
        to: '/discover/movie?sort_by=release_date.desc&with_release_type=2|3',
        desc: '影院正在放映',
      },
      {
        label: '高分电影',
        to: '/discover/movie?sort_by=vote_average.desc&vote_average.gte=7',
        desc: '评分最高的电影',
      },
    ],
  },
  {
    label: '电视剧',
    dropdown: [
      {
        label: '热门剧集',
        to: '/discover/tv?sort_by=popularity.desc',
        desc: '最受欢迎的电视剧',
      },
      {
        label: '正在播出',
        to: '/discover/tv?with_status=0',
        desc: '正在播出的剧集',
      },
      {
        label: '高分剧集',
        to: '/discover/tv?sort_by=vote_average.desc&vote_average.gte=7',
        desc: '评分最高的电视剧',
      },
      {
        label: '今日播出',
        get to() {
          return `/discover/tv?air_date.gte=${getTodayString()}&air_date.lte=${getTodayString()}`
        },
        desc: '今天播出的剧集',
      },
    ],
  },
  {
    label: '演员',
    to: '/actors',
  },
  {
    label: '搜索',
    to: '/search',
  },
]

// 移动端主导航数据（扁平化处理，只显示主要页面）
export const MOBILE_NAV_ITEMS = [
  {
    label: '首页',
    to: '/',
  },
  {
    label: '热门电影',
    to: '/discover/movie?sort_by=popularity.desc',
  },
  {
    label: '热门剧集',
    to: '/discover/tv?sort_by=popularity.desc',
  },
  {
    label: '演员',
    to: '/actors',
  },
  {
    label: '搜索',
    to: '/search',
  },
]

// 用户菜单数据
export const USER_MENU_ITEMS = [
  {
    label: '个人资料',
    to: '/profile',
  },
  {
    label: '我的收藏',
    to: '/favorites',
  },
  {
    label: '观看清单',
    to: '/watchlist',
  },
]
