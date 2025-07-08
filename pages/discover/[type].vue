<!-- 
  电影和电视剧的列表页
  url: /discover/movie
  url: /discover/tv
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              {{ getPageHeaderTitle() }}
            </h1>
            <p class="text-gray-600 mt-2">
              {{ getPageHeaderDescription() }}
            </p>
          </div>
          
          <!-- 筛选按钮 -->
          <button 
            @click="toggleFilters"
            class="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
            </svg>
            <span>筛选</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 筛选侧边栏 -->
        <div 
          v-if="showFilters"
          class="lg:w-80 bg-white rounded-lg shadow-sm border p-6"
        >
          <h3 class="text-lg font-semibold text-gray-900 mb-4">筛选条件</h3>
          
          <!-- 应用筛选按钮 - 移到顶部 -->
          <div v-if="hasFilterChanges" class="mb-4">
            <button 
              ref="applyFilterBtn"
              @click="applyFilters"
              class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              应用筛选
            </button>
          </div>

          <!-- 筛选条件内容区域 -->
          <div class="space-y-6">
            <!-- 排序 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
              <select 
                v-model="filters.sort_by"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option 
                  v-for="option in sortOptions" 
                  :key="option.value" 
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- 分类筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="genre in genres" 
                  :key="genre.id"
                  @click="toggleGenre(genre.id)"
                  :class="[
                    'px-3 py-2 text-sm rounded-md transition-colors border',
                    filters.with_genres.includes(genre.id)
                      ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  ]"
                >
                  {{ genre.name }}
                </button>
              </div>
            </div>

            <!-- 评分筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">最低评分</label>
              <div class="flex items-center space-x-2">
                <input 
                  type="range" 
                  v-model="filters['vote_average.gte']"
                  min="0" 
                  max="10" 
                  step="0.5"
                  class="flex-1"
                >
                <span class="text-sm text-gray-600 w-12">{{ filters['vote_average.gte'] || 0 }}</span>
              </div>
            </div>

            <!-- 年份筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ isMovie ? '发行时间' : '播出时间' }}
              </label>
              <div class="grid grid-cols-2 gap-2">
                <input 
                  type="date" 
                  :value="getStartDate()"
                  @input="updateStartDate($event.target.value)"
                  placeholder="开始日期"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                <input 
                  type="date" 
                  :value="getEndDate()"
                  @input="updateEndDate($event.target.value)"
                  placeholder="结束日期"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
              </div>
              <p class="text-xs text-gray-500 mt-1">
                {{ filterDescription }}
                <span v-if="filters.sort_by === 'popularity.desc'" class="block mt-1 text-blue-600">
                  💡 热门内容默认包含未来内容，确保内容新鲜度
                </span>
              </p>
            </div>

            <!-- 语言筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">语言</label>
              <select 
                v-model="filters.with_original_language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">所有语言</option>
                <option value="zh">中文</option>
                <option value="en">英语</option>
                <option value="ja">日语</option>
                <option value="ko">韩语</option>
                <option value="fr">法语</option>
                <option value="de">德语</option>
                <option value="es">西班牙语</option>
              </select>
            </div>

            <!-- 地区筛选 (仅电影) -->
            <div v-if="isMovie">
              <label class="block text-sm font-medium text-gray-700 mb-2">地区</label>
              <select 
                v-model="filters.region"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">全球</option>
                <option value="US">美国</option>
                <option value="CN">中国</option>
                <option value="JP">日本</option>
                <option value="KR">韩国</option>
                <option value="GB">英国</option>
                <option value="FR">法国</option>
                <option value="DE">德国</option>
                <option value="CA">加拿大</option>
                <option value="AU">澳大利亚</option>
                <option value="IN">印度</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">选择地区会影响上映日期的排序</p>
            </div>

            <!-- 上映类型筛选 (仅电影) -->
            <div v-if="isMovie">
              <label class="block text-sm font-medium text-gray-700 mb-2">上映类型</label>
              <select 
                v-model="filters.with_release_type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">所有类型</option>
                <option value="2|3">影院上映</option>
                <option value="3|2">影院上映 (优先)</option>
                <option value="4">数字发行</option>
                <option value="5">实体发行</option>
                <option value="6">电视播出</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">选择上映类型会影响日期排序</p>
            </div>
          </div>

          <!-- 重置按钮 - 固定在底部 -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <button 
              @click="resetFilters"
              class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              重置筛选
            </button>
          </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="flex-1">
          <!-- 结果统计 -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-gray-600">
              找到 <span class="font-semibold">{{ totalResults }}</span> 个结果
            </p>
            
            <!-- 视图切换 -->
            <div class="flex items-center space-x-2">
              <button 
                @click="viewMode = 'grid'"
                :class="[
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button 
                @click="viewMode = 'list'"
                :class="[
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'
                ]"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="list.pending.value">
            <!-- 网格视图骨架屏 -->
            <div v-if="viewMode === 'grid'" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div v-for="n in 12" :key="n" class="animate-pulse">
                <div class="bg-gray-300 aspect-[2/3] rounded-lg mb-2"></div>
                <div class="bg-gray-300 h-4 rounded mb-1"></div>
                <div class="bg-gray-300 h-3 rounded w-1/2"></div>
              </div>
            </div>
            
            <!-- 列表视图骨架屏 -->
            <div v-else-if="viewMode === 'list'" class="space-y-4">
              <SkeletonListItem
                v-for="n in 12"
                :key="n"
                :is-movie="isMovie"
              />
            </div>
          </div>

          <!-- 网格视图 -->
          <div v-else-if="viewMode === 'grid' && list.data.value" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <MediaCard
              v-for="item in list.data.value.results"
              :key="item.id"
              :item="item"
              :is-movie="isMovie"
            />
          </div>

          <!-- 列表视图 -->
          <div v-else-if="viewMode === 'list' && list.data.value" class="space-y-4">
            <MediaListItem
              v-for="item in list.data.value.results"
              :key="item.id"
              :item="item"
              :is-movie="isMovie"
            />
          </div>

          <!-- 分页 -->
          <CommonPagination
            v-if="list.data.value && list.data.value.total_pages > 1"
            :current-page="currentPage"
            :total-pages="list.data.value.total_pages"
            :total-results="list.data.value.total_results"
            :show-first-last="true"
            :show-quick-jump="true"
            @page-change="changePage"
            class="mt-8"
          />
        </div>
      </div>
    </div>

    <!-- 吸顶应用筛选按钮 -->
    <div 
      v-if="hasFilterChanges && !isApplyButtonVisible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
    >
      <div class="container mx-auto px-6 py-4">
        <button 
          @click="applyFilters"
          class="w-full px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
        >
          应用筛选
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
// 路由参数
const route = useRoute()
const type = route.params.type // 'movie' 或 'tv'

// API 导入
import { discoverMedia, MOVIE_SORT_OPTIONS, TV_SORT_OPTIONS } from '~/api/discover'

// ==================== 工具函数 ====================

/**
 * 获取默认排序方式
 */
const getDefaultSortBy = () => {
  return type === 'movie' ? 'release_date.desc' : 'first_air_date.desc'
}

// ==================== 响应式数据 ====================
const showFilters = ref(true)
const viewMode = ref('grid')

// 当前页码 - 从 URL 参数初始化
const currentPage = computed(() => {
  const page = parseInt(route.query.page)
  return page > 0 ? page : 1
})

const isApplyButtonVisible = ref(true)
const applyFilterBtn = ref(null)
const list = ref()

// 从 URL 参数初始化筛选条件
const getInitialFilters = () => {
  const currentYear = new Date().getFullYear()
  const defaultEndYear = currentYear + 1
  
  // 获取当前日期
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
  // 计算不同分类的默认时间范围
  const getDefaultDateRange = () => {
    // 从 URL 参数判断分类类型
    const sortBy = route.query.sort_by
    const withStatus = route.query.with_status
    const airDateGte = route.query['air_date.gte']
    const airDateLte = route.query['air_date.lte']
    
    // 如果用户已经设置了具体的日期范围，直接使用
    if (airDateGte || airDateLte) {
      return { startDate: airDateGte || null, endDate: airDateLte || null }
    }
    
    // 根据不同的筛选条件设置时间范围
    if (sortBy === 'popularity.desc') {
      // 热门内容：设置未来截止时间，避免过时内容
      // 设置未来1.5年的截止时间
      const futureDate = new Date(now.getFullYear(), now.getMonth() + 18, now.getDate())
      return { startDate: null, endDate: futureDate.toISOString().split('T')[0] }
    } else if (sortBy === 'vote_average.desc') {
      // 高分内容：无时间限制，但排除太新的内容（评分不足）
      // 设置1年前的截止时间
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split('T')[0]
      return { startDate: null, endDate: oneYearAgo }
    } else if (sortBy === 'release_date.asc' || sortBy === 'first_air_date.asc') {
      // 即将上映/播出：当前日期到未来一年
      const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString().split('T')[0]
      return { startDate: today, endDate: oneYearLater }
    } else if (sortBy === 'release_date.desc' || sortBy === 'first_air_date.desc') {
      // 正在上映/播出：过去2个月到当前日期
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate()).toISOString().split('T')[0]
      return { startDate: twoMonthsAgo, endDate: today }
    } else if (withStatus === '0') {
      // 正在播出：无时间限制，使用状态筛选
      return { startDate: null, endDate: null }
    } else {
      // 默认：当前年份到明年
      return { startDate: null, endDate: `${defaultEndYear}-12-31` }
    }
  }
  
  const dateRange = getDefaultDateRange()
  
  return {
    sort_by: route.query.sort_by || getDefaultSortBy(),
    with_genres: route.query.with_genres ? route.query.with_genres.split(',').map(Number) : [],
    'vote_average.gte': route.query['vote_average.gte'] ? parseFloat(route.query['vote_average.gte']) : 0,
    'air_date.gte': route.query['air_date.gte'] ? route.query['air_date.gte'] : dateRange.startDate,
    'air_date.lte': route.query['air_date.lte'] ? route.query['air_date.lte'] : dateRange.endDate,
    'primary_release_date.gte': route.query['primary_release_date.gte'] ? route.query['primary_release_date.gte'] : dateRange.startDate,
    'primary_release_date.lte': route.query['primary_release_date.lte'] ? route.query['primary_release_date.lte'] : dateRange.endDate,
    'release_date.gte': route.query['release_date.gte'] ? route.query['release_date.gte'] : dateRange.startDate,
    'release_date.lte': route.query['release_date.lte'] ? route.query['release_date.lte'] : dateRange.endDate,
    'first_air_date.gte': route.query['first_air_date.gte'] ? route.query['first_air_date.gte'] : dateRange.startDate,
    'first_air_date.lte': route.query['first_air_date.lte'] ? route.query['first_air_date.lte'] : dateRange.endDate,
    with_original_language: route.query.with_original_language || '',
    with_status: route.query.with_status || null,
    region: route.query.region || '',
    with_release_type: route.query.with_release_type || ''
  }
}

// 筛选条件 - 从 URL 参数初始化
const filters = ref(getInitialFilters())

// 保存初始筛选条件状态，用于检测变化
const initialFilters = ref(JSON.parse(JSON.stringify(filters.value)))

/**
 * 获取媒体类型的基础标题
 */
const getMediaTypeTitle = () => {
  return type === 'movie' ? '电影' : '电视剧'
}

/**
 * 根据筛选条件获取分类名称
 */
const getCategoryName = (sortBy, withStatus, airDateGte, airDateLte) => {
  if (withStatus === '0') {
    return '正在播出'
  } else if (airDateGte && airDateLte && airDateGte === airDateLte) {
    return '今日播出'
  } else if (sortBy === 'popularity.desc') {
    return '热门'
  } else if (sortBy === 'release_date.asc' || sortBy === 'first_air_date.asc') {
    return '即将上映'
  } else if (sortBy === 'release_date.desc' || sortBy === 'first_air_date.desc') {
    return '正在上映'
  } else if (sortBy === 'vote_average.desc') {
    return '高分'
  } else {
    return '最新'
  }
}

/**
 * 根据筛选条件获取页面描述
 */
const getPageDescription = (sortBy, withStatus, airDateGte, airDateLte) => {
  const isMovie = type === 'movie'
  const releaseType = filters.value.with_release_type
  
  if (withStatus === '0') {
    return isMovie 
      ? '发现正在上映的电影，影院观影指南' 
      : '发现正在播出的电视剧，当前热门剧集'
  } else if (airDateGte && airDateLte && airDateGte === airDateLte) {
    return isMovie 
      ? '发现今天上映的电影' 
      : '发现今天播出的电视剧'
  } else if (sortBy === 'popularity.desc') {
    return isMovie 
      ? '发现最热门的电影，包含近期和即将上映的佳作' 
      : '发现最热门的电视剧，包含近期和即将播出的精品'
  } else if (sortBy === 'release_date.asc' || sortBy === 'first_air_date.asc') {
    if (isMovie && releaseType === '2|3') {
      return '发现即将在影院上映的电影，提前了解新片信息'
    }
    return isMovie 
      ? '发现即将上映的电影，提前了解新片信息' 
      : '发现即将播出的电视剧，提前了解新剧信息'
  } else if (sortBy === 'release_date.desc' || sortBy === 'first_air_date.desc') {
    if (isMovie && releaseType === '2|3') {
      return '发现正在影院上映的电影，影院观影指南'
    }
    return isMovie 
      ? '发现正在上映的电影，影院观影指南' 
      : '发现正在播出的电视剧，当前热门剧集'
  } else if (sortBy === 'vote_average.desc') {
    return isMovie 
      ? '发现评分最高的电影，经典佳作推荐' 
      : '发现评分最高的电视剧，精品剧集推荐'
  } else {
    return isMovie 
      ? '探索最新上映的电影' 
      : '探索最新播出的电视剧'
  }
}

// 计算当前时间范围
const currentDateRange = computed(() => {
  const startDate = filters.value['air_date.gte'] || filters.value['primary_release_date.gte'] || filters.value['release_date.gte'] || filters.value['first_air_date.gte']
  const endDate = filters.value['air_date.lte'] || filters.value['primary_release_date.lte'] || filters.value['release_date.lte'] || filters.value['first_air_date.lte']

  return {
    startDate,
    endDate
  }
})

// 获取开始日期
const getStartDate = () => {
  const startDate = currentDateRange.value.startDate
  return startDate || ''
}

// 更新开始日期
const updateStartDate = (dateString) => {
  if (dateString) {
    filters.value['air_date.gte'] = dateString
    filters.value['primary_release_date.gte'] = dateString
    filters.value['release_date.gte'] = dateString
    filters.value['first_air_date.gte'] = dateString
  } else {
    filters.value['air_date.gte'] = null
    filters.value['primary_release_date.gte'] = null
    filters.value['release_date.gte'] = null
    filters.value['first_air_date.gte'] = null
  }
}

// 获取结束日期
const getEndDate = () => {
  const endDate = currentDateRange.value.endDate
  return endDate || ''
}

// 更新结束日期
const updateEndDate = (dateString) => {
  if (dateString) {
    filters.value['air_date.lte'] = dateString
    filters.value['primary_release_date.lte'] = dateString
    filters.value['release_date.lte'] = dateString
    filters.value['first_air_date.lte'] = dateString
  } else {
    filters.value['air_date.lte'] = null
    filters.value['primary_release_date.lte'] = null
    filters.value['release_date.lte'] = null
    filters.value['first_air_date.lte'] = null
  }
}

// ==================== 计算属性 ====================
const sortOptions = computed(() => {
  return type === 'movie' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS
})

const totalResults = computed(() => {
  return list.value?.data.value?.total_results || 0
})

// 计算属性：是否为电影类型
const isMovie = computed(() => type === 'movie')

// 计算属性：筛选说明文字
const filterDescription = computed(() => {
  return isMovie.value 
    ? '筛选指定发行时间范围内的电影' 
    : '筛选指定播出时间范围内的电视剧'
})

// 检测筛选条件是否有变化
const hasFilterChanges = computed(() => {
  return JSON.stringify(filters.value) !== JSON.stringify(initialFilters.value)
})

// 动态页面标题
const pageTitle = computed(() => {
  const sortBy = filters.value.sort_by
  const withStatus = filters.value.with_status
  const airDateGte = filters.value['air_date.gte']
  const airDateLte = filters.value['air_date.lte']
  
  // 使用工具函数获取分类名称
  const categoryName = getCategoryName(sortBy, withStatus, airDateGte, airDateLte)
  const baseTitle = getMediaTypeTitle()
  
  const region = filters.value.region
  const releaseType = filters.value.with_release_type
  
  const regionNames = {
    'US': '美国', 'CN': '中国', 'JP': '日本', 'KR': '韩国',
    'GB': '英国', 'FR': '法国', 'DE': '德国', 'CA': '加拿大',
    'AU': '澳大利亚', 'IN': '印度'
  }
  const releaseTypeNames = {
    '2|3': '影院上映', '3|2': '影院上映', '4': '数字发行',
    '5': '实体发行', '6': '电视播出'
  }
  
  if (region && releaseType) {
    return `${regionNames[region] || region}${releaseTypeNames[releaseType] || ''}${categoryName}${baseTitle} - Nuxt Movie`
  } else if (region) {
    return `${regionNames[region] || region}${categoryName}${baseTitle} - Nuxt Movie`
  } else if (releaseType) {
    return `${releaseTypeNames[releaseType] || ''}${categoryName}${baseTitle} - Nuxt Movie`
  }
  return `${categoryName}${baseTitle} - Nuxt Movie`
})

// 动态页面描述
const pageDescription = computed(() => {
  const sortBy = filters.value.sort_by
  const withStatus = filters.value.with_status
  const airDateGte = filters.value['air_date.gte']
  const airDateLte = filters.value['air_date.lte']
  
  // 使用工具函数获取页面描述
  return getPageDescription(sortBy, withStatus, airDateGte, airDateLte)
})

// 从 store 中获取分类数据
const genreStore = useGenreStore()

const genres = computed(() => {
  return type === 'movie' 
    ? genreStore.movieGenres || []
    : genreStore.tvGenres || []
})

// SEO 配置
useHead({
  title: pageTitle,
  meta: [
    { 
      name: 'description', 
      content: pageDescription.value
    }
  ]
})

// ==================== 方法 ====================
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

// 获取页面头部标题
const getPageHeaderTitle = () => {
  const sortBy = filters.value.sort_by
  const withStatus = filters.value.with_status
  const airDateGte = filters.value['air_date.gte']
  const airDateLte = filters.value['air_date.lte']
  
  // 使用工具函数获取分类名称和基础标题
  const categoryName = getCategoryName(sortBy, withStatus, airDateGte, airDateLte)
  const baseTitle = getMediaTypeTitle()
  
  return `${categoryName}${baseTitle}`
}

// 获取页面头部描述
const getPageHeaderDescription = () => {
  const sortBy = filters.value.sort_by
  const withStatus = filters.value.with_status
  const airDateGte = filters.value['air_date.gte']
  const airDateLte = filters.value['air_date.lte']
  
  // 使用工具函数获取页面描述
  return getPageDescription(sortBy, withStatus, airDateGte, airDateLte)
}

// 将筛选条件转换为 URL 查询参数
const filtersToQuery = (filterParams) => {
  const query = {}
  
  const defaultSort = getDefaultSortBy()
  if (filterParams.sort_by && filterParams.sort_by !== defaultSort) {
    query.sort_by = filterParams.sort_by
  }
  
  if (filterParams.with_genres && filterParams.with_genres.length > 0) {
    query.with_genres = filterParams.with_genres.join(',')
  }
  
  if (filterParams['vote_average.gte'] && filterParams['vote_average.gte'] > 0) {
    query['vote_average.gte'] = filterParams['vote_average.gte'].toString()
  }
  
  if (filterParams['air_date.gte']) {
    query['air_date.gte'] = filterParams['air_date.gte']
  }
  
  if (filterParams['primary_release_date.gte']) {
    query['primary_release_date.gte'] = filterParams['primary_release_date.gte']
  }
  
  if (filterParams['primary_release_date.lte']) {
    query['primary_release_date.lte'] = filterParams['primary_release_date.lte']
  }
  
  if (filterParams['release_date.gte']) {
    query['release_date.gte'] = filterParams['release_date.gte']
  }
  
  if (filterParams['release_date.lte']) {
    query['release_date.lte'] = filterParams['release_date.lte']
  }
  
  if (filterParams['first_air_date.gte']) {
    query['first_air_date.gte'] = filterParams['first_air_date.gte']
  }
  
  if (filterParams['first_air_date.lte']) {
    query['first_air_date.lte'] = filterParams['first_air_date.lte']
  }
  
  if (filterParams.with_original_language) {
    query.with_original_language = filterParams.with_original_language
  }
  
  if (filterParams.with_status !== null) {
    query.with_status = filterParams.with_status
  }
  
  if (filterParams.region) {
    query.region = filterParams.region
  }
  
  if (filterParams.with_release_type) {
    query.with_release_type = filterParams.with_release_type
  }
  
  return query
}

const applyFilters = async () => {
  // 更新初始状态
  initialFilters.value = JSON.parse(JSON.stringify(filters.value))
  
  // 构建新的查询参数
  const filterQuery = filtersToQuery(filters.value)
  const newQuery = { ...filterQuery }
  
  // 重置到第一页
  delete newQuery.page
  
  navigateTo({
    query: newQuery
  }, { replace: true })
}

const resetFilters = () => {
  const currentYear = new Date().getFullYear()
  const defaultEndYear = currentYear + 1
  
  filters.value = {
    sort_by: getDefaultSortBy(),
    with_genres: [],
    'vote_average.gte': 0,
    'air_date.gte': null,
    'air_date.lte': `${defaultEndYear}-12-31`,
    'primary_release_date.gte': null,
    'primary_release_date.lte': `${defaultEndYear}-12-31`,
    'release_date.gte': null,
    'release_date.lte': `${defaultEndYear}-12-31`,
    'first_air_date.gte': null,
    'first_air_date.lte': `${defaultEndYear}-12-31`,
    with_original_language: '',
    with_status: null,
    region: '',
    with_release_type: ''
  }
  // 重置初始状态
  initialFilters.value = JSON.parse(JSON.stringify(filters.value))
  applyFilters()
}

// 页面跳转处理
const changePage = (page) => {
  if (page < 1 || page > (list.value?.data.value?.total_pages || 1)) return
  
  // 构建新的查询参数，保持筛选条件
  const filterQuery = filtersToQuery(filters.value)
  const newQuery = { ...filterQuery }
  
  if (page === 1) {
    // 第1页时移除 page 参数
    delete newQuery.page
  } else {
    // 其他页面添加 page 参数
    newQuery.page = page
  }
  
  navigateTo({
    query: newQuery
  }, { replace: true })
}

const fetchData = async () => {
  try {
    // 构建筛选参数
    const params = {
      page: currentPage.value,
      sort_by: filters.value.sort_by,
      ...(filters.value.with_genres.length > 0 && { 
        with_genres: filters.value.with_genres.join(',') 
      }),
      ...(filters.value['vote_average.gte'] > 0 && { 
        'vote_average.gte': filters.value['vote_average.gte'] 
      }),
      ...(filters.value['air_date.gte'] && { 'air_date.gte': filters.value['air_date.gte'] }),
      ...(filters.value['primary_release_date.gte'] && { 'primary_release_date.gte': filters.value['primary_release_date.gte'] }),
      ...(filters.value['primary_release_date.lte'] && { 'primary_release_date.lte': filters.value['primary_release_date.lte'] }),
      ...(filters.value['release_date.gte'] && { 'release_date.gte': filters.value['release_date.gte'] }),
      ...(filters.value['release_date.lte'] && { 'release_date.lte': filters.value['release_date.lte'] }),
      ...(filters.value['first_air_date.gte'] && { 'first_air_date.gte': filters.value['first_air_date.gte'] }),
      ...(filters.value['first_air_date.lte'] && { 'first_air_date.lte': filters.value['first_air_date.lte'] }),
      ...(filters.value.with_original_language && { 
        with_original_language: filters.value.with_original_language 
      }),
      ...(filters.value.with_status !== null && { 
        with_status: filters.value.with_status 
      }),
      ...(filters.value.region && { 
        region: filters.value.region 
      }),
      ...(filters.value.with_release_type && { 
        with_release_type: filters.value.with_release_type 
      })
    }
    
    list.value = discoverMedia(type, params)
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const toggleGenre = (genreId) => {
  if (filters.value.with_genres.includes(genreId)) {
    filters.value.with_genres = filters.value.with_genres.filter((id) => id !== genreId)
  } else {
    filters.value.with_genres.push(genreId)
  }
}

// ==================== 监听器 ====================
// 监听路由参数变化，恢复筛选条件并获取数据
watch(() => route.query, (newQuery) => {
  const newFilters = getInitialFilters()
  filters.value = newFilters
  initialFilters.value = JSON.parse(JSON.stringify(newFilters))
  fetchData()
}, { immediate: true })

// 监听筛选条件变化，设置观察器
watch(hasFilterChanges, (newValue) => {
  if (newValue) {
    nextTick(() => {
      if (applyFilterBtn.value) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isApplyButtonVisible.value = entry.isIntersecting
            })
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          }
        )
        
        observer.observe(applyFilterBtn.value)
        
        // 清理函数 - 当筛选条件应用后清理
        watch(hasFilterChanges, (hasChanges) => {
          if (!hasChanges) {
            observer.disconnect()
          }
        })
      }
    })
  } else {
    // 当没有筛选变化时，重置可见性状态
    isApplyButtonVisible.value = true
  }
})

</script>

<style scoped>
</style> 