<template>
  <div v-if="totalPages > 1" class="flex flex-col items-center space-y-4">
    <!-- 分页信息 -->
    <div class="text-sm text-gray-600 dark:text-gray-400 text-center px-4">
      <slot
        name="summary"
        :current="currentPage"
        :total="totalPages"
        :total-results="totalResults"
      >
        <span class="hidden sm:inline"
          >第 {{ currentPage }} 页，共 {{ totalPages }} 页</span
        >
        <span class="sm:hidden">{{ currentPage }} / {{ totalPages }}</span>
        <span v-if="totalResults" class="ml-2 hidden md:inline"
          >(共 {{ totalResults }} 条结果)</span
        >
      </slot>
    </div>

    <!-- 分页控件 -->
    <div class="flex items-center space-x-1 sm:space-x-2">
      <!-- 首页按钮 -->
      <button
        v-if="showFirstLast && !isMobile"
        :disabled="currentPage <= 1"
        class="px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
        :title="'跳转到首页'"
        @click="handlePageChange(1)"
      >
        <slot name="first-text">首页</slot>
      </button>

      <!-- 上一页按钮 -->
      <button
        :disabled="currentPage <= 1"
        class="px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base text-gray-700 dark:text-gray-300"
        @click="handlePageChange(currentPage - 1)"
      >
        <slot name="prev-text">
          <span class="hidden sm:inline">上一页</span>
          <span class="sm:hidden">‹</span>
        </slot>
      </button>

      <!-- 页码显示 -->
      <div class="flex items-center space-x-1">
        <!-- 省略号 -->
        <span
          v-if="showStartEllipsis"
          class="px-1 sm:px-2 text-gray-400 dark:text-gray-500 text-sm"
          >...</span
        >

        <!-- 页码按钮 -->
        <button
          v-for="page in visiblePages"
          :key="page"
          class="px-2 sm:px-3 py-2 border rounded-md text-sm font-medium transition-colors min-w-[32px] sm:min-w-[40px]"
          :class="
            page === currentPage
              ? 'bg-red-600 text-white border-red-600'
              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
          "
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>

        <!-- 省略号 -->
        <span
          v-if="showEndEllipsis"
          class="px-1 sm:px-2 text-gray-400 dark:text-gray-500 text-sm"
          >...</span
        >
      </div>

      <!-- 下一页按钮 -->
      <button
        :disabled="currentPage >= totalPages"
        class="px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base text-gray-700 dark:text-gray-300"
        @click="handlePageChange(currentPage + 1)"
      >
        <slot name="next-text">
          <span class="hidden sm:inline">下一页</span>
          <span class="sm:hidden">›</span>
        </slot>
      </button>

      <!-- 末页按钮 -->
      <button
        v-if="showFirstLast && !isMobile"
        :disabled="currentPage >= totalPages"
        class="px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
        :title="'跳转到末页'"
        @click="handlePageChange(totalPages)"
      >
        <slot name="last-text">末页</slot>
      </button>
    </div>

    <!-- 快速跳转 -->
    <div
      v-if="showQuickJump"
      class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-sm"
    >
      <span class="text-gray-600 dark:text-gray-400">跳转到</span>
      <div class="flex items-center space-x-2">
        <input
          v-model.number="jumpPage"
          type="number"
          min="1"
          :max="totalPages"
          class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          @keyup.enter="handleQuickJump"
          @blur="handleQuickJump"
        />
        <span class="text-gray-600 dark:text-gray-400">页</span>
        <button
          class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          @click="handleQuickJump"
        >
          跳转
        </button>
      </div>
    </div>

    <!-- 每页条数选择 -->
    <div
      v-if="showPageSize && pageSizeOptions.length > 0"
      class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-sm"
    >
      <span class="text-gray-600 dark:text-gray-400">每页显示</span>
      <select
        :value="pageSize"
        class="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        @change="handlePageSizeChange"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ option }} 条
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
  /**
   * 分页组件 Props
   */
  const props = defineProps({
    /** 当前页码 */
    currentPage: {
      type: Number,
      required: true,
    },
    /** 总页数 */
    totalPages: {
      type: Number,
      required: true,
    },
    /** 总结果数，用于显示统计信息 */
    totalResults: {
      type: Number,
      default: 0,
    },
    /** 是否在页面切换时自动滚动到顶部 */
    scrollToTop: {
      type: Boolean,
      default: true,
    },
    /** 是否显示首页和末页按钮 */
    showFirstLast: {
      type: Boolean,
      default: false,
    },
    /** 是否显示快速跳转输入框 */
    showQuickJump: {
      type: Boolean,
      default: false,
    },
    /** 是否显示每页条数选择器 */
    showPageSize: {
      type: Boolean,
      default: false,
    },
    /** 当前每页显示的条数 */
    pageSize: {
      type: Number,
      default: 20,
    },
    /** 每页条数的可选选项数组 */
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    /** 最大显示的页码数量（移动端会自动减少） */
    maxVisiblePages: {
      type: Number,
      default: 7,
    },
  })

  /**
   * 分页组件事件
   */
  const emit = defineEmits([
    /** 页码变化事件
     * @param {number} page - 新的页码
     */
    'page-change',
    /** 每页条数变化事件
     * @param {number} pageSize - 新的每页条数
     */
    'page-size-change',
  ])

  // 响应式数据
  /** 快速跳转输入的页码 */
  const jumpPage = ref(props.currentPage)

  // 计算属性
  const { isMobile } = useScreenSize()

  /**
   * 计算当前应该显示的页码范围
   * @returns {number[]} 要显示的页码数组
   */
  const visiblePages = computed(() => {
    const pages = []
    // 移动端显示更少的页码
    const maxPages = isMobile.value
      ? Math.min(5, props.maxVisiblePages)
      : props.maxVisiblePages
    const halfVisible = Math.floor(maxPages / 2)

    let start = Math.max(1, props.currentPage - halfVisible)
    let end = Math.min(props.totalPages, props.currentPage + halfVisible)

    // 调整起始和结束位置，确保显示足够的页码
    if (end - start + 1 < maxPages) {
      if (start === 1) {
        end = Math.min(props.totalPages, start + maxPages - 1)
      } else {
        start = Math.max(1, end - maxPages + 1)
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  })

  /**
   * 是否显示起始省略号
   * @returns {boolean} 当第一个显示的页码大于1时显示省略号
   */
  const showStartEllipsis = computed(() => {
    return visiblePages.value[0] > 1
  })

  /**
   * 是否显示结束省略号
   * @returns {boolean} 当最后一个显示的页码小于总页数时显示省略号
   */
  const showEndEllipsis = computed(() => {
    return visiblePages.value[visiblePages.value.length - 1] < props.totalPages
  })

  // 监听当前页变化，更新跳转输入框
  watch(
    () => props.currentPage,
    newPage => {
      jumpPage.value = newPage
    }
  )

  /**
   * 处理页码变化
   * @param {number} page - 目标页码
   */
  const handlePageChange = page => {
    // 验证页码范围
    if (page < 1 || page > props.totalPages) return

    // 触发页码变化事件
    emit('page-change', page)

    // 滚动到页面顶部
    if (props.scrollToTop) {
      nextTick(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      })
    }
  }

  /**
   * 处理快速跳转
   * 验证输入的页码并执行跳转
   */
  const handleQuickJump = () => {
    const page = parseInt(jumpPage.value)

    // 验证页码有效性和范围
    if (
      page &&
      page >= 1 &&
      page <= props.totalPages &&
      page !== props.currentPage
    ) {
      handlePageChange(page)
    } else {
      // 重置为当前页
      jumpPage.value = props.currentPage
    }
  }

  /**
   * 处理每页条数变化
   * @param {Event} event - select 元素的 change 事件
   */
  const handlePageSizeChange = event => {
    const newPageSize = parseInt(event.target.value)

    // 只有当条数真正发生变化时才触发事件
    if (newPageSize !== props.pageSize) {
      emit('page-size-change', newPageSize)
    }
  }
</script>
