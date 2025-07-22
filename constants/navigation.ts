/**
 * 导航菜单常量配置
 */

// 获取当前日期字符串（用于动态查询）
const getTodayString = () => new Date().toISOString().split('T')[0]

// 主导航菜单配置
export const NAV_MENUS = [
  {
    label: 'nav.home', // 首页
    to: '/',
  },
  {
    label: 'nav.movies', // 电影
    dropdown: [
      {
        label: 'home.popularMovies', // 热门电影
        to: '/discover/movie?sort_by=popularity.desc',
        desc: 'home.popularMovies', // 最受欢迎的电影
      },
      {
        label: 'home.upcomingMovies', // 即将上映
        to: '/discover/movie?sort_by=release_date.asc&with_release_type=2|3',
        desc: 'home.upcomingMovies', // 即将上映的新片
      },
      {
        label: 'status.nowPlaying', // 正在上映
        to: '/discover/movie?sort_by=release_date.desc&with_release_type=2|3',
        desc: 'status.nowPlaying', // 影院正在放映
      },
      {
        label: 'status.topRated', // 高分电影
        to: '/discover/movie?sort_by=vote_average.desc&vote_average.gte=7',
        desc: 'status.topRated', // 评分最高的电影
      },
    ],
  },
  {
    label: 'nav.tvShows', // 电视剧
    dropdown: [
      {
        label: 'home.popularTvShows', // 热门剧集
        to: '/discover/tv?sort_by=popularity.desc',
        desc: 'home.popularTvShows', // 最受欢迎的电视剧
      },
      {
        label: 'status.onAir', // 正在播出
        to: '/discover/tv?with_status=0',
        desc: 'status.onAir', // 正在播出的剧集
      },
      {
        label: 'status.topRated', // 高分剧集
        to: '/discover/tv?sort_by=vote_average.desc&vote_average.gte=7',
        desc: 'status.topRated', // 评分最高的电视剧
      },
      {
        label: 'home.todayTrending', // 今日播出
        get to() {
          return `/discover/tv?air_date.gte=${getTodayString()}&air_date.lte=${getTodayString()}`
        },
        desc: 'home.todayTrending', // 今天播出的剧集
      },
    ],
  },
  {
    label: 'nav.actors', // 演员
    to: '/actors',
  },
  {
    label: 'nav.search', // 搜索
    to: '/search',
  },
]

// 移动端主导航数据（扁平化处理，只显示主要页面）
export const MOBILE_NAV_ITEMS = [
  {
    label: 'nav.home', // 首页
    to: '/',
  },
  {
    label: 'home.popularMovies', // 热门电影
    to: '/discover/movie?sort_by=popularity.desc',
  },
  {
    label: 'home.popularTvShows', // 热门剧集
    to: '/discover/tv?sort_by=popularity.desc',
  },
  {
    label: 'nav.actors', // 演员
    to: '/actors',
  },
  {
    label: 'nav.search', // 搜索
    to: '/search',
  },
]

// 用户菜单数据
export const USER_MENU_ITEMS = [
  {
    label: 'user.profile', // 个人资料
    // to: '/profile',
  },
  {
    label: 'user.favorites', // 我的收藏
    // to: '/favorites',
  },
  {
    label: 'user.watchlist', // 观看清单
    // to: '/watchlist',
  },
]
