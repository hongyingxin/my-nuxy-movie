<template>
  <div class="relative">
    <!-- 搜索输入框 -->
    <div class="relative">
      <input
        v-model="localQuery"
        type="text"
        :placeholder="placeholder"
        :class="inputClass"
        @keyup.enter="handleSearch"
        @input="handleInputChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- 搜索图标 -->
      <div
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <svg
          class="w-4 h-4"
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
      <!-- 搜索按钮（仅在需要时显示） -->
      <button
        v-if="showSearchButton"
        :disabled="!localQuery.trim()"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        @click="handleSearch"
      >
        搜索
      </button>
    </div>

    <!-- 搜索建议 -->
    <SearchSuggestions
      v-if="showSuggestions"
      :show-suggestions="showSuggestions && searchSuggestions.length > 0"
      :suggestions="searchSuggestions"
      :total-results="suggestionsTotalResults"
      @select-suggestion="handleSuggestionSelect"
      @view-all-results="handleViewAllResults"
    />
  </div>
</template>

<script setup>
  // ==================== API 导入 ====================
  import { getSearchSuggestions } from '~/api/search'

  // ==================== Props 定义 ====================
  const props = defineProps({
    // 搜索关键词
    modelValue: {
      type: String,
      default: '',
    },
    // 输入框占位符
    placeholder: {
      type: String,
      default: '搜索电影、电视剧、演员...',
    },
    // 输入框样式类
    inputClass: {
      type: String,
      default:
        'w-full px-4 py-3 pl-10 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
    },
    // 是否显示搜索按钮
    showSearchButton: {
      type: Boolean,
      default: true,
    },
    // 是否显示搜索建议
    showSuggestions: {
      type: Boolean,
      default: true,
    },
    // 防抖延迟时间（毫秒）
    debounceDelay: {
      type: Number,
      default: 300,
    },
    // 建议数量
    suggestionLimit: {
      type: Number,
      default: 5,
    },
  })

  // ==================== Emits 定义 ====================
  const emit = defineEmits([
    'update:modelValue',
    'search',
    'suggestion-select',
    'view-all-results',
  ])

  // ==================== 响应式数据 ====================
  const localQuery = ref(props.modelValue)
  const searchSuggestions = ref([])
  const suggestionsTotalResults = ref(0)

  // ==================== 防抖搜索函数 ====================
  const debouncedSearch = common.debounce(async query => {
    try {
      const result = await getSearchSuggestions(query, props.suggestionLimit)
      if (result.data.value) {
        searchSuggestions.value = result.data.value.results.slice(
          0,
          props.suggestionLimit
        )
        suggestionsTotalResults.value = result.data.value.total_results
      }
    } catch (error) {
      console.error('Failed to fetch search suggestions:', error)
    }
  }, props.debounceDelay)

  // ==================== 方法 ====================
  /**
   * 处理输入变化
   */
  const handleInputChange = () => {
    // 同步到父组件
    emit('update:modelValue', localQuery.value)

    // 如果查询为空，清空建议
    if (!localQuery.value.trim()) {
      searchSuggestions.value = []
      suggestionsTotalResults.value = 0
      return
    }

    // 使用防抖函数获取搜索建议
    debouncedSearch(localQuery.value.trim())
  }

  /**
   * 处理焦点事件
   */
  const handleFocus = () => {
    // 可以在这里添加焦点处理逻辑
  }

  /**
   * 处理失焦事件
   */
  const handleBlur = () => {
    // 延迟隐藏建议，给用户时间点击建议项
    setTimeout(() => {
      searchSuggestions.value = []
      suggestionsTotalResults.value = 0
    }, 300)
  }

  /**
   * 处理搜索
   */
  const handleSearch = () => {
    const query = localQuery.value.trim()
    if (!query) return

    emit('search', query)

    // 清空建议
    searchSuggestions.value = []
    suggestionsTotalResults.value = 0
  }

  /**
   * 处理建议选择
   */
  const handleSuggestionSelect = suggestion => {
    localQuery.value = suggestion.title || suggestion.name
    emit('update:modelValue', localQuery.value)
    emit('suggestion-select', suggestion)

    // 清空建议
    searchSuggestions.value = []
    suggestionsTotalResults.value = 0
  }

  /**
   * 处理查看所有结果
   */
  const handleViewAllResults = () => {
    emit('view-all-results', localQuery.value.trim())

    // 清空建议
    searchSuggestions.value = []
    suggestionsTotalResults.value = 0
  }

  // ==================== 监听器 ====================
  // 监听 modelValue 变化
  watch(
    () => props.modelValue,
    newValue => {
      localQuery.value = newValue
    }
  )

  // 组件卸载时清理定时器
  onUnmounted(() => {
    // 防抖函数内部会自动管理定时器，无需手动清理
  })
</script>
