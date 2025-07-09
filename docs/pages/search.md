# 搜索功能设计文档

## 📋 **概述**

搜索功能是用户发现内容的核心入口，提供统一、智能、高效的搜索体验。支持电影、电视剧、演员的多类型搜索，具备实时建议、高级过滤和智能排序功能。

**页面路径**: `/search`  
**文件位置**: `pages/search/index.vue`  
**核心组件**: `components/Search/SearchBox.vue`、`components/Search/SearchSuggestions.vue`

## 🎯 **设计目标**

### **用户体验目标**

- **快速响应**: 搜索建议实时显示，响应时间 < 300ms
- **智能提示**: 基于用户输入提供相关建议
- **统一体验**: 头部搜索框和搜索页面保持一致
- **移动友好**: 支持触摸操作和键盘导航

### **功能完整性**

- **多类型搜索**: 电影、电视剧、演员统一搜索
- **高级过滤**: 年份、类型、成人内容过滤
- **结果排序**: 按相关性、热度、时间排序
- **分页浏览**: 支持大量结果的分页浏览

### **性能要求**

- **防抖优化**: 避免频繁 API 请求
- **缓存策略**: 合理利用缓存提升响应速度
- **懒加载**: 图片和内容按需加载
- **错误处理**: 优雅处理网络错误和异常

## 🏗️ **架构设计**

### **组件架构**

```
SearchBox (统一搜索输入框)
├── 输入框组件
├── 搜索按钮
└── SearchSuggestions (搜索建议)
    ├── 建议列表
    ├── 类型标签
    └── 查看全部按钮

SearchPage (搜索页面)
├── SearchBox
├── SearchFilters (过滤选项)
├── SearchResults (搜索结果)
│   ├── 网格视图
│   ├── 列表视图
│   └── 视图切换
└── Pagination (分页组件)
```

### **数据流设计**

```
用户输入 → 防抖处理 → API 请求 → 数据处理 → 界面更新
    ↓
搜索建议 ← 实时反馈 ← 结果过滤 ← 状态管理 ← URL 同步
```

### **API 设计**

```typescript
// 统一搜索 API 接口
interface SearchAPI {
  // 多类型搜索 (TMDB 官方接口)
  multiSearch(query: string, page?: number): SearchResponse

  // 单类型搜索
  searchMovies(
    query: string,
    page?: number,
    filters?: SearchFilters
  ): SearchResponse
  searchTvShows(
    query: string,
    page?: number,
    filters?: SearchFilters
  ): SearchResponse
  searchPeople(
    query: string,
    page?: number,
    filters?: SearchFilters
  ): SearchResponse

  // 搜索建议
  getSearchSuggestions(query: string, limit?: number): SearchResponse

  // 高级搜索
  advancedMultiSearch(
    query: string,
    page?: number,
    filters?: AdvancedFilters
  ): SearchResponse
}
```

## 🎨 **界面设计**

### **搜索框设计**

#### **头部搜索框**

- **样式**: 圆角全宽设计，背景色为浅灰色
- **交互**: 聚焦时背景变白，添加阴影效果
- **功能**: 实时建议，支持回车搜索
- **响应式**: 移动端隐藏搜索按钮，桌面端显示

```css
/* 头部搜索框样式 */
.header-search {
  @apply w-full px-4 py-2 pl-10 pr-4;
  @apply bg-gray-100 border-0 rounded-full;
  @apply focus:bg-white focus:ring-2 focus:ring-red-500 focus:shadow-lg;
  @apply transition-all duration-200;
}
```

#### **搜索页面输入框**

- **样式**: 标准输入框，带边框和搜索按钮
- **功能**: 完整的搜索功能，包括建议和过滤
- **布局**: 居中显示，突出搜索功能

```css
/* 搜索页面样式 */
.search-page-input {
  @apply w-full px-4 py-3 pl-10 pr-20;
  @apply border border-gray-300 rounded-lg;
  @apply focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent;
}
```

### **搜索建议设计**

#### **建议容器**

- **位置**: 绝对定位在搜索框下方
- **样式**: 白色背景，圆角边框，阴影效果
- **滚动**: 内容过多时支持滚动
- **层级**: 确保在其他元素之上

#### **建议项设计**

- **布局**: 水平布局，图片 + 信息 + 类型标签
- **信息**: 标题/姓名、年份、类型标签
- **交互**: 悬停高亮，点击选择
- **图片**: 海报或头像，支持占位符

```vue
<!-- 建议项结构 -->
<div class="suggestion-item">
  <img :src="image.getPosterUrl(item.poster_path)" />
  <div class="info">
    <h4>{{ item.title || item.name }}</h4>
    <p>{{ item.release_date || item.first_air_date }}</p>
  </div>
  <span class="type-tag">{{ getTypeLabel(item.media_type) }}</span>
</div>
```

### **搜索结果设计**

#### **结果统计**

- **显示**: 总结果数和当前页信息
- **样式**: 小字体，灰色文字
- **位置**: 搜索结果上方

#### **视图切换**

- **网格视图**: 卡片式布局，适合浏览
- **列表视图**: 紧凑布局，适合快速浏览
- **切换按钮**: 图标按钮，支持键盘操作

#### **过滤选项**

- **媒体类型**: 电影、电视剧、演员、全部
- **年份过滤**: 年份选择器
- **成人内容**: 开关控制
- **布局**: 水平排列，响应式设计

## 🔧 **技术实现**

### **防抖机制**

```javascript
// 使用项目统一的防抖函数
const debouncedSearch = common.debounce(async query => {
  try {
    const result = await getSearchSuggestions(query, 5)
    if (result.data.value) {
      searchSuggestions.value = result.data.value.results
    }
  } catch (error) {
    console.error('Search failed:', error)
  }
}, 300)
```

### **状态管理**

```javascript
// URL 参数同步
const route = useRoute()
const router = useRouter()

// 从 URL 获取搜索参数
const searchQuery = ref(route.query.q || '')
const searchType = ref(route.query.type || 'all')
const searchYear = ref(route.query.year || '')
const currentPage = ref(parseInt(route.query.page) || 1)

// 更新搜索参数
const updateSearchParams = params => {
  router.push({
    query: {
      ...route.query,
      ...params,
      page: 1, // 重置页码
    },
  })
}
```

### **数据获取策略**

```javascript
// 多类型搜索
const searchResults = await multiSearch(searchQuery.value, currentPage.value)

// 单类型搜索
const movies = await searchMovies(searchQuery.value, currentPage.value, {
  year: searchYear.value,
  include_adult: includeAdult.value,
})

// 并行请求优化
const [movies, tvShows, people] = await Promise.all([
  searchMovies(query, page, filters),
  searchTvShows(query, page, filters),
  searchPeople(query, page, filters),
])
```

### **错误处理**

```javascript
// 完整的错误处理
try {
  const result = await searchAPI(query)
  // 处理结果
} catch (error) {
  console.error('Search failed:', error)
  // 显示用户友好的错误信息
  showErrorMessage('搜索失败，请重试')
}
```

## 📱 **响应式设计**

### **移动端适配 (< 640px)**

- **搜索框**: 全宽显示，隐藏搜索按钮
- **建议**: 简化布局，减少信息显示
- **结果**: 2 列网格，紧凑间距
- **过滤**: 垂直排列，下拉选择

### **平板端适配 (640px - 1024px)**

- **搜索框**: 居中显示，保留搜索按钮
- **建议**: 完整信息显示
- **结果**: 4 列网格，适中间距
- **过滤**: 水平排列，按钮样式

### **桌面端适配 (≥ 1024px)**

- **搜索框**: 大尺寸输入框，完整功能
- **建议**: 丰富信息，悬停效果
- **结果**: 6 列网格，宽松间距
- **过滤**: 完整功能，高级选项

## ⚡ **性能优化**

### **缓存策略**

- **搜索结果**: 使用 Nuxt 的 `useAsyncData` 自动缓存
- **建议数据**: 不缓存，保证实时性
- **图片缓存**: 利用 TMDB CDN 和浏览器缓存

### **懒加载实现**

- **图片懒加载**: 使用 `loading="lazy"`
- **分页加载**: 按需加载搜索结果
- **组件懒加载**: 按需加载非关键组件

### **请求优化**

- **防抖处理**: 避免频繁 API 请求
- **请求合并**: 相似请求合并处理
- **错误重试**: 网络错误自动重试

## 🎯 **交互设计**

### **键盘导航**

- **Tab 键**: 在搜索框、建议、按钮间切换
- **方向键**: 在建议项间导航
- **回车键**: 执行搜索或选择建议
- **ESC 键**: 关闭建议或清空搜索

### **触摸操作**

- **点击搜索框**: 聚焦并显示建议
- **点击建议**: 选择并跳转
- **滑动浏览**: 支持触摸滑动
- **长按操作**: 显示上下文菜单

### **视觉反馈**

- **加载状态**: 骨架屏和加载动画
- **错误状态**: 友好的错误提示
- **成功状态**: 平滑的过渡动画
- **空状态**: 引导性的空状态设计

## 🔍 **搜索算法**

### **相关性排序**

- **标题匹配**: 完全匹配 > 前缀匹配 > 包含匹配
- **热度权重**: 结合评分和热度
- **时间权重**: 新内容适当提升权重
- **类型平衡**: 确保各类型内容均衡显示

### **建议生成**

- **实时建议**: 基于用户输入实时生成
- **热门建议**: 显示热门搜索词
- **历史建议**: 基于用户搜索历史
- **智能补全**: 自动补全常见搜索词

## 📊 **数据分析**

### **搜索指标**

- **搜索量**: 每日搜索次数
- **点击率**: 建议点击率
- **转化率**: 搜索到详情页转化率
- **停留时间**: 搜索结果页停留时间

### **用户行为**

- **搜索模式**: 常用搜索词和模式
- **过滤偏好**: 用户常用的过滤条件
- **视图偏好**: 网格/列表视图使用比例
- **设备分布**: 不同设备的搜索行为

## 🚀 **扩展计划**

### **短期优化 (1-2 个月)**

- [ ] 搜索历史功能
- [ ] 热门搜索词展示
- [ ] 搜索建议优化
- [ ] 移动端体验提升

### **中期功能 (3-6 个月)**

- [ ] 语音搜索支持
- [ ] 图片搜索功能
- [ ] 个性化搜索
- [ ] 搜索分析面板

### **长期规划 (6-12 个月)**

- [ ] AI 智能推荐
- [ ] 多语言搜索
- [ ] 社交搜索功能
- [ ] 高级搜索语法

## 📝 **测试策略**

### **功能测试**

- **搜索准确性**: 验证搜索结果的相关性
- **建议质量**: 测试搜索建议的准确性
- **过滤功能**: 验证各种过滤条件的正确性
- **分页功能**: 测试分页的完整性和性能

### **性能测试**

- **响应时间**: 搜索建议和结果的响应时间
- **并发处理**: 多用户同时搜索的性能
- **内存使用**: 大量搜索结果的内存占用
- **网络优化**: 不同网络环境下的表现

### **用户体验测试**

- **易用性**: 用户能否快速找到想要的内容
- **满意度**: 用户对搜索体验的满意度
- **错误处理**: 用户遇到错误时的处理体验
- **可访问性**: 残障用户的使用体验

## 🧩 **组件详细说明**

### **SearchBox 组件**

#### **功能特性**

- 🔍 统一搜索输入框，支持头部和搜索页面使用
- 💡 实时搜索建议，支持防抖
- 🎨 可自定义样式和配置
- 📱 响应式设计，支持移动端
- ⌨️ 支持回车搜索和按钮搜索

#### **Props 配置**

| 属性               | 类型    | 默认值                        | 说明                  |
| ------------------ | ------- | ----------------------------- | --------------------- |
| `modelValue`       | String  | `''`                          | 搜索关键词（v-model） |
| `placeholder`      | String  | `'搜索电影、电视剧、演员...'` | 输入框占位符          |
| `inputClass`       | String  | 默认样式类                    | 输入框样式类          |
| `showSearchButton` | Boolean | `true`                        | 是否显示搜索按钮      |
| `showSuggestions`  | Boolean | `true`                        | 是否显示搜索建议      |
| `debounceDelay`    | Number  | `300`                         | 防抖延迟时间（毫秒）  |
| `suggestionLimit`  | Number  | `5`                           | 建议数量限制          |

#### **Events 事件**

| 事件名              | 参数                   | 说明             |
| ------------------- | ---------------------- | ---------------- |
| `update:modelValue` | `(value: string)`      | 搜索关键词更新   |
| `search`            | `(query: string)`      | 执行搜索         |
| `suggestion-select` | `(suggestion: object)` | 选择搜索建议     |
| `view-all-results`  | `(query: string)`      | 查看所有搜索结果 |

#### **使用示例**

##### 头部搜索框

```vue
<template>
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
</template>

<script setup>
  const searchQuery = ref('')

  const handleSearch = query => {
    // 跳转到搜索页面
    navigateTo(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleSuggestionSelect = suggestion => {
    // 处理建议选择
    console.log('Selected suggestion:', suggestion)
  }

  const handleViewAllResults = query => {
    // 查看所有结果
    navigateTo(`/search?q=${encodeURIComponent(query)}`)
  }
</script>
```

##### 搜索页面

```vue
<template>
  <SearchBox
    v-model="searchQuery"
    :show-search-button="true"
    :show-suggestions="true"
    @search="handleSearch"
    @suggestion-select="handleSuggestionSelect"
  />
</template>
```

### **SearchSuggestions 组件**

#### **功能特性**

- 🎯 显示搜索建议列表
- 🏷️ 支持电影、电视剧、演员类型标签
- 🖼️ 显示海报/头像图片
- 📊 显示总结果数
- 🎨 现代化 UI 设计

#### **Props 配置**

| 属性              | 类型    | 默认值  | 说明         |
| ----------------- | ------- | ------- | ------------ |
| `showSuggestions` | Boolean | `false` | 是否显示建议 |
| `suggestions`     | Array   | `[]`    | 建议数据数组 |
| `totalResults`    | Number  | `0`     | 总结果数     |

#### **Events 事件**

| 事件名              | 参数                   | 说明         |
| ------------------- | ---------------------- | ------------ |
| `select-suggestion` | `(suggestion: object)` | 选择建议项   |
| `view-all-results`  | `(query: string)`      | 查看所有结果 |

#### **建议数据结构**

```typescript
interface SearchSuggestion {
  id: number
  title?: string // 电影/电视剧标题
  name?: string // 演员姓名
  media_type: 'movie' | 'tv' | 'person'
  poster_path?: string // 海报路径
  profile_path?: string // 头像路径
  release_date?: string // 发布日期
  first_air_date?: string // 首播日期
  known_for_department?: string // 演员部门
}
```

## 🔌 **API 接口详情**

### **统一搜索 API (`api/search.ts`)**

#### **主要函数**

##### `multiSearch(query, page = 1)`

TMDB 官方多类型搜索接口

```javascript
// 使用示例
const result = await multiSearch('avengers', 1)
// 返回电影、电视剧、演员的混合结果
```

##### `searchMovies(query, page = 1, filters = {})`

电影搜索接口

```javascript
// 使用示例
const result = await searchMovies('avengers', 1, {
  year: 2012,
  include_adult: false,
})
```

##### `searchTvShows(query, page = 1, filters = {})`

电视剧搜索接口

```javascript
// 使用示例
const result = await searchTvShows('game of thrones', 1, {
  first_air_date_year: 2011,
  include_adult: false,
})
```

##### `searchPeople(query, page = 1, filters = {})`

演员搜索接口

```javascript
// 使用示例
const result = await searchPeople('tom hanks', 1, {
  include_adult: false,
})
```

##### `getSearchSuggestions(query, limit = 5)`

获取搜索建议

```javascript
// 使用示例
const result = await getSearchSuggestions('avengers', 5)
// 返回快速搜索建议
```

##### `advancedMultiSearch(query, page = 1, filters = {})`

高级多类型搜索（支持过滤）

```javascript
// 使用示例
const result = await advancedMultiSearch('avengers', 1, {
  media_types: ['movie', 'tv'],
  year: 2012,
  include_adult: false,
})
```

### **API 响应格式**

```typescript
interface SearchResponse {
  data: Ref<{
    results: Array<SearchResult>
    total_results: number
    total_pages: number
    page: number
  }>
  pending: Ref<boolean>
  error: Ref<Error | null>
  refresh: () => Promise<void>
}
```

## 📱 **搜索页面实现**

### **页面特性**

- 🔍 统一搜索输入框
- 🎛️ 高级过滤选项（媒体类型、年份、成人内容）
- 📊 网格/列表视图切换
- 📄 分页支持
- ⚡ 加载状态和错误处理
- 📱 响应式设计

### **URL 参数支持**

```
/search?q=avengers&type=movie&year=2012&page=1&view=grid
```

| 参数            | 类型    | 说明                            |
| --------------- | ------- | ------------------------------- |
| `q`             | String  | 搜索关键词                      |
| `type`          | String  | 媒体类型（movie/tv/person/all） |
| `year`          | Number  | 年份过滤                        |
| `include_adult` | Boolean | 是否包含成人内容                |
| `page`          | Number  | 页码                            |
| `view`          | String  | 视图模式（grid/list）           |

### **页面组件结构**

```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 搜索输入框 -->
    <SearchBox v-model="searchQuery" @search="handleSearch" />

    <!-- 过滤选项 -->
    <SearchFilters v-model="filters" @update="handleFilterUpdate" />

    <!-- 搜索结果 -->
    <SearchResults
      :results="searchResults"
      :loading="loading"
      :error="error"
      :view-mode="viewMode"
      @view-change="handleViewChange"
    />

    <!-- 分页 -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>
```

## 🎨 **样式设计**

### **搜索建议样式**

```css
/* 建议容器 */
.suggestions-container {
  @apply absolute top-full left-0 right-0 z-50;
  @apply bg-white border border-gray-200 rounded-lg shadow-lg;
  @apply mt-1 max-h-96 overflow-y-auto;
}

/* 建议项 */
.suggestion-item {
  @apply flex items-center gap-3 px-4 py-3;
  @apply hover:bg-gray-50 cursor-pointer;
  @apply transition-colors duration-150;
}
```

## 🐛 **常见问题**

### **1. 搜索建议不显示**

**问题**: 搜索建议有数据但不显示
**解决方案**: 检查显示条件

```javascript
// ✅ 正确的显示条件
v-if="showSuggestions && searchSuggestions.length > 0"

// ❌ 错误的显示条件
v-if="showSuggestions && !hasSearched"
```

### **2. 防抖不生效**

**问题**: 搜索请求过于频繁
**解决方案**: 使用项目统一的防抖函数

```javascript
// ✅ 使用项目防抖函数
const debouncedSearch = common.debounce(searchFunction, 300)

// ❌ 避免手动实现
let timeout
const handleInput = () => {
  clearTimeout(timeout)
  timeout = setTimeout(searchFunction, 300)
}
```

### **3. 搜索框样式不一致**

**问题**: 头部和搜索页面的搜索框样式不同
**解决方案**: 使用 `inputClass` prop 自定义样式

```vue
<SearchBox :input-class="headerSearchClass" :show-search-button="false" />
```

### **4. 移动端体验问题**

**问题**: 移动端搜索体验不佳
**解决方案**:

- 增加失焦延迟时间（300ms）
- 优化触摸区域大小
- 使用响应式设计

## 📚 **最佳实践**

### **1. 统一使用 SearchBox 组件**

```vue
<!-- ✅ 推荐：使用统一组件 -->
<SearchBox v-model="query" @search="handleSearch" />

<!-- ❌ 避免：重复实现搜索框 -->
<input v-model="query" @keyup.enter="handleSearch" />
```

### **2. 合理使用防抖**

```javascript
// ✅ 推荐：使用项目防抖函数
const debouncedSearch = common.debounce(searchFunction, 300)

// ❌ 避免：过短的防抖时间
const debouncedSearch = common.debounce(searchFunction, 100)
```

### **3. 错误处理**

```javascript
// ✅ 推荐：完整的错误处理
try {
  const result = await searchAPI(query)
  // 处理结果
} catch (error) {
  console.error('Search failed:', error)
  // 显示用户友好的错误信息
}
```

### **4. 性能优化**

```javascript
// ✅ 推荐：合理的建议数量
const suggestionLimit = 5 // 不要太多，影响性能

// ✅ 推荐：使用计算属性
const filteredResults = computed(() => {
  return results.value.filter(item => item.media_type === selectedType)
})
```

## 🔗 **相关文档**

- [组件使用指南](../components.md) - 搜索组件的使用说明
- [API 接口文档](../api-typescript-improvements.md) - 搜索 API 的详细说明
- [代码规范](../code-standards.md) - 代码质量和注释标准
- [通用模式](../common-patterns.md) - 项目常用代码模式
- [TMDB API 文档](https://developer.themoviedb.org/docs/getting-started) - 官方 API 文档
