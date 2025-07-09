import { ref, onMounted, onBeforeUnmount, nextTick, type Ref, watch } from 'vue'
// import { debounce } from '~/utils/common'

/**
 * 无限滚动配置选项接口
 */
export interface InfiniteScrollOptions {
  /** 每页加载数量，默认 20 */
  pageSize?: number
  /** 提前加载距离（px）或动态计算函数，默认 '100px' */
  rootMargin?: string | (() => string)
  /** 触发阈值，支持单个数值或数组，默认 0.1 */
  threshold?: number | number[]
  /** 是否启用无限滚动，默认 true */
  enabled?: boolean
  /** 加载延迟（ms），默认 300 */
  loadDelay?: number
  /** 自定义根元素选择器，用于容器内滚动 */
  root?: string | Element | null
  /** 防抖延迟（ms），默认 100，用于防止快速滚动时重复触发 */
  debounceDelay?: number
  /** 是否启用滚动事件监听作为备用方案，默认 true */
  enableScrollListener?: boolean
  /** 滚动触发阈值（距离底部多少像素时触发），默认 200 */
  scrollThreshold?: number
}

/**
 * 无限滚动返回值接口
 */
export interface InfiniteScrollReturn {
  /** 当前页码 */
  currentPage: Ref<number>
  /** 是否正在加载 */
  isLoading: Ref<boolean>
  /** 是否还有更多数据 */
  hasMore: Ref<boolean>
  /** 观察器目标元素，需要绑定到模板中的元素 */
  observerTarget: Ref<HTMLElement | null>
  /** 手动加载更多函数 */
  loadMore: () => Promise<void>
  /** 重置分页函数 */
  reset: () => void
  /** 手动设置是否有更多数据 */
  setHasMore: (value: boolean) => void
  /** 手动设置当前页码 */
  setCurrentPage: (page: number) => void
}

/**
 * 无限滚动组合式函数
 *
 * @param loadCallback 加载数据的回调函数，接收页码参数
 * @param totalItems 总数据量，支持数字或响应式引用
 * @param options 配置选项
 * @returns 无限滚动相关的状态和方法
 */
export function useInfiniteScroll(
  loadCallback: (page: number) => Promise<void> | void,
  totalItems: number | Ref<number>,
  options: InfiniteScrollOptions = {}
): InfiniteScrollReturn {
  // 解构配置选项，设置默认值
  const {
    pageSize = 20,
    rootMargin = '100px',
    threshold = 0.1,
    enabled = true,
    loadDelay = 300,
    root = null,
    debounceDelay = 100,
    enableScrollListener = true,
    scrollThreshold = 200,
  } = options

  // 响应式状态
  const currentPage = ref(1) // 当前页码
  const isLoading = ref(false) // 是否正在加载
  const hasMore = ref(true) // 是否还有更多数据
  const observerTarget = ref<HTMLElement | null>(null) // 观察器目标元素

  // 内部状态和实例
  let observer: IntersectionObserver | null = null // Intersection Observer 实例
  let scrollListener: (() => void) | null = null // 滚动事件监听器

  // 将 totalItems 转换为响应式引用，支持数字和响应式引用两种类型
  const totalItemsRef =
    typeof totalItems === 'number' ? ref(totalItems) : totalItems

  /**
   * 计算是否还有更多数据
   * 根据当前页码、每页数量和总数据量来判断
   */
  const checkHasMore = () => {
    const loadedItems = currentPage.value * pageSize
    hasMore.value = loadedItems < totalItemsRef.value
  }

  /**
   * 加载更多数据
   * 核心加载逻辑，包含状态管理和错误处理
   */
  const loadMore = async () => {
    // 检查是否可以加载：未在加载中、还有更多数据、功能已启用
    if (isLoading.value || !hasMore.value || !enabled) return

    isLoading.value = true

    try {
      // 添加加载延迟，让用户看到加载状态
      if (loadDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, loadDelay))
      }

      // 调用加载回调函数
      await loadCallback(currentPage.value + 1)

      // 更新页码并检查是否还有更多数据
      currentPage.value++
      checkHasMore()
    } catch (error) {
      console.error('Infinite scroll load error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 创建防抖的加载函数
  const debouncedLoadMore = common.debounce(() => {
    if (hasMore.value && !isLoading.value && enabled) {
      loadMore()
    }
  }, debounceDelay)

  /**
   * 重置分页
   * 将页码重置为1，重新计算是否有更多数据
   */
  const reset = () => {
    currentPage.value = 1
    hasMore.value = true
    checkHasMore()
  }

  /**
   * 手动设置是否有更多数据
   * @param value 是否有更多数据
   */
  const setHasMore = (value: boolean) => {
    hasMore.value = value
  }

  /**
   * 手动设置当前页码
   * @param page 页码
   */
  const setCurrentPage = (page: number) => {
    currentPage.value = page
    checkHasMore()
  }

  /**
   * 动态调整 rootMargin 的辅助函数
   * 支持函数形式的动态计算
   */
  const getDynamicRootMargin = () => {
    if (typeof rootMargin === 'function') {
      return rootMargin()
    }
    return rootMargin
  }

  /**
   * 监听 totalItems 变化的回调函数
   * 当总数据量变化时重新计算是否有更多数据
   */
  const watchTotalItems = () => {
    checkHasMore()
  }

  /**
   * 设置滚动事件监听器（备用方案）
   * 当 Intersection Observer 失效时作为备用触发机制
   */
  const setupScrollListener = () => {
    if (!enableScrollListener) return

    // 滚动事件处理函数
    scrollListener = () => {
      if (!hasMore.value || isLoading.value || !enabled) return

      // 确定滚动容器（支持自定义容器或默认使用 window）
      const scrollElement = root
        ? typeof root === 'string'
          ? document.querySelector(root)
          : root
        : window

      if (!scrollElement) return

      // 计算滚动位置
      const isWindow = scrollElement === window
      const scrollTop = isWindow
        ? window.pageYOffset
        : (scrollElement as Element).scrollTop
      const scrollHeight = isWindow
        ? document.documentElement.scrollHeight
        : (scrollElement as Element).scrollHeight
      const clientHeight = isWindow
        ? window.innerHeight
        : (scrollElement as Element).clientHeight

      // 检查是否接近底部，触发加载
      if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
        debouncedLoadMore()
      }
    }

    // 添加滚动事件监听器
    const scrollElement = root
      ? typeof root === 'string'
        ? document.querySelector(root)
        : window
      : window

    if (scrollElement) {
      // 使用 passive: true 提高性能
      scrollElement.addEventListener('scroll', scrollListener, {
        passive: true,
      })
    }
  }

  /**
   * 清理滚动监听器
   * 组件卸载时调用，防止内存泄漏
   */
  const cleanupScrollListener = () => {
    if (scrollListener) {
      const scrollElement = root
        ? typeof root === 'string'
          ? document.querySelector(root)
          : window
        : window

      if (scrollElement) {
        scrollElement.removeEventListener('scroll', scrollListener)
      }
      scrollListener = null
    }
  }

  /**
   * 设置无限滚动观察器
   * 主要的触发机制，使用 Intersection Observer API
   */
  const setupObserver = () => {
    if (!observerTarget.value || !enabled) return

    // 清理之前的观察器
    if (observer) {
      observer.disconnect()
    }

    // 创建新的 Intersection Observer
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // 当目标元素可见且有更多数据且未在加载时，触发加载
          if (entry.isIntersecting && hasMore.value && !isLoading.value) {
            debouncedLoadMore()
          }
        })
      },
      {
        root: root
          ? typeof root === 'string'
            ? document.querySelector(root)
            : root
          : null,
        rootMargin: getDynamicRootMargin(),
        threshold: Array.isArray(threshold) ? threshold : [threshold], // 支持多个阈值
      }
    )

    // 开始观察目标元素
    observer.observe(observerTarget.value)
  }

  // 监听 totalItems 变化
  watch(totalItemsRef, watchTotalItems)

  // 组件挂载时设置观察器和滚动监听器
  onMounted(() => {
    nextTick(() => {
      setupObserver()
      setupScrollListener()
      checkHasMore()
    })
  })

  // 组件卸载时清理所有资源
  onBeforeUnmount(() => {
    // 清理 Intersection Observer
    if (observer) {
      observer.disconnect()
      observer = null
    }

    // 清理滚动监听器
    cleanupScrollListener()
  })

  // 返回无限滚动相关的状态和方法
  return {
    currentPage,
    isLoading,
    hasMore,
    observerTarget,
    loadMore,
    reset,
    setHasMore,
    setCurrentPage,
  }
}
