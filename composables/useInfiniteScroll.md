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
  totalItems, // 总数据量
  {
    pageSize: 20,
    rootMargin: '100px'
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

#### totalItems: number
总数据量，用于计算是否还有更多数据。

#### options: InfiniteScrollOptions
配置选项：

```typescript
interface InfiniteScrollOptions {
  pageSize?: number        // 每页加载数量，默认 20
  rootMargin?: string      // 提前加载距离，默认 '100px'
  threshold?: number       // 触发阈值，默认 0.1
  enabled?: boolean        // 是否启用，默认 true
  loadDelay?: number       // 加载延迟（ms），默认 300
  root?: string | Element | null // 自定义根元素
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

### 1. 自定义配置

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

### 2. 动态启用/禁用

```javascript
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  loadData,
  totalCount,
  {
    enabled: computed(() => !isSearching.value) // 搜索时禁用
  }
)
```

### 3. 手动控制

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

### 4. 在容器内滚动

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

### 1. 图片画廊
```javascript
// 在 gallery.vue 中的使用
const { observerTarget, hasMore, isLoading } = useInfiniteScroll(
  async (page) => {
    await loadMoreImages(page)
    // 重新初始化 PhotoSwipe
    initPhotoSwipe()
  },
  computed(() => images.value?.length || 0)
)
```

### 2. 商品列表
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

### 3. 评论列表
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

## 性能优化建议

1. **使用虚拟滚动**：对于大量数据，考虑结合虚拟滚动
2. **图片懒加载**：配合图片懒加载使用
3. **防抖处理**：避免频繁触发加载
4. **缓存数据**：缓存已加载的数据
5. **预加载**：根据用户行为预加载数据 