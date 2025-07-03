import { ref, onMounted, onBeforeUnmount, nextTick, type Ref, watch } from 'vue'

export interface InfiniteScrollOptions {
  // 每页加载数量
  pageSize?: number
  // 提前加载距离（px）或动态计算函数
  rootMargin?: string | (() => string)
  // 触发阈值
  threshold?: number
  // 是否启用
  enabled?: boolean
  // 加载延迟（ms）
  loadDelay?: number
  // 自定义根元素选择器
  root?: string | Element | null
}

export interface InfiniteScrollReturn {
  // 当前页码
  currentPage: Ref<number>
  // 是否正在加载
  isLoading: Ref<boolean>
  // 是否还有更多数据
  hasMore: Ref<boolean>
  // 观察器目标元素
  observerTarget: Ref<HTMLElement | null>
  // 加载更多函数
  loadMore: () => Promise<void>
  // 重置分页
  reset: () => void
  // 手动设置是否有更多数据
  setHasMore: (value: boolean) => void
  // 手动设置当前页码
  setCurrentPage: (page: number) => void
}

export function useInfiniteScroll(
  loadCallback: (page: number) => Promise<void> | void,
  totalItems: number | Ref<number>,
  options: InfiniteScrollOptions = {}
): InfiniteScrollReturn {
  const {
    pageSize = 20,
    rootMargin = '100px',
    threshold = 0.1,
    enabled = true,
    loadDelay = 300,
    root = null
  } = options

  const currentPage = ref(1)
  const isLoading = ref(false)
  const hasMore = ref(true)
  const observerTarget = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  // 将 totalItems 转换为响应式引用
  const totalItemsRef = typeof totalItems === 'number' ? ref(totalItems) : totalItems

  // 计算是否还有更多数据
  const checkHasMore = () => {
    const loadedItems = currentPage.value * pageSize
    hasMore.value = loadedItems < totalItemsRef.value
  }

  // 加载更多数据
  const loadMore = async () => {
    if (isLoading.value || !hasMore.value || !enabled) return

    isLoading.value = true

    try {
      // 添加加载延迟
      if (loadDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, loadDelay))
      }

      // 调用加载回调
      await loadCallback(currentPage.value + 1)
      
      currentPage.value++
      checkHasMore()
    } catch (error) {
      console.error('Infinite scroll load error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 重置分页
  const reset = () => {
    currentPage.value = 1
    hasMore.value = true
    checkHasMore()
  }

  // 手动设置是否有更多数据
  const setHasMore = (value: boolean) => {
    hasMore.value = value
  }

  // 手动设置当前页码
  const setCurrentPage = (page: number) => {
    currentPage.value = page
    checkHasMore()
  }

  // 动态调整 rootMargin 的辅助函数
  const getDynamicRootMargin = () => {
    if (typeof rootMargin === 'function') {
      return rootMargin()
    }
    return rootMargin
  }

  // 监听 totalItems 变化
  const watchTotalItems = () => {
    checkHasMore()
  }

  // 设置无限滚动观察器
  const setupObserver = () => {
    if (!observerTarget.value || !enabled) return

    // 清理之前的观察器
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore.value && !isLoading.value) {
            loadMore()
          }
        })
      },
      {
        root: root ? (typeof root === 'string' ? document.querySelector(root) : root) : null,
        rootMargin: getDynamicRootMargin(), // 使用动态 rootMargin
        threshold
      }
    )

    observer.observe(observerTarget.value)
  }

  // 监听 totalItems 变化
  watch(totalItemsRef, watchTotalItems)

  // 组件挂载时设置观察器
  onMounted(() => {
    nextTick(() => {
      setupObserver()
      checkHasMore()
    })
  })

  // 组件卸载时清理观察器
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    currentPage,
    isLoading,
    hasMore,
    observerTarget,
    loadMore,
    reset,
    setHasMore,
    setCurrentPage
  }
} 