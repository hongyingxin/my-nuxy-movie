# 组件目录结构

本目录包含按功能和用途组织的所有 Vue 组件。

## 目录结构

```
components/
├── Layout/          # 布局组件 (头部、底部、导航)
├── ui/              # 可复用的 UI 组件 (按钮、评分、表单)
├── Media/           # 媒体相关组件 (卡片、播放器、画廊)
├── Search/          # 搜索相关组件 (搜索框、建议)
├── Skeleton/        # 骨架屏组件 (加载状态)
├── Common/          # 通用/共享组件
└── README.md        # 本文件
```

## 组件分类

### 📐 布局组件 (`Layout/`)
定义整体页面结构和布局的组件。

- **Header.vue** - 主导航头部，包含 logo、菜单和搜索
- **Footer.vue** - 网站底部，包含链接、社交媒体和版权信息

### 🎨 UI 组件 (`ui/`)
可在整个应用程序中使用的可复用用户界面组件。

- **MovieRating.vue** - 带百分比的圆形评分显示 (未来)
- **Button.vue** - 可复用按钮组件 (未来)
- **Modal.vue** - 模态框/对话框组件 (未来)
- **Loading.vue** - 加载旋转器组件 (未来)

### 🎬 媒体组件 (`Media/`)
专门与媒体内容相关的组件 (电影、电视剧等)。

- **Card.vue** - 电影/电视剧卡片，包含海报、标题和评分
- **ListItem.vue** - 媒体列表项，用于列表视图显示
- **Rating.vue** - 媒体评分组件
- **PageHeader.vue** - 媒体页面头部组件
- **Grid.vue** - 媒体卡片网格布局 (未来)
- **Player.vue** - 视频播放器组件 (未来)
- **Gallery.vue** - 图片画廊组件 (未来)

### 🔍 搜索组件 (`Search/`)
专门处理搜索功能的组件。

- **SearchBox.vue** - 统一搜索输入框组件，支持头部和搜索页面使用
- **SearchSuggestions.vue** - 搜索建议组件，显示实时搜索建议

### ⚡ 骨架屏组件 (`Skeleton/`)
用于显示加载状态的骨架屏组件。

- **Card.vue** - 基础骨架卡片组件
- **Grid.vue** - 网格布局骨架屏
- **List.vue** - 列表布局骨架屏（用于演员、评论等）
- **ListItem.vue** - 媒体列表项骨架屏（用于媒体列表视图）
- **LoadingState.vue** - 简单加载状态组件

### 🔧 通用组件 (`Common/`)
不属于其他类别的共享组件。

- **Pagination.vue** - 分页组件，支持多种功能和移动端适配
- **Icon.vue** - 图标组件 (未来)
- **Tooltip.vue** - 工具提示组件 (未来)
- **Breadcrumb.vue** - 面包屑导航组件 (未来)

## 命名约定

- **布局组件**: `Layout[组件名]` (例如: `LayoutHeader`)
- **UI 组件**: `Ui[组件名]` (例如: `UiMovieRating`)
- **媒体组件**: `Media[组件名]` (例如: `MediaCard`)
- **搜索组件**: `Search[组件名]` (例如: `SearchBox`)
- **骨架屏组件**: `Skeleton[组件名]` (例如: `SkeletonCard`)
- **通用组件**: `Common[组件名]` (例如: `CommonIcon`)

**Nuxt 3 自动导入规则:**
- 子目录中的组件会自动导入，目录名作为前缀
- `components/Layout/Header.vue` → `<LayoutHeader />`
- `components/ui/MovieRating.vue` → `<UiMovieRating />`
- `components/Media/Card.vue` → `<MediaCard />` (媒体目录无前缀)
- `components/Search/SearchBox.vue` → `<SearchBox />` (搜索目录无前缀)
- `components/Skeleton/Card.vue` → `<SkeletonCard />` (骨架屏目录无前缀)
- `components/Common/Icon.vue` → `<CommonIcon />`

## 组件设计模式

### 组件内循环 vs 外循环模式

在 Vue 组件设计中，有两种主要的循环模式：组件内循环和组件外循环。本项目统一采用**外循环模式**。

#### 外循环模式（推荐）

```vue
<!-- 使用方式 -->
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  <MediaCard
    v-for="item in items"
    :key="item.id"
    :item="item"
    :is-movie="true"
  />
</div>

<!-- 列表视图 -->
<div class="space-y-4">
  <MediaListItem
    v-for="item in items"
    :key="item.id"
    :item="item"
    :is-movie="true"
  />
</div>
```

#### 内循环模式（已废弃）

```vue
<!-- 旧的使用方式 -->
<MediaList :items="items" :is-movie="true" />

<!-- 组件内部 -->
<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="item.id">
      <!-- 列表项内容 -->
    </div>
  </div>
</template>
```

### 设计模式对比

| 维度 | 外循环模式 | 内循环模式 |
|------|-----------|-----------|
| **灵活性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **复用性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **性能** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **使用简单性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **维护性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **布局控制** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **推荐指数** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

### 外循环模式的优势

1. **布局灵活性**
   - 支持网格、瀑布流、横向滚动等多种布局
   - 父组件可以完全控制间距、对齐方式
   - 便于实现响应式设计

2. **性能优化**
   - 每个组件独立渲染，便于虚拟滚动
   - 更好的内存管理和垃圾回收
   - 支持懒加载和分页

3. **复用性强**
   - 单个组件可以在任何地方使用
   - 不依赖特定的容器结构
   - 便于单元测试

4. **调试友好**
   - 每个组件都有独立的 Vue DevTools 节点
   - 更容易定位和修复问题
   - 更好的错误追踪

5. **维护成本低**
   - 只需要维护单个组件逻辑
   - 布局逻辑在父组件中，更直观
   - 减少组件间的耦合

### 使用示例

#### 网格布局
```vue
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <MediaCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-movie="isMovie"
    />
  </div>
</template>
```

#### 列表布局
```vue
<template>
  <div class="space-y-4">
    <MediaListItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-movie="isMovie"
    />
  </div>
</template>
```

#### 横向滚动布局
```vue
<template>
  <div class="flex gap-4 overflow-x-auto pb-4">
    <MediaCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-movie="isMovie"
      class="flex-shrink-0 w-48"
    />
  </div>
</template>
```

## 使用示例

```vue
<!-- 布局组件 -->
<LayoutHeader />
<LayoutFooter />

<!-- UI 组件 -->
<UiMovieRating :score="8.5" />

<!-- 媒体组件 -->
<MediaCard :item="movie" :is-movie="true" />
<MediaListItem :item="movie" :is-movie="true" />
<MediaPageHeader 
  :backdrop_path="movie.backdrop_path" 
  :title="movie.title"
  :back-to="'/movies'"
/>
<MediaRating :score="movie.vote_average" />

<!-- 搜索组件 -->
<SearchBox
  v-model="searchQuery"
  placeholder="搜索电影、电视剧、演员..."
  :show-search-button="true"
  :show-suggestions="true"
  :debounce-delay="300"
  :suggestion-limit="5"
  @search="handleSearch"
  @suggestion-select="handleSuggestionSelect"
  @view-all-results="handleViewAllResults"
/>

<SearchSuggestions
  :show-suggestions="showSuggestions && suggestions.length > 0"
  :suggestions="suggestions"
  :total-results="totalResults"
  @select-suggestion="handleSuggestionSelect"
  @view-all-results="handleViewAllResults"
/>

<!-- 骨架屏组件 -->
<SkeletonGrid :count="12" variant="movie" :cols="{ sm: 2, md: 4, lg: 6 }" />
<SkeletonList :count="15" variant="actor" />
<SkeletonListItem :count="10" />
<SkeletonLoadingState message="加载中..." />

<!-- 通用组件 -->
<CommonPagination
  :current-page="currentPage"
  :total-pages="totalPages"
  :total-results="totalResults"
  :show-first-last="true"
  :show-quick-jump="true"
  @page-change="handlePageChange"
/>
```

## 最佳实践

1. **保持组件专注**: 每个组件应该只有一个职责
2. **使用描述性名称**: 组件名称应该清楚地表明其用途
3. **分组相关组件**: 将组件放在适当的目录中
4. **遵循命名约定**: 为不同类型使用一致的前缀
5. **文档化复杂组件**: 为复杂逻辑添加注释
6. **使组件可复用**: 设计灵活且可复用的组件
7. **统一使用外循环模式**: 提高组件的灵活性和复用性
8. **保持组件独立性**: 避免组件间的强耦合

## 组件详细文档

### CommonPagination 分页组件

一个功能完整的分页组件，支持多种功能和移动端适配。

> 💡 **代码质量**: 组件包含完整的 JSDoc 注释，明确所有 props、events、methods 的入参和回参，便于开发和维护。

#### 基础使用

```vue
<CommonPagination
  :current-page="currentPage"
  :total-pages="totalPages"
  @page-change="handlePageChange"
/>
```

#### 完整功能

```vue
<CommonPagination
  :current-page="currentPage"
  :total-pages="totalPages"
  :total-results="totalResults"
  :show-first-last="true"
  :show-quick-jump="true"
  :show-page-size="true"
  :page-size="pageSize"
  :page-size-options="[10, 20, 50, 100]"
  :max-visible-pages="7"
  @page-change="handlePageChange"
  @page-size-change="handlePageSizeChange"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `currentPage` | `Number` | - | 当前页码 (必填) |
| `totalPages` | `Number` | - | 总页数 (必填) |
| `totalResults` | `Number` | `0` | 总结果数 |
| `scrollToTop` | `Boolean` | `true` | 是否自动滚动到顶部 |
| `showFirstLast` | `Boolean` | `false` | 是否显示首页/末页按钮 |
| `showQuickJump` | `Boolean` | `false` | 是否显示快速跳转 |
| `showPageSize` | `Boolean` | `false` | 是否显示每页条数选择 |
| `pageSize` | `Number` | `20` | 当前每页条数 |
| `pageSizeOptions` | `Array` | `[10, 20, 50, 100]` | 每页条数选项 |
| `maxVisiblePages` | `Number` | `7` | 最大显示页码数量 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `page-change` | `(page: number)` | 页码变化时触发 |
| `page-size-change` | `(pageSize: number)` | 每页条数变化时触发 |

#### 插槽

| 插槽名 | 作用域参数 | 说明 |
|--------|------------|------|
| `first-text` | - | 首页按钮文本 |
| `prev-text` | - | 上一页按钮文本 |
| `next-text` | - | 下一页按钮文本 |
| `last-text` | - | 末页按钮文本 |
| `summary` | `{ current, total, totalResults }` | 统计信息 |

#### 移动端适配

组件针对移动端进行了专门优化：

- **智能布局**: 移动端自动隐藏首页/末页按钮，节省空间
- **紧凑设计**: 按钮尺寸更小，间距更紧凑
- **符号化导航**: 移动端使用箭头符号 (‹ ›) 替代文字
- **减少页码**: 移动端最多显示5个页码，避免拥挤
- **垂直排列**: 快速跳转和每页条数选择在移动端垂直排列
- **简化信息**: 统计信息在小屏上简化显示

#### 自定义文本示例

```vue
<CommonPagination
  :current-page="currentPage"
  :total-pages="totalPages"
  :total-results="totalResults"
  @page-change="handlePageChange"
>
  <template #first-text>🏠 首页</template>
  <template #prev-text>⬅️ 上一页</template>
  <template #next-text>下一页 ➡️</template>
  <template #last-text>末页 🏁</template>
  <template #summary="{ current, total, totalResults }">
    <!-- 桌面端显示完整信息 -->
    <span class="hidden sm:inline">
      第 {{ current }} 页，共 {{ total }} 页 ({{ totalResults }} 条结果)
    </span>
    <!-- 移动端显示简化信息 -->
    <span class="sm:hidden">
      {{ current }}/{{ total }} ({{ totalResults }}条)
    </span>
  </template>
</CommonPagination>
```

#### 使用示例

```javascript
// 页面跳转处理
const handlePageChange = (page) => {
  currentPage.value = page
  // 组件会自动处理滚动到顶部
}

// 每页条数变化处理
const handlePageSizeChange = (newPageSize) => {
  pageSize.value = newPageSize
  currentPage.value = 1 // 重置到第一页
  // 重新获取数据
}
```

### MediaCard 媒体卡片组件

用于展示电影/电视剧信息的卡片组件。

#### 基础使用

```vue
<MediaCard
  :item="movie"
  :is-movie="true"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `item` | `Object` | - | 媒体项目数据 (必填) |
| `is-movie` | `Boolean` | `false` | 是否为电影类型 |
| `status` | `String` | - | 状态标识 (upcoming, on-air 等) |

### SkeletonGrid 骨架屏网格组件

用于显示加载状态的网格骨架屏。

#### 基础使用

```vue
<SkeletonGrid 
  :count="12"
  variant="movie"
  :cols="{ sm: 2, md: 4, lg: 6 }"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `count` | `Number` | `6` | 骨架卡片数量 |
| `variant` | `String` | `movie` | 变体类型 (movie, tv, actor) |
| `cols` | `Object` | `{ sm: 2, md: 3, lg: 4 }` | 响应式列数配置 |

### MediaPageHeader 媒体页面头部组件

用于媒体详情页面的头部组件。

#### 基础使用

```vue
<MediaPageHeader 
  :backdrop_path="movie.backdrop_path" 
  :title="movie.title"
  :back-to="'/movies'"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backdrop_path` | `String` | - | 背景图片路径 |
| `title` | `String` | - | 页面标题 |
| `back-to` | `String` | - | 返回链接 |

### SkeletonList 骨架屏列表组件

用于显示加载状态的列表骨架屏。

#### 基础使用

```vue
<SkeletonList 
  :count="15"
  variant="actor"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `count` | `Number` | `10` | 骨架项数量 |
| `variant` | `String` | `default` | 变体类型 (actor, movie, tv) |

### SkeletonLoadingState 简单加载状态组件

用于显示简单加载状态的组件。

#### 基础使用

```vue
<SkeletonLoadingState message="加载中..." />
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `message` | `String` | `加载中...` | 加载提示信息 |

### MediaRating 媒体评分组件

用于显示媒体评分的组件。

#### 基础使用

```vue
<MediaRating :score="movie.vote_average" />
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `score` | `Number` | - | 评分分数 (0-10) |
| `showText` | `Boolean` | `true` | 是否显示文字评分 |
| `size` | `String` | `medium` | 组件尺寸 (small, medium, large) |

### SearchBox 搜索框组件

统一的搜索输入框组件，支持头部和搜索页面使用，包含实时搜索建议功能。

#### 基础使用

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="搜索电影、电视剧、演员..."
  @search="handleSearch"
/>
```

#### 头部搜索框

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="搜索..."
  :input-class="'w-full px-4 py-2 pl-10 pr-4 bg-gray-100 border-0 rounded-full focus:bg-white focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200'"
  :show-search-button="false"
  :show-suggestions="true"
  :debounce-delay="300"
  :suggestion-limit="5"
  @search="handleSearch"
  @suggestion-select="handleSuggestionSelect"
  @view-all-results="handleViewAllResults"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `String` | `''` | 搜索关键词（v-model） |
| `placeholder` | `String` | `'搜索电影、电视剧、演员...'` | 输入框占位符 |
| `inputClass` | `String` | 默认样式类 | 输入框样式类 |
| `showSearchButton` | `Boolean` | `true` | 是否显示搜索按钮 |
| `showSuggestions` | `Boolean` | `true` | 是否显示搜索建议 |
| `debounceDelay` | `Number` | `300` | 防抖延迟时间（毫秒） |
| `suggestionLimit` | `Number` | `5` | 建议数量限制 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value: string)` | 搜索关键词更新 |
| `search` | `(query: string)` | 执行搜索 |
| `suggestion-select` | `(suggestion: object)` | 选择搜索建议 |
| `view-all-results` | `(query: string)` | 查看所有搜索结果 |

#### 功能特性

- **防抖处理**: 使用项目统一的防抖函数，避免频繁请求
- **实时建议**: 支持实时搜索建议，提升用户体验
- **样式定制**: 通过 `inputClass` prop 自定义输入框样式
- **响应式设计**: 支持移动端和桌面端不同样式
- **键盘支持**: 支持回车搜索和方向键导航

### SearchSuggestions 搜索建议组件

显示搜索建议列表的组件，支持电影、电视剧、演员类型标签。

#### 基础使用

```vue
<SearchSuggestions
  :show-suggestions="showSuggestions && suggestions.length > 0"
  :suggestions="suggestions"
  :total-results="totalResults"
  @select-suggestion="handleSuggestionSelect"
  @view-all-results="handleViewAllResults"
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showSuggestions` | `Boolean` | `false` | 是否显示建议 |
| `suggestions` | `Array` | `[]` | 建议数据数组 |
| `totalResults` | `Number` | `0` | 总结果数 |

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `select-suggestion` | `(suggestion: object)` | 选择建议项 |
| `view-all-results` | `(query: string)` | 查看所有结果 |

#### 建议数据结构

```typescript
interface SearchSuggestion {
  id: number
  title?: string          // 电影/电视剧标题
  name?: string           // 演员姓名
  media_type: 'movie' | 'tv' | 'person'
  poster_path?: string    // 海报路径
  profile_path?: string   // 头像路径
  release_date?: string   // 发布日期
  first_air_date?: string // 首播日期
  known_for_department?: string // 演员部门
}
```

#### 功能特性

- **类型标签**: 显示电影、电视剧、演员的类型标签
- **图片显示**: 显示海报或头像图片
- **结果统计**: 显示总结果数
- **现代化 UI**: 圆角、阴影、悬停效果
- **键盘导航**: 支持方向键和回车键操作

## 组件使用统计

根据项目中的实际使用情况，以下是各组件的使用频率：

### 高频使用组件
- **MediaCard** - 在首页、发现页、详情页等广泛使用
- **SkeletonGrid** - 在首页、发现页等数据加载时使用
- **CommonPagination** - 在演员列表页、发现页等分页场景使用
- **LayoutHeader/LayoutFooter** - 全局布局组件
- **SearchBox** - 在头部导航和搜索页面使用

### 中频使用组件
- **MediaPageHeader** - 在详情页子页面中使用
- **SkeletonList** - 在演职员页面使用
- **SkeletonLoadingState** - 在详情页和演员详情页使用
- **MediaListItem** - 在发现页列表视图使用
- **SearchSuggestions** - 在搜索框下方显示建议

### 低频使用组件
- **MediaRating** - 在 MediaCard 内部使用
- **SkeletonListItem** - 在发现页列表视图加载时使用

## 组件开发规范

### 1. 文件命名
- 使用 PascalCase 命名组件文件
- 文件名应该与组件名一致
- 目录名使用 PascalCase

### 2. 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 导入依赖
import { ref, computed } from 'vue'

// Props 定义
const props = defineProps({
  // props 定义
})

// Emits 定义
const emit = defineEmits([
  // events 定义
])

// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```

### 3. Props 规范
- 使用 `defineProps` 定义 props
- 为每个 prop 提供类型和默认值
- 添加 JSDoc 注释说明用途

### 4. 事件规范
- 使用 `defineEmits` 定义事件
- 事件名使用 kebab-case
- 提供事件参数的类型说明

### 5. 样式规范
- 使用 `scoped` 样式避免污染
- 优先使用 Tailwind CSS 类
- 复杂样式使用 CSS 变量

## 未来规划

### 计划新增组件
- **UiButton** - 通用按钮组件
- **UiModal** - 模态框组件
- **UiTooltip** - 工具提示组件
- **MediaPlayer** - 视频播放器组件
- **MediaGallery** - 图片画廊组件
- **CommonIcon** - 图标组件
- **CommonBreadcrumb** - 面包屑导航组件

### 组件优化计划
- 完善组件的 TypeScript 类型定义
- 添加组件的单元测试
- 优化组件的性能表现
- 增强组件的可访问性
- 完善组件的文档说明 