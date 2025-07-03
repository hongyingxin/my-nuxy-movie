# useInfiniteScroll 组合式函数

一个可复用的无限滚动组合式函数，支持自动加载、状态管理和性能优化。

## 基本用法

```vue
<template>
  <div>
    <!-- 内容列表 -->
    <div v-for="item in currentItems" :key="item.id">
      {{ item.name }}
    </div>
    
    <!-- 无限滚动指示器 -->
    <div v-if="hasMore" ref="observerTarget" class="text-center py-4">
      <div v-if="isLoading">加载中...</div>
      <div v-else>滚动加载更多</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 使用无限滚动
const {
  currentPage,
  isLoading,
  hasMore,
  observerTarget,
  loadMore,
  reset
} = useInfiniteScroll(
  async (page) => {
    // 加载数据的逻辑
    await fetchData(page)
  },
  totalItems, // 总数据量（支持数字或响应式引用）
  {
    pageSize: 20,
    rootMargin: '100px' // 或使用函数动态计算
  }
)

// 计算当前显示的数据
const currentItems = computed(() => {
  return allItems.value.slice(0, currentPage.value * 20)
})
</script>
```

## API 参数

### useInfiniteScroll(loadCallback, totalItems, options)

#### loadCallback: (page: number) => Promise<void> | void
加载数据的回调函数，接收页码参数。

#### totalItems: number | Ref<number>
总数据量，用于计算是否还有更多数据。支持数字或响应式引用，当使用响应式引用时，会自动监听变化并重新计算。

#### options: InfiniteScrollOptions
配置选项：

```typescript
interface InfiniteScrollOptions {
  pageSize?: number                    // 每页加载数量，默认 20
  rootMargin?: string | (() => string) // 提前加载距离，默认 '100px'，支持函数动态计算
  threshold?: number | number[]        // 触发阈值，默认 0.1，支持数组设置多个阈值
  enabled?: boolean                    // 是否启用，默认 true
  loadDelay?: number                   // 加载延迟（ms），默认 300
  root?: string | Element | null       // 自定义根元素
  debounceDelay?: number               // 防抖延迟（ms），默认 100，用于防止快速滚动时重复触发
  enableScrollListener?: boolean       // 是否启用滚动事件监听作为备用方案，默认 true
  scrollThreshold?: number             // 滚动触发阈值（距离底部多少像素时触发），默认 200
}
```

## 返回值

```typescript
interface InfiniteScrollReturn {
  currentPage: Ref<number>           // 当前页码
  isLoading: Ref<boolean>           // 是否正在加载
  hasMore: Ref<boolean>             // 是否还有更多数据
  observerTarget: Ref<HTMLElement | null> // 观察器目标元素
  loadMore: () => Promise<void>     // 手动加载更多
  reset: () => void                 // 重置分页
  setHasMore: (value: boolean) => void // 设置是否有更多数据
  setCurrentPage: (page: number) => void // 设置当前页码
}
```

## 高级用法

### 1. 快速滚动优化

为了解决快速滚动时的响应问题，组合式函数提供了多重保障机制：

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    debounceDelay: 50,           // 50ms 防抖延迟，快速响应
    enableScrollListener: true,  // 启用滚动监听作为备用
    scrollThreshold: 150,        // 距离底部 150px 时触发
    threshold: [0, 0.1, 0.3, 0.5, 1.0] // 多个阈值，提高触发灵敏度
  }
)
```

**优化机制说明：**

1. **防抖机制**：`debounceDelay` 防止快速滚动时重复触发加载
2. **多重阈值**：`threshold` 数组提供多个触发点，提高检测灵敏度
3. **滚动监听备用**：当 Intersection Observer 失效时，滚动事件监听器作为备用方案
4. **智能触发**：结合多种触发方式，确保在任何滚动速度下都能正常响应

### 双重触发机制详解

Intersection Observer 和滚动事件监听器是**互补关系**，不是互斥关系。它们协同工作来确保无限滚动的可靠性：

#### 🎯 **触发逻辑设计**

两个机制都使用相同的防抖函数，通过以下方式防止重复触发：

1. **防抖机制**：无论哪个机制触发，都会重置同一个 `debounceTimer`
2. **状态检查**：`isLoading.value` 确保加载过程中不会重复触发
3. **条件判断**：`hasMore.value && !isLoading.value && enabled` 多重条件保护

#### ⚡ **工作流程**

```
用户滚动
    ↓
Intersection Observer 检测到元素可见
    ↓
调用 debouncedLoadMore()
    ↓
重置 debounceTimer (如果存在)
    ↓
设置新的 debounceTimer
    ↓
50ms 后执行 loadMore()

同时...
用户继续滚动
    ↓
滚动事件监听器检测到接近底部
    ↓
调用 debouncedLoadMore()
    ↓
重置之前的 debounceTimer (取消之前的执行)
    ↓
设置新的 debounceTimer
    ↓
50ms 后执行 loadMore()
```

#### 🛡️ **实际场景分析**

**场景1：正常滚动**
- Intersection Observer 正常工作
- 滚动监听器也会触发，但被防抖机制"合并"
- 结果：只执行一次 `loadMore()`

**场景2：快速滚动**
- Intersection Observer 可能"错过"触发
- 滚动监听器作为备用方案触发
- 结果：确保不会遗漏加载

**场景3：Intersection Observer 失效**
- 某些浏览器或特定情况下 IO 可能不工作
- 滚动监听器确保功能正常
- 结果：功能依然可用

#### 🚀 **设计优势**

1. **可靠性**：双重保障，确保功能在各种情况下都能工作
2. **性能**：防抖机制避免重复执行
3. **兼容性**：适应不同的浏览器和设备
4. **用户体验**：快速滚动时也能正常响应

### 2. 动态 rootMargin

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    rootMargin: () => {
      // 根据设备类型和网络状况动态调整
      const isMobile = window.innerWidth <= 768
      const connection = navigator.connection
      const isSlowNetwork = connection && connection.effectiveType === '2g'
      
      if (isMobile) {
        return isSlowNetwork ? '100px' : '50px'
      } else {
        return isSlowNetwork ? '200px' : '100px'
      }
    }
  }
)
```

### 3. 响应式 totalItems

```javascript
const totalItems = ref(0)

const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalItems, // 传入响应式引用
  { pageSize: 20 }
)

// 当 totalItems 变化时，会自动重新计算 hasMore
watch(searchResults, (results) => {
  totalItems.value = results.total
})
```

### 4. 自定义配置

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    pageSize: 10,           // 每页 10 条
    rootMargin: '200px',    // 提前 200px 加载
    threshold: 0.5,         // 50% 可见时触发
    loadDelay: 500,         // 500ms 延迟
    enabled: true           // 启用无限滚动
  }
)
```

### 5. 动态启用/禁用

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    enabled: computed(() => !isSearching.value) // 搜索时禁用
  }
)
```

### 6. 手动控制

```javascript
const { loadMore, reset, setHasMore, setCurrentPage } = useInfiniteScroll(
  loadData,
  totalCount
)

// 手动加载更多
await loadMore()

// 重置分页
reset()

// 手动设置状态
setHasMore(false)
setCurrentPage(5)
```

### 7. 在容器内滚动

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    root: '.scroll-container' // 在指定容器内滚动
  }
)
```

## 实际应用场景

### 1. 图片画廊（快速滚动优化）
```javascript
// 在 gallery.vue 中的使用
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  async (page) => {
    await loadMoreImages(page)
    // 重新初始化 PhotoSwipe
    initPhotoSwipe()
  },
  computed(() => images.value?.length || 0),
  {
    pageSize: 20,
    rootMargin: () => {
      // 根据设备类型动态调整
      const isMobile = window.innerWidth <= 768
      return isMobile ? '50px' : '100px'
    },
    debounceDelay: 50,           // 快速响应防抖
    enableScrollListener: true,  // 启用滚动监听备用
    scrollThreshold: 150,        // 距离底部 150px 触发
    threshold: [0, 0.1, 0.3, 0.5, 1.0] // 多重阈值提高灵敏度
  }
)
```

### 2. 搜索结果（响应式 totalItems）
```javascript
const searchResults = ref([])
const totalResults = ref(0)

const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  async (page) => {
    const results = await searchAPI(query.value, page)
    searchResults.value.push(...results.items)
  },
  totalResults, // 响应式引用
  { pageSize: 15 }
)

// 搜索时更新总数
watch(searchQuery, async (query) => {
  const results = await searchAPI(query, 1)
  totalResults.value = results.total
  searchResults.value = results.items
})
```

### 3. 商品列表
```javascript
// 在商品列表中的使用
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  async (page) => {
    const newProducts = await fetchProducts(page)
    products.value.push(...newProducts)
  },
  totalProducts
)
```

### 4. 评论列表
```javascript
// 在评论列表中的使用
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  async (page) => {
    const newComments = await fetchComments(page)
    comments.value.push(...newComments)
  },
  totalComments,
  {
    pageSize: 15,        // 评论每页 15 条
    rootMargin: '50px'   // 评论提前加载距离较小
  }
)
```

## 注意事项

1. **必须绑定 observerTarget**：将 `observerTarget` 绑定到模板中的元素
2. **正确计算 totalItems**：确保传入的总数准确
3. **处理加载错误**：在 `loadCallback` 中处理可能的错误
4. **清理资源**：组件卸载时会自动清理观察器
5. **性能优化**：避免在 `loadCallback` 中执行过重的操作
6. **动态 rootMargin**：函数会在每次观察器创建时调用，注意性能
7. **响应式 totalItems**：当使用响应式引用时，变化会自动触发重新计算
8. **快速滚动优化**：使用 `debounceDelay` 和 `enableScrollListener` 来改善快速滚动时的响应性
9. **多重阈值设置**：使用数组形式的 `threshold` 可以提高触发灵敏度
10. **滚动监听性能**：滚动监听器使用 `passive: true` 选项，确保性能不受影响

## 性能优化建议

1. **使用虚拟滚动**：对于大量数据，考虑结合虚拟滚动
2. **图片懒加载**：配合图片懒加载使用
3. **防抖处理**：避免频繁触发加载
4. **缓存数据**：缓存已加载的数据
5. **预加载**：根据用户行为预加载数据
6. **动态 rootMargin**：根据设备性能和网络状况调整

## 代码质量与维护性

### 📝 **详细注释**

组合式函数包含完整的 JSDoc 注释，包括：

- **接口定义**：每个配置选项都有详细说明
- **函数文档**：所有方法都有参数和返回值说明
- **关键逻辑**：重要算法和状态管理逻辑都有注释
- **变量说明**：所有响应式状态和内部变量都有注释

### 🔧 **代码结构**

- **模块化设计**：功能分离，便于维护和测试
- **类型安全**：完整的 TypeScript 类型定义
- **错误处理**：包含异常捕获和错误日志
- **资源清理**：自动清理所有监听器和定时器

### 🚀 **最佳实践**

- **响应式设计**：充分利用 Vue 3 的响应式系统
- **性能优化**：使用 `passive: true` 和防抖机制
- **兼容性**：支持多种浏览器和设备
- **可扩展性**：易于添加新功能和配置选项 