<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 搜索头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- 搜索输入框 -->
        <div class="max-w-2xl mx-auto relative">
          <SearchBox
            v-model="searchQuery"
            :placeholder="$t('search.placeholder')"
            :show-search-button="true"
            :input-class="'w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg'"
            @search="handleSearch"
            @suggestion-select="handleSuggestionSelect"
            @view-all-results="handleViewAllResults"
          />
        </div>

        <!-- 过滤器 -->
        <div class="mt-6 max-w-4xl mx-auto">
          <div class="flex flex-wrap items-center gap-4 text-sm">
            <!-- 媒体类型过滤器 -->
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">{{ $t('search.type') }}</span>
              <div class="flex space-x-1">
                <button
                  v-for="type in mediaTypes"
                  :key="type.value"
                  class="px-3 py-1 rounded-full border transition-colors"
                  :class="
                    selectedMediaTypes.includes(type.value)
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-red-300'
                  "
                  @click="toggleMediaType(type.value)"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>

            <!-- 年份过滤器 -->
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">{{ $t('search.year') }}</span>
              <select
                v-model="selectedYear"
                class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">{{ $t('search.allYears') }}</option>
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <!-- 包含成人内容 -->
            <div class="flex items-center space-x-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="includeAdult"
                  type="checkbox"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span class="text-gray-600">{{
                  $t('search.includeAdult')
                }}</span>
              </label>
            </div>

            <!-- 清除过滤器 -->
            <button
              class="px-3 py-1 text-gray-500 hover:text-gray-700 underline"
              @click="clearFilters"
            >
              {{ $t('search.clearFilters') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"
        />
        <p class="mt-2 text-gray-600">{{ $t('search.searching') }}</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg
            class="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          @click="handleSearch"
        >
          {{ $t('common.retry') }}
        </button>
      </div>

      <!-- 搜索结果 -->
      <div v-else-if="hasSearched">
        <!-- 搜索结果统计 -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ $t('search.results') }}: "{{ searchQuery }}"
          </h2>
          <p class="text-gray-600">
            {{ $t('search.foundResults', { count: totalResults }) }}
            <span v-if="totalPages > 1">{{
              $t('search.totalPages', { pages: totalPages })
            }}</span>
          </p>
        </div>

        <!-- 无结果 -->
        <div v-if="!hasResults" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg
              class="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p class="text-gray-600 mb-4">{{ $t('search.noResults') }}</p>
          <p class="text-sm text-gray-500">{{ $t('search.tryDifferent') }}</p>
        </div>

        <!-- 搜索结果列表 -->
        <div v-else>
          <!-- 视图切换 -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center space-x-2">
              <button
                class="p-2 rounded-md transition-colors"
                :class="
                  viewMode === 'grid'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-400 hover:text-gray-600'
                "
                @click="viewMode = 'grid'"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                class="p-2 rounded-md transition-colors"
                :class="
                  viewMode === 'list'
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-400 hover:text-gray-600'
                "
                @click="viewMode = 'list'"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- 网格视图 -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <!-- 电影和电视剧 -->
            <MediaCard
              v-for="item in mediaResults"
              :key="`${item.media_type}-${item.id}`"
              :item="item"
              :is-movie="item.media_type === 'movie'"
              :status="item.media_type"
            />
            <!-- 演员 -->
            <MediaPersonCard
              v-for="item in personResults"
              :key="`${item.media_type}-${item.id}`"
              :person="item"
            />
          </div>

          <!-- 列表视图 -->
          <div v-else class="space-y-4">
            <!-- 电影和电视剧 -->
            <MediaListItem
              v-for="item in mediaResults"
              :key="`${item.media_type}-${item.id}`"
              :item="item"
              :is-movie="item.media_type === 'movie'"
            />
            <!-- 演员 -->
            <MediaPersonListItem
              v-for="item in personResults"
              :key="`${item.media_type}-${item.id}`"
              :person="item"
            />
          </div>

          <!-- 分页 -->
          <div class="mt-8">
            <CommonPagination
              :current-page="currentPage"
              :total-pages="totalPages"
              :total-results="totalResults"
              :scroll-to-top="true"
              @page-change="handlePageChange"
            />
          </div>
        </div>
      </div>

      <!-- 初始状态 -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg
            class="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ $t('search.startSearch') }}
        </h3>
        <p class="text-gray-600">{{ $t('search.enterKeywords') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  // ==================== 页面元信息 ====================
  // ==================== API 导入 ====================
  import { advancedMultiSearch } from '~/api/search'

  // 获取 i18n 实例
  const { t } = useI18n()

  definePageMeta({
    title: 'search.title',
    description: 'search.enterKeywords',
  })

  // ==================== 响应式数据 ====================
  const route = useRoute()
  const router = useRouter()

  // 搜索相关
  const searchQuery = ref('')
  const currentPage = ref(1)
  const viewMode = ref('grid') // 'grid' | 'list'

  // 过滤器
  const selectedMediaTypes = ref(['movie', 'tv', 'person'])
  const selectedYear = ref('')
  const includeAdult = ref(false)

  // 搜索结果
  const searchResults = ref([])
  const totalResults = ref(0)
  const totalPages = ref(0)
  const isLoading = ref(false)
  const error = ref(null)
  const hasSearched = ref(false)

  // ==================== 常量定义 ====================
  const mediaTypes = [
    { value: 'movie', label: t('media.movies') },
    { value: 'tv', label: t('media.tvShows') },
    { value: 'person', label: t('media.actors') },
  ]

  const years = computed(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 30 }, (_, i) => currentYear - i)
  })

  // ==================== 计算属性 ====================
  const hasResults = computed(() => {
    return searchResults.value.length > 0
  })

  // 分离不同类型的搜索结果
  const mediaResults = computed(() => {
    return searchResults.value.filter(
      item => item.media_type === 'movie' || item.media_type === 'tv'
    )
  })

  const personResults = computed(() => {
    return searchResults.value.filter(item => item.media_type === 'person')
  })

  // ==================== 方法 ====================
  /**
   * 处理搜索
   */
  const handleSearch = async () => {
    if (!searchQuery.value.trim()) return

    isLoading.value = true
    error.value = null
    hasSearched.value = true
    currentPage.value = 1

    try {
      await performSearch()
    } catch (err) {
      error.value = t('search.searchFailed')
      console.error('Search error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 执行搜索
   */
  const performSearch = async () => {
    const query = searchQuery.value.trim()
    if (!query) return

    // 更新 URL 参数
    const queryParams = {
      q: query,
      page: currentPage.value,
      types: selectedMediaTypes.value.join(','),
      year: selectedYear.value,
      adult: includeAdult.value,
    }

    await router.push({
      path: '/search',
      query: queryParams,
    })

    try {
      // 使用高级多类型搜索
      const result = await advancedMultiSearch(
        query,
        currentPage.value,
        selectedMediaTypes.value,
        {
          year: selectedYear.value,
          first_air_date_year: selectedYear.value,
          include_adult: includeAdult.value,
        }
      )

      // 处理搜索结果
      if (Array.isArray(result)) {
        // 多个搜索结果（分别搜索）
        const allResults = []
        let total = 0

        result.forEach((searchResult, index) => {
          if (searchResult.data.value) {
            const type = selectedMediaTypes.value[index]
            const items = searchResult.data.value.results.map(item => ({
              ...item,
              media_type: type,
            }))
            allResults.push(...items)
            total += searchResult.data.value.total_results
          }
        })

        // 按相关性排序
        searchResults.value = allResults.sort(
          (a, b) => b.popularity - a.popularity
        )
        totalResults.value = total
        totalPages.value = Math.max(
          ...result.map(r => r.data.value?.total_pages || 0)
        )
      } else {
        // 单个搜索结果（multi search）
        if (result.data.value) {
          // 过滤选中的媒体类型
          const filteredResults = result.data.value.results.filter(item =>
            selectedMediaTypes.value.includes(item.media_type)
          )

          searchResults.value = filteredResults
          totalResults.value = result.data.value.total_results
          totalPages.value = result.data.value.total_pages
        }
      }
    } catch (error) {
      console.error('Search error:', error)
      throw error
    }
  }

  /**
   * 切换媒体类型
   */
  const toggleMediaType = type => {
    const index = selectedMediaTypes.value.indexOf(type)
    if (index > -1) {
      selectedMediaTypes.value.splice(index, 1)
    } else {
      selectedMediaTypes.value.push(type)
    }
  }

  /**
   * 清除过滤器
   */
  const clearFilters = () => {
    selectedMediaTypes.value = ['movie', 'tv', 'person']
    selectedYear.value = ''
    includeAdult.value = false
  }

  /**
   * 处理页码变化
   */
  const handlePageChange = async page => {
    currentPage.value = page
    await performSearch()
  }

  /**
   * 处理搜索建议选择
   */
  const handleSuggestionSelect = suggestion => {
    searchQuery.value = suggestion.title || suggestion.name
    handleSearch()
  }

  /**
   * 处理查看所有结果
   */
  const handleViewAllResults = () => {
    handleSearch()
  }

  // ==================== 生命周期 ====================
  onMounted(() => {
    // 从 URL 参数恢复搜索状态
    const { q, page, types, year, adult } = route.query

    if (q) {
      searchQuery.value = q
      currentPage.value = parseInt(page) || 1
      selectedMediaTypes.value = types
        ? types.split(',')
        : ['movie', 'tv', 'person']
      selectedYear.value = year || ''
      includeAdult.value = adult === 'true'

      // 自动执行搜索
      nextTick(() => {
        handleSearch()
      })
    } else {
      // 如果没有 URL 参数，重置搜索状态
      hasSearched.value = false
      searchResults.value = []
      totalResults.value = 0
      totalPages.value = 0
    }
  })

  // 监听路由变化
  watch(
    () => route.query,
    newQuery => {
      if (newQuery.q && hasSearched.value) {
        searchQuery.value = newQuery.q
        currentPage.value = parseInt(newQuery.page) || 1
        selectedMediaTypes.value = newQuery.types
          ? newQuery.types.split(',')
          : ['movie', 'tv', 'person']
        selectedYear.value = newQuery.year || ''
        includeAdult.value = newQuery.adult === 'true'

        performSearch()
      }
    },
    { deep: true }
  )
</script>
