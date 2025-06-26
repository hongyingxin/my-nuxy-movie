<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              {{ type === 'movie' ? '发现电影' : '发现电视剧' }}
            </h1>
            <p class="text-gray-600 mt-2">
              探索最新、最热门的{{ type === 'movie' ? '电影' : '电视剧' }}
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
              <div class="space-y-2 border border-gray-200 rounded-md p-3">
                <label 
                  v-for="genre in genres" 
                  :key="genre.id"
                  class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input 
                    type="checkbox" 
                    :value="genre.id"
                    v-model="filters.with_genres"
                    class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  >
                  <span class="text-sm text-gray-700">{{ genre.name }}</span>
                </label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">年份范围</label>
              <div class="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  v-model="filters.year"
                  placeholder="开始年份"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                <input 
                  type="number" 
                  v-model="filters['air_date.gte']"
                  placeholder="结束年份"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
              </div>
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
          <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div v-for="n in 12" :key="n" class="animate-pulse">
              <div class="bg-gray-300 aspect-[2/3] rounded-lg mb-2"></div>
              <div class="bg-gray-300 h-4 rounded mb-1"></div>
              <div class="bg-gray-300 h-3 rounded w-1/2"></div>
            </div>
          </div>

          <!-- 网格视图 -->
          <div v-else-if="viewMode === 'grid' && data" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <MediaCard
              v-for="item in data.results"
              :key="item.id"
              :item="item"
              :is-movie="type === 'movie'"
              :movie-genres="movieGenres?.genres || []"
              :tv-genres="tvGenres?.genres || []"
            />
          </div>

          <!-- 列表视图 -->
          <div v-else-if="viewMode === 'list' && data" class="space-y-4">
            <div 
              v-for="item in data.results"
              :key="item.id"
              class="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div class="flex space-x-4">
                <img 
                  :src="getPosterUrl(item.poster_path)" 
                  :alt="item.title || item.name"
                  class="w-16 h-24 object-cover rounded-lg"
                  @error="handleImageError"
                >
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1">
                    {{ item.title || item.name }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                    {{ item.overview || '暂无简介' }}
                  </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{{ formatDate(item.release_date || item.first_air_date) }}</span>
                    <span v-if="item.vote_average">★ {{ item.vote_average.toFixed(1) }}</span>
                    <span v-if="type === 'movie' && item.runtime">{{ item.runtime }}分钟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="data && data.total_pages > 1" class="mt-8 flex justify-center">
            <div class="flex items-center space-x-2">
              <button 
                @click="changePage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                上一页
              </button>
              
              <span class="px-3 py-2 text-gray-600">
                {{ currentPage }} / {{ data.total_pages }}
              </span>
              
              <button 
                @click="changePage(currentPage + 1)"
                :disabled="currentPage >= data.total_pages"
                class="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
          </div>
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
import { getMovieGenres, getTvGenres } from '~/api/genre'
import { getTmdbImageUrl } from '~/utils/image'

// SEO 配置
useHead({
  title: type === 'movie' ? '发现电影 - Nuxt Movie' : '发现电视剧 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: type === 'movie' 
        ? '发现最新最热门的电影，支持多种筛选条件' 
        : '发现最新最热门的电视剧，支持多种筛选条件' 
    }
  ]
})

// ==================== 响应式数据 ====================
const showFilters = ref(true)
const viewMode = ref('grid')
const currentPage = ref(1)
const pending = ref(false)
const data = ref(null)
const isApplyButtonVisible = ref(true)
const applyFilterBtn = ref(null)

// 筛选条件
const filters = ref({
  sort_by: 'popularity.desc',
  with_genres: [],
  'vote_average.gte': 0,
  year: null,
  'air_date.gte': null,
  with_original_language: ''
})

// 保存初始筛选条件状态，用于检测变化
const initialFilters = ref({
  sort_by: 'popularity.desc',
  with_genres: [],
  'vote_average.gte': 0,
  year: null,
  'air_date.gte': null,
  with_original_language: ''
})

// ==================== 计算属性 ====================
const sortOptions = computed(() => {
  return type === 'movie' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS
})

const totalResults = computed(() => {
  return data.value?.total_results || 0
})

// 检测筛选条件是否有变化
const hasFilterChanges = computed(() => {
  return JSON.stringify(filters.value) !== JSON.stringify(initialFilters.value)
})

// 获取分类数据
const movieGenres = getMovieGenres()
const tvGenres = getTvGenres()

const genres = computed(() => {
  return type === 'movie' 
    ? movieGenres.data.value?.genres || []
    : tvGenres.data.value?.genres || []
})

// ==================== 方法 ====================
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const applyFilters = async () => {
  currentPage.value = 1
  // 更新初始状态
  initialFilters.value = JSON.parse(JSON.stringify(filters.value))
  await fetchData()
}

const resetFilters = () => {
  filters.value = {
    sort_by: 'popularity.desc',
    with_genres: [],
    'vote_average.gte': 0,
    year: null,
    'air_date.gte': null,
    with_original_language: ''
  }
  // 重置初始状态
  initialFilters.value = JSON.parse(JSON.stringify(filters.value))
  applyFilters()
}

const changePage = async (page) => {
  currentPage.value = page
  await fetchData()
}

const fetchData = async () => {
  pending.value = true
  
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
      ...(filters.value.year && { year: filters.value.year }),
      ...(filters.value['air_date.gte'] && { 'air_date.gte': filters.value['air_date.gte'] }),
      ...(filters.value.with_original_language && { 
        with_original_language: filters.value.with_original_language 
      })
    }
    console.log('type----------------', type)
    console.log('params----------------', params)
    const result = await discoverMedia(type, params)
    console.log('result.data.value----------------', result)
    data.value = result.data.value
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    pending.value = false
  }
}
// 获取数据，不应该在 onMounted 中获取
fetchData()

const getPosterUrl = (path) => {
  return getTmdbImageUrl(path, 'poster', 'medium')
}

const formatDate = (dateString) => {
  if (!dateString) return '未知'
  return new Date(dateString).getFullYear()
}

const handleImageError = (event) => {
  const img = event.target
  img.style.display = 'none'
}

// 监听筛选条件变化，设置观察器
watch(hasFilterChanges, (newValue) => {
  if (newValue) {
    nextTick(() => {
      console.log('Filter changes detected, setting up observer...')
      if (applyFilterBtn.value) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              console.log('Intersection observed:', entry.isIntersecting)
              isApplyButtonVisible.value = entry.isIntersecting
            })
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          }
        )
        
        observer.observe(applyFilterBtn.value)
        console.log('Observer attached to button')
        
        // 清理函数 - 当筛选条件应用后清理
        watch(hasFilterChanges, (hasChanges) => {
          if (!hasChanges) {
            observer.disconnect()
            console.log('Observer disconnected')
          }
        })
      } else {
        console.log('Button element not found')
      }
    })
  } else {
    // 当没有筛选变化时，重置可见性状态
    isApplyButtonVisible.value = true
  }
})

// 监听路由变化
// watch(() => route.params.type, (newType) => {
//   if (newType !== type) {
//     // 路由类型改变时重置数据
//     data.value = null
//     currentPage.value = 1
//     resetFilters()
//     // 重置初始筛选状态
//     initialFilters.value = {
//       sort_by: 'popularity.desc',
//       with_genres: [],
//       'vote_average.gte': 0,
//       year: null,
//       'air_date.gte': null,
//       with_original_language: ''
//     }
//     fetchData()
//   }
// })
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 