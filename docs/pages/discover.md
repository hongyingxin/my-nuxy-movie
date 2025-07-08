# Discover 页面设计文档

## 概述

Discover 页面是电影和电视剧的核心发现页面，提供强大的筛选和排序功能。该页面支持电影和电视剧两种类型，通过动态路由 `/discover/[type]` 实现。

## 页面架构

### 路由结构
```
/discover/movie  - 电影发现页面
/discover/tv     - 电视剧发现页面
```

### 核心功能
1. **智能筛选系统** - 支持多种筛选条件组合
2. **动态排序** - 基于 TMDB API 的排序选项
3. **分类预设** - 热门、即将上映、正在上映、高分等预设分类
4. **响应式布局** - 支持桌面端和移动端
5. **实时搜索** - 筛选条件实时更新 URL 和结果

## 页面结构

### 1. 页面头部
```vue
<!-- 动态标题和描述 -->
<h1>{{ getPageHeaderTitle() }}</h1>
<p>{{ getPageHeaderDescription() }}</p>

<!-- 筛选按钮 -->
<button @click="toggleFilters">筛选</button>
```

### 2. 筛选侧边栏
- **排序方式** - 下拉选择框
- **分类筛选** - 多选按钮组
- **评分筛选** - 滑块控件
- **时间范围** - 日期选择器
- **语言筛选** - 下拉选择框
- **地区筛选** - 下拉选择框（仅电影）
- **上映类型** - 下拉选择框（仅电影）

### 3. 主要内容区域
- **结果统计** - 显示找到的结果数量
- **视图切换** - 网格视图/列表视图
- **内容展示** - 电影/电视剧卡片或列表
- **分页组件** - 支持页码跳转和快速跳转

### 4. 吸顶按钮
- **应用筛选** - 当筛选条件变化时显示

## 页面结构树

```
🎬 Discover 页面结构图
┌─────────────────────────────────────────────────────────────────┐
│                        🎯 页面头部 (Header)                      │
├─────────────────────────────────────────────────────────────────┤
│  📝 动态标题  │  📄 动态描述  │  🔍 筛选按钮  │  📱 移动端菜单  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🎛️ 筛选侧边栏 (Sidebar)                      │
├─────────────────────────────────────────────────────────────────┤
│  📊 排序方式选择器  │  🎭 分类筛选器  │  ⭐ 评分筛选器  │        │
│  ┌─────────────┐  │  ┌──────────┐  │  ┌──────────┐  │        │
│  │ 🔽 下拉菜单  │  │  ☑️ 多选框  │  │  🎚️ 滑块   │  │        │
│  └─────────────┘  │  └──────────┘  │  └──────────┘  │        │
│                   │                │                │        │
│  📅 时间范围筛选器  │  🌍 语言筛选器  │  🎬 电影专用   │        │
│  ┌─────────────┐  │  ┌──────────┐  │  ┌──────────┐  │        │
│  │ 📅 开始日期  │  │  🌐 下拉   │  │  🏛️ 地区   │  │        │
│  │ 📅 结束日期  │  │  └──────────┘  │  🎭 上映类型 │  │        │
│  └─────────────┘  │                │  └──────────┘  │        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   📊 主要内容区域 (Main Content)                 │
├─────────────────────────────────────────────────────────────────┤
│  📈 结果统计栏  │  🔄 视图切换栏  │  📋 内容展示区域  │  📄 分页  │
│  ┌─────────────┐  │  ┌──────────┐  │  ┌──────────┐  │  ┌─────┐ │
│  │ 🔢 结果数量  │  │  🟦 网格   │  │  🎬 媒体卡片│  │  🔢  │ │
│  │ 📋 筛选摘要  │  │  📋 列表   │  │  📝 列表项 │  │  📄  │ │
│  └─────────────┘  │  └──────────┘  │  └──────────┘  │  └─────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🎯 吸顶按钮 (Sticky Button)                   │
├─────────────────────────────────────────────────────────────────┤
│                    ✅ 应用筛选按钮 (Apply Filters)                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   🔄 加载状态 (Loading States)                   │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ 骨架屏  │  🔄 加载动画  │  ❌ 错误状态  │  📭 空状态  │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 页面布局示意图

```
┌─────────────────────────────────────────────────────────────────┐
│  🎬 Nuxt Movie - 发现精彩电影和电视剧                            │
├─────────────────────────────────────────────────────────────────┤
│  📝 热门电影  │  📄 发现最热门的电影，按人气排序  │  🔍 筛选  │
├─────────────────────────────────────────────────────────────────┤
│  🎛️ 筛选侧边栏  │  📊 主要内容区域                              │
│  ┌─────────────┐  │  ┌─────────────────────────────────────────┐ │
│  │ 📊 排序方式  │  │  │ 📈 找到 1,234 个结果  │ 🔄 网格/列表 │ │
│  │ 🔽 人气降序  │  │  ├─────────────────────────────────────────┤ │
│  │             │  │  │  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬 │ │
│  │ 🎭 分类筛选  │  │  │  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬 │ │
│  │ ☑️ 动作片   │  │  │  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬 │ │
│  │ ☑️ 科幻片   │  │  │  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬  🎬 │ │
│  │             │  │  ├─────────────────────────────────────────┤ │
│  │ ⭐ 评分筛选  │  │  │  📄 1 2 3 4 5 ... 50 下一页  │ 每页20条 │ │
│  │ 🎚️ 7.0+     │  │  └─────────────────────────────────────────┘ │
│  │             │  │                                              │
│  │ 📅 时间范围  │  │                                              │
│  │ 📅 2024-01-01│  │                                              │
│  │ 📅 2024-12-31│  │                                              │
│  │             │  │                                              │
│  │ 🌍 语言筛选  │  │                                              │
│  │ 🌐 中文      │  │                                              │
│  │             │  │                                              │
│  │ 🏛️ 地区筛选  │  │                                              │
│  │ 🇨🇳 中国     │  │                                              │
│  │             │  │                                              │
│  │ 🎭 上映类型  │  │                                              │
│  │ 🎬 影院上映  │  │                                              │
│  └─────────────┘  │                                              │
│                   │                                              │
│  ✅ 应用筛选      │                                              │
│  🔄 重置筛选      │                                              │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 组件树结构

```
Discover Page Component Tree
├── pages/discover/[type].vue (主页面组件)
│   │
│   ├── 页面头部组件 (Page Header)
│   │   ├── 动态标题 (Dynamic Title)
│   │   ├── 动态描述 (Dynamic Description)
│   │   └── 筛选切换按钮 (Filter Toggle Button)
│   │
│   ├── 筛选侧边栏组件 (Filter Sidebar)
│   │   ├── SortSelector (排序选择器)
│   │   │   ├── Select 组件
│   │   │   └── 排序选项数据
│   │   │
│   │   ├── GenreFilter (分类筛选器)
│   │   │   ├── CheckboxGroup 组件
│   │   │   └── 分类数据 (从 Store 获取)
│   │   │
│   │   ├── RatingFilter (评分筛选器)
│   │   │   ├── RangeSlider 组件
│   │   │   └── 评分显示组件
│   │   │
│   │   ├── DateRangeFilter (日期范围筛选器)
│   │   │   ├── DatePicker 组件 (开始日期)
│   │   │   ├── DatePicker 组件 (结束日期)
│   │   │   └── 日期格式化工具
│   │   │
│   │   ├── LanguageFilter (语言筛选器)
│   │   │   ├── Select 组件
│   │   │   └── 语言选项数据
│   │   │
│   │   ├── RegionFilter (地区筛选器) - 仅电影
│   │   │   ├── Select 组件
│   │   │   └── 地区选项数据
│   │   │
│   │   └── ReleaseTypeFilter (上映类型筛选器) - 仅电影
│   │       ├── Select 组件
│   │       └── 上映类型选项数据
│   │
│   ├── 主要内容区域组件 (Main Content Area)
│   │   ├── ResultsStats (结果统计组件)
│   │   │   ├── 结果数量显示
│   │   │   └── 筛选条件摘要
│   │   │
│   │   ├── ViewToggle (视图切换组件)
│   │   │   ├── GridViewButton
│   │   │   └── ListViewButton
│   │   │
│   │   ├── ContentDisplay (内容展示组件)
│   │   │   ├── GridView (网格视图)
│   │   │   │   └── MediaCard 组件列表
│   │   │   │       ├── 海报图片 (NuxtImg)
│   │   │   │       ├── 标题和年份
│   │   │   │       ├── 评分显示
│   │   │   │       └── 分类标签
│   │   │   │
│   │   │   └── ListView (列表视图)
│   │   │       └── MediaListItem 组件列表
│   │   │           ├── 缩略图 (NuxtImg)
│   │   │           ├── 详细信息
│   │   │           │   ├── 标题和年份
│   │   │           │   ├── 评分和投票数
│   │   │           │   ├── 分类标签
│   │   │           │   └── 简介描述
│   │   │           └── 操作按钮
│   │   │
│   │   └── Pagination (分页组件)
│   │       ├── PageNumbers (页码导航)
│   │       ├── NavigationButtons (导航按钮)
│   │       └── ItemsPerPage (每页数量)
│   │
│   ├── StickyButton (吸顶按钮组件)
│   │   └── ApplyFiltersButton (应用筛选按钮)
│   │
│   └── LoadingStates (加载状态组件)
│       ├── SkeletonGrid (骨架屏网格)
│       ├── LoadingSpinner (加载动画)
│       └── ErrorDisplay (错误显示)
│
├── 全局组件 (Global Components)
│   ├── MediaCard (媒体卡片组件)
│   │   ├── NuxtImg (图片组件)
│   │   ├── RatingDisplay (评分显示)
│   │   └── GenreTags (分类标签)
│   │
│   ├── MediaListItem (媒体列表项组件)
│   │   ├── NuxtImg (缩略图)
│   │   ├── MediaInfo (媒体信息)
│   │   └── ActionButtons (操作按钮)
│   │
│   └── Pagination (分页组件)
│       ├── PageNumbers (页码)
│       ├── NavigationButtons (导航按钮)
│       └── ItemsPerPage (每页数量)
│
└── 工具组件 (Utility Components)
    ├── SkeletonGrid (骨架屏网格)
    ├── LoadingSpinner (加载动画)
    ├── ErrorBoundary (错误边界)
    └── EmptyState (空状态)
```

## 组件职责分工

### **主页面组件 (pages/discover/[type].vue)**
- **状态管理**：管理筛选条件、分页状态、视图模式
- **数据获取**：调用 API 获取媒体列表数据
- **路由处理**：处理 URL 参数和页面跳转
- **布局协调**：协调各个子组件的布局和交互

### **筛选侧边栏组件**
- **SortSelector**：处理排序方式选择和变更
- **GenreFilter**：处理分类筛选，支持多选
- **RatingFilter**：处理评分范围筛选
- **DateRangeFilter**：处理日期范围筛选，支持电影/电视剧不同字段
- **LanguageFilter**：处理语言筛选
- **RegionFilter**：处理地区筛选（仅电影）
- **ReleaseTypeFilter**：处理上映类型筛选（仅电影）

### **内容展示组件**
- **ResultsStats**：显示结果统计和筛选摘要
- **ViewToggle**：处理网格/列表视图切换
- **GridView**：网格视图布局和 MediaCard 组件管理
- **ListView**：列表视图布局和 MediaListItem 组件管理
- **Pagination**：处理分页逻辑和导航

### **全局组件**
- **MediaCard**：媒体卡片展示，包含海报、标题、评分、分类
- **MediaListItem**：媒体列表项展示，包含缩略图、详细信息、操作按钮
- **Pagination**：通用分页组件，支持页码导航和快速跳转

### **工具组件**
- **SkeletonGrid**：加载时的骨架屏展示
- **LoadingSpinner**：加载动画
- **ErrorBoundary**：错误边界处理
- **EmptyState**：空状态展示

## 数据流结构

```
数据流结构图
├── 用户交互 (User Interaction)
│   ├── 筛选条件变更
│   ├── 视图模式切换
│   └── 分页操作
│
├── 状态管理 (State Management)
│   ├── 筛选条件状态 (filters)
│   ├── 分页状态 (pagination)
│   ├── 视图模式状态 (viewMode)
│   └── 加载状态 (loading)
│
├── API 调用 (API Calls)
│   ├── discoverMedia() - 主要数据获取
│   ├── 分类数据获取 (从 Store)
│   └── 语言/地区数据获取
│
├── 数据处理 (Data Processing)
│   ├── 筛选条件转换 (filtersToQuery)
│   ├── URL 参数解析 (getInitialFilters)
│   └── 响应数据处理
│
└── 组件渲染 (Component Rendering)
    ├── 筛选侧边栏更新
    ├── 内容列表更新
    ├── 分页组件更新
    └── 页面标题/描述更新
```

## 核心功能设计

### 1. 智能时间范围

#### 基于分类的默认时间范围
```javascript
const getDefaultDateRange = (sortBy) => {
  switch (sortBy) {
    case 'popularity.desc':     // 热门 - 无时间限制
      return { startDate: null, endDate: null }
    case 'vote_average.desc':   // 高分 - 排除太新的电影
      return { startDate: null, endDate: oneYearAgo }
    case 'release_date.asc':    // 即将上映 - 当前到未来1年
      return { startDate: today, endDate: oneYearLater }
    case 'release_date.desc':   // 正在上映 - 过去2个月到当前
      return { startDate: twoMonthsAgo, endDate: today }
    default:                    // 默认 - 当前年份到明年
      return { startDate: null, endDate: `${currentYear + 1}-12-31` }
  }
}
```

#### 时间范围字段映射
- `air_date.gte/lte` - 通用日期字段
- `primary_release_date.gte/lte` - 电影首映日期
- `release_date.gte/lte` - 电影上映日期
- `first_air_date.gte/lte` - 电视剧首播日期

### 2. 动态页面标题

#### 分类名称映射
```javascript
const getCategoryName = (sortBy) => {
  switch (sortBy) {
    case 'popularity.desc': return '热门'
    case 'release_date.asc': return '即将上映'
    case 'release_date.desc': return '正在上映'
    case 'vote_average.desc': return '高分'
    default: return '最新'
  }
}
```

#### 标题生成规则
- 基础格式：`${分类名称}${媒体类型}`
- 包含地区：`${地区名称}${分类名称}${媒体类型}`
- 包含上映类型：`${地区名称}${上映类型}${分类名称}${媒体类型}`

### 3. 筛选条件管理

#### 筛选条件结构
```javascript
const filters = {
  sort_by: 'release_date.desc',           // 排序方式
  with_genres: [28, 12],                  // 分类ID数组
  'vote_average.gte': 7,                  // 最低评分
  'air_date.gte': '2024-01-01',          // 开始日期
  'air_date.lte': '2024-12-31',          // 结束日期
  with_original_language: 'zh',           // 原始语言
  region: 'CN',                           // 地区（仅电影）
  with_release_type: '2|3'                // 上映类型（仅电影）
}
```

#### URL 参数转换
```javascript
const filtersToQuery = (filters) => {
  const query = {}
  
  // 只添加非默认值的参数
  if (filters.sort_by !== defaultSort) {
    query.sort_by = filters.sort_by
  }
  
  if (filters.with_genres.length > 0) {
    query.with_genres = filters.with_genres.join(',')
  }
  
  // ... 其他参数转换
  return query
}
```

### 4. 状态管理

#### 响应式数据
```javascript
const filters = ref(getInitialFilters())           // 当前筛选条件
const initialFilters = ref(JSON.parse(JSON.stringify(filters.value)))  // 初始状态
const hasFilterChanges = computed(() => {          // 检测变化
  return JSON.stringify(filters.value) !== JSON.stringify(initialFilters.value)
})
```

#### 监听器
```javascript
// 监听路由参数变化
watch(() => route.query, (newQuery) => {
  const newFilters = getInitialFilters()
  filters.value = newFilters
  initialFilters.value = JSON.parse(JSON.stringify(newFilters))
  fetchData()
}, { immediate: true })

// 监听筛选条件变化
watch(hasFilterChanges, (newValue) => {
  if (newValue) {
    // 设置观察器检测应用按钮可见性
    setupApplyButtonObserver()
  }
})
```

## 筛选功能详细设计

### 1. 不同页面进入的参数差异

#### **主导航预设分类参数**

Discover 页面支持通过主导航的不同分类进入，每个分类都有其特定的筛选参数预设。这些预设参数确保了用户在不同入口点获得最相关的内容。

**电影分类预设**包括：
- **最新电影**：无特殊参数，按默认排序显示最新添加的电影
- **热门电影**：按人气降序排序，无时间限制，展示最受欢迎的电影
- **即将上映**：按上映日期升序排序，时间范围从当前日期到未来一年
- **正在上映**：按上映日期降序排序，时间范围为过去2个月到当前日期
- **高分电影**：按评分降序排序，最低评分7分，排除太新的电影以确保评分可靠性

**电视剧分类预设**包括：
- **最新剧集**：无特殊参数，按默认排序显示最新添加的电视剧
- **热门剧集**：按人气降序排序，展示最受欢迎的电视剧
- **正在播出**：筛选播出状态为"正在播出"的剧集
- **高分剧集**：按评分降序排序，最低评分7分
- **今日播出**：筛选当天有播出的剧集，时间范围精确到当天

#### **URL 参数解析逻辑**

当用户进入页面时，系统会智能解析 URL 参数并初始化筛选条件。这个过程考虑了多个因素：

**时间范围智能计算**：系统会根据当前的排序方式自动计算合适的时间范围。例如，热门内容通常不需要时间限制，而高分内容会排除太新的作品以确保评分可靠性。即将上映的内容会使用未来时间范围，正在上映的内容会使用近期时间范围。

**默认值处理**：对于未在 URL 中指定的参数，系统会设置合理的默认值。电影的默认排序是上映日期降序，电视剧的默认排序是首播日期降序。时间范围的默认结束日期是当前年份加一年。

**参数类型转换**：系统会自动处理参数的类型转换，例如将字符串形式的分类ID转换为数字数组，将字符串形式的评分转换为浮点数。

### 2. 日期处理机制

#### **日期字段映射**

TMDB API 为电影和电视剧提供了不同的日期字段，这些字段反映了不同媒体类型的发布特点。

**电影日期字段**：
- `primary_release_date`：首映日期，表示电影在原始国家的首映日期
- `release_date`：上映日期，表示在指定地区的上映日期，需要配合 region 参数使用
- `air_date`：通用日期字段，提供兼容性支持

**电视剧日期字段**：
- `first_air_date`：首播日期，表示电视剧在原始国家的首播日期
- `air_date`：播出日期，通用的播出日期字段

#### **日期字段说明**

电影和电视剧的日期处理逻辑存在显著差异，这反映了两种媒体类型的发布模式不同。电影通常有明确的首映日期和地区上映日期，而电视剧的播出模式更加灵活。

**电影日期特点**：
- 首映日期通常是全球统一的
- 不同地区的上映日期可能不同
- 需要指定地区参数才能使用上映日期筛选

**电视剧日期特点**：
- 首播日期通常是全球统一的
- 播出日期更加灵活，可能跨越多天
- 支持按播出状态筛选

#### **日期输入处理**

用户可以通过日期选择器设置时间范围，系统会智能处理这些输入并同步更新所有相关的日期字段。

**开始日期处理**：当用户设置开始日期时，系统会同时更新对应媒体类型的所有开始日期字段。对于电影，会更新首映日期和上映日期的开始时间；对于电视剧，会更新首播日期的开始时间。同时，通用的 air_date 字段也会被更新。

**结束日期处理**：结束日期的处理逻辑与开始日期类似，确保所有相关字段保持同步。

**日期清空处理**：当用户清空日期输入时，系统会清空所有相关的日期字段，确保筛选条件的一致性。

### 3. 电影/电视剧参数区别

#### **媒体类型特定字段**

电影和电视剧在 TMDB API 中支持不同的筛选参数，这些差异反映了两种媒体类型的不同特点。

**电影特有参数**：
- **地区筛选**：可以指定特定地区，影响上映日期的筛选结果
- **上映类型筛选**：支持首映、影院上映、数字发行、实体发行、电视播出等不同类型
- **时长筛选**：可以设置电影的最短和最长时长
- **认证筛选**：支持按不同国家的认证等级筛选
- **年份筛选**：可以指定具体的发行年份
- **视频内容筛选**：可以选择是否包含视频内容

**电视剧特有参数**：
- **原产国筛选**：可以按电视剧的原产国进行筛选
- **播出状态筛选**：支持正在播出、计划中、制作中、已结束、已取消、试播等状态
- **类型筛选**：支持剧本剧、纪录片、新闻、真人秀、脱口秀、迷你剧等类型
- **网络筛选**：可以按播出网络进行筛选

#### **电影专用参数详解**

**地区筛选**是电影筛选的重要功能，它允许用户指定特定地区，系统会根据该地区的上映日期进行筛选。这个功能特别适用于想要查看特定地区电影排期的用户。

**上映类型筛选**提供了细粒度的控制，用户可以选择特定类型的上映方式。例如，只查看影院上映的电影，或者只查看数字发行的电影。

**时长筛选**帮助用户找到符合特定时长要求的电影，这对于想要在特定时间内观看电影的用户很有用。

**认证筛选**允许用户根据年龄分级进行筛选，这对于家庭观影或特定年龄段用户很有价值。

#### **电视剧专用参数详解**

**原产国筛选**帮助用户发现来自特定国家的电视剧，这对于想要观看特定文化背景内容的用户很有用。

**播出状态筛选**是电视剧筛选的核心功能，它反映了电视剧的播出特点。正在播出的剧集通常是最受欢迎的，而计划中的剧集让用户可以提前了解即将播出的内容。

**类型筛选**提供了按内容类型进行筛选的能力，用户可以根据自己的喜好选择特定类型的电视剧。

**网络筛选**允许用户按播出网络进行筛选，这对于想要观看特定电视台内容的用户很有用。

### 4. 筛选条件转换

#### **筛选条件到 URL 参数**

当用户应用筛选条件时，系统需要将内部的筛选状态转换为 URL 参数。这个过程确保了筛选条件可以被分享和书签保存。

**参数转换逻辑**：
- 只转换非默认值的参数，避免 URL 过长
- 根据媒体类型处理不同的参数
- 确保参数格式符合 TMDB API 的要求

**排序方式转换**：如果排序方式不是默认值，则添加到 URL 参数中。

**分类筛选转换**：将分类ID数组转换为逗号分隔的字符串。

**评分筛选转换**：只有当最低评分大于0时才添加到参数中。

**日期筛选转换**：根据媒体类型处理不同的日期字段，确保只添加有效的日期参数。

**媒体类型特定转换**：电影和电视剧的特定参数会分别处理，确保参数的正确性。

### 5. 筛选条件验证

#### **参数验证规则**

为了确保筛选条件的有效性，系统实现了全面的参数验证机制。

**评分范围验证**：确保最低评分在0-10的合理范围内。

**日期范围验证**：确保开始日期不晚于结束日期，避免逻辑错误。

**时长范围验证**：对于电影，确保最短时长不大于最长时长。

**年份验证**：确保年份在合理范围内，通常是从1900年到当前年份加一年。

**参数依赖验证**：检查参数之间的依赖关系，例如地区参数对上映日期字段的影响。

### 6. 筛选条件重置

#### **重置到默认值**

用户可以通过重置按钮将所有筛选条件恢复到默认状态。这个过程会：
- 重新计算默认的筛选条件
- 更新内部状态
- 更新 URL 参数
- 重新获取数据

#### **重置特定字段**

系统支持重置单个筛选字段，这对于微调筛选条件很有用。当重置日期字段时，系统会同时重置所有相关的日期字段，确保数据的一致性。

**日期字段联动重置**：由于电影和电视剧使用不同的日期字段，重置日期时会根据媒体类型重置相应的字段。

**状态同步**：重置操作会同步更新内部状态和 URL 参数，确保界面和数据的一致性。

## TMDB 官方网站时间范围规律分析

### 1. TMDB 官方分类结构分析

通过分析 TMDB 官方网站的页面结构，我们可以发现其采用了清晰的分类体系，每个分类都有其特定的时间范围和筛选逻辑。

#### **电影分类结构**
TMDB 官方网站的电影分类主要包括：

1. **Popular Movies（热门电影）**
   - 时间范围：无特定限制
   - 排序方式：`popularity.desc`
   - 特点：基于整体热度排序，包含所有时期的电影
   - 筛选逻辑：不设置时间限制，让算法根据热度自然排序

2. **Now Playing（正在上映）**
   - 时间范围：当前日期往前推 1-2 个月到当前日期
   - 排序方式：`release_date.desc`
   - 特点：显示当前正在影院上映的电影
   - 筛选逻辑：使用近期时间范围，确保内容的相关性

3. **Upcoming（即将上映）**
   - 时间范围：当前日期到未来 6-12 个月
   - 排序方式：`release_date.asc`
   - 特点：显示即将上映的新电影
   - 筛选逻辑：使用未来时间范围，提前展示即将上映的内容

4. **Top Rated（高分电影）**
   - 时间范围：无特定限制，但通常排除太新的电影
   - 排序方式：`vote_average.desc`
   - 特点：基于用户评分排序，需要足够的评分数量
   - 筛选逻辑：排除太新的电影以确保评分可靠性

#### **电视剧分类结构**
TMDB 官方网站的电视剧分类主要包括：

1. **Popular TV Shows（热门电视剧）**
   - 时间范围：无特定限制
   - 排序方式：`popularity.desc`
   - 特点：基于整体热度排序，包含所有时期的电视剧

2. **On the Air（正在播出）**
   - 时间范围：无特定时间限制
   - 筛选条件：`with_status: '0'`（正在播出状态）
   - 特点：显示当前正在播出的剧集
   - 筛选逻辑：使用播出状态而非时间范围

3. **Airing Today（今日播出）**
   - 时间范围：精确到当天
   - 筛选条件：`air_date.gte: today, air_date.lte: today`
   - 特点：显示当天有播出的剧集
   - 筛选逻辑：使用精确的日期匹配

4. **Top Rated TV（高分电视剧）**
   - 时间范围：无特定限制，但通常排除太新的剧集
   - 排序方式：`vote_average.desc`
   - 特点：基于用户评分排序，需要足够的评分数量

### 2. 时间范围规律总结

#### **核心规律**

1. **热门内容无时间限制**
   - 无论是电影还是电视剧，热门分类都不设置时间限制
   - 让算法根据热度自然排序，确保内容的多样性
   - 包含经典作品和最新热门内容

2. **正在上映/播出使用近期时间范围**
   - 电影：过去 1-2 个月到当前日期
   - 电视剧：使用播出状态而非时间范围
   - 确保用户看到的是当前可观看的内容

3. **即将上映/播出使用未来时间范围**
   - 电影：当前日期到未来 6-12 个月
   - 电视剧：当前日期到未来 3-6 个月
   - 提前展示即将发布的内容

4. **高分内容排除太新的作品**
   - 通常排除一年内的新作品
   - 确保评分有足够的样本数量
   - 提高评分结果的可靠性

#### **时间范围的具体实现**

**电影时间范围**：
- 热门：无时间限制
- 正在上映：过去 2 个月到当前日期
- 即将上映：当前日期到未来 1 年
- 高分：排除 1 年内的新电影

**电视剧时间范围**：
- 热门：无时间限制
- 正在播出：使用播出状态筛选
- 即将播出：当前日期到未来 6 个月
- 高分：排除 6 个月内的新剧集

### 3. 我们项目的实现方案

#### **当前实现分析**

我们的项目已经实现了基于 TMDB 官方分类的时间范围逻辑，具体体现在：

**智能时间范围计算**：
```javascript
const getDefaultDateRange = () => {
  const sortBy = route.query.sort_by
  
  if (sortBy === 'popularity.desc') {
    // 热门：无时间限制
    return { startDate: null, endDate: null }
  } else if (sortBy === 'vote_average.desc') {
    // 高分：排除太新的内容（评分不足）
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split('T')[0]
    return { startDate: null, endDate: oneYearAgo }
  } else if (sortBy === 'release_date.asc' || sortBy === 'first_air_date.asc') {
    // 即将上映/播出：当前日期到未来一年
    const oneYearLater = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString().split('T')[0]
    return { startDate: today, endDate: oneYearLater }
  } else if (sortBy === 'release_date.desc' || sortBy === 'first_air_date.desc') {
    // 正在上映/播出：过去2个月到当前日期
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate()).toISOString().split('T')[0]
    return { startDate: twoMonthsAgo, endDate: today }
  } else {
    // 默认：当前年份到明年
    return { startDate: null, endDate: `${defaultEndYear}-12-31` }
  }
}
```

#### **实现优势**

1. **符合 TMDB 官方逻辑**
   - 时间范围设置与 TMDB 官方网站保持一致
   - 确保用户获得与官方相同的体验

2. **智能默认值处理**
   - 根据排序方式自动设置合适的时间范围
   - 减少用户手动配置的复杂度

3. **灵活的日期字段处理**
   - 支持电影和电视剧的不同日期字段
   - 确保 API 请求的准确性

4. **用户友好的界面**
   - 动态页面标题和描述
   - 清晰的分类标识

#### **优化建议**

1. **时间范围微调**
   - 可以考虑将"即将上映"的时间范围调整为 6 个月，更符合实际排期
   - 电视剧的"即将播出"可以设置为 3 个月

2. **评分阈值优化**
   - 高分电影的最低评分可以设置为 7.5 分
   - 高分电视剧的最低评分可以设置为 7.0 分

3. **地区参数优化**
   - 默认地区可以设置为用户的地理位置
   - 支持多地区选择

4. **缓存策略优化**
   - 对热门内容进行更长时间的缓存
   - 对即将上映内容进行短期缓存

### 4. 总结

通过分析 TMDB 官方网站的时间范围规律，我们的项目实现方案具有以下特点：

**准确性**：时间范围设置与 TMDB 官方逻辑高度一致
**智能性**：根据分类自动设置合适的时间范围
**灵活性**：支持用户自定义时间范围
**用户友好**：提供清晰的分类标识和动态描述

这种实现方案确保了用户能够获得与 TMDB 官方网站一致的使用体验，同时提供了更好的本地化支持和用户界面优化。

## API 接口设计

### 1. 核心 API 接口

#### **通用 Discover 接口**

Discover API 是 TMDB 提供的最强大的筛选接口，支持电影和电视剧的复杂筛选。我们的项目基于这个接口构建了完整的发现功能。

**接口地址**：
- 电影：`/discover/movie`
- 电视剧：`/discover/tv`

**核心特点**：
- 支持超过 30 种筛选条件
- 可以替代多个特定接口（如 `/movie/popular`、`/movie/now_playing` 等）
- 提供灵活的排序和分页功能
- 支持复杂的组合筛选

**默认参数**：
- `sort_by`: `popularity.desc` - 默认按人气降序排序
- `page`: `1` - 默认第一页
- 用户传入的参数会覆盖默认值

#### **接口设计理念**

我们的 API 设计遵循以下理念：

1. **统一接口**：使用一个通用接口处理电影和电视剧
2. **类型安全**：完整的 TypeScript 类型定义
3. **便捷方法**：提供常用的筛选方法
4. **参数验证**：内置参数验证和错误处理
5. **向后兼容**：保持 API 的稳定性

### 2. 便捷方法设计

#### **分类筛选方法**

**根据分类获取电影**：
- 方法：`getMoviesByGenre(genreId, page, additionalParams)`
- 功能：获取指定分类的电影列表
- 参数：分类ID、页码、额外筛选参数
- 特点：支持额外的筛选条件组合

**根据分类获取电视剧**：
- 方法：`getTvShowsByGenre(genreId, page, additionalParams)`
- 功能：获取指定分类的电视剧列表
- 参数：分类ID、页码、额外筛选参数
- 特点：与电影方法保持一致的接口设计

#### **评分筛选方法**

**获取高分电影**：
- 方法：`getHighRatedMovies(page, minRating)`
- 默认最低评分：7.0 分
- 最少投票数：100 票
- 排序方式：评分降序

**获取高分电视剧**：
- 方法：`getHighRatedTvShows(page, minRating)`
- 默认最低评分：7.0 分
- 最少投票数：50 票
- 排序方式：评分降序

#### **时间筛选方法**

**获取最新电影**：
- 方法：`getLatestMovies(page)`
- 筛选条件：首映日期小于等于今天
- 排序方式：首映日期降序

**获取最新电视剧**：
- 方法：`getLatestTvShows(page)`
- 筛选条件：首播日期小于等于今天
- 排序方式：首播日期降序

**获取即将上映电影**：
- 方法：`getUpcomingMovies(page)`
- 筛选条件：首映日期大于等于今天
- 排序方式：首映日期升序

**获取即将播出电视剧**：
- 方法：`getUpcomingTvShows(page)`
- 筛选条件：首播日期大于等于今天
- 排序方式：首播日期升序

### 3. 类型定义设计

#### **核心类型定义**

**DiscoverParams 接口**：
定义了所有可能的筛选参数，包括基础参数、分类筛选、评分筛选、日期筛选、语言筛选、地区筛选等。

**响应类型**：
- `DiscoverResponse<T>`：通用响应类型
- `MovieDiscoverResponse`：电影响应类型
- `TvShowDiscoverResponse`：电视剧响应类型

**排序选项类型**：
- `SortOption`：排序选项接口
- `MOVIE_SORT_OPTIONS`：电影排序选项
- `TV_SORT_OPTIONS`：电视剧排序选项

#### **筛选器类型**

**FilterOption**：筛选选项接口，包含值、标签和可选的数量
**FilterGroup**：筛选器组接口，支持多种筛选器类型
**FilterState**：筛选器状态接口，用于管理筛选条件

### 4. 筛选条件对比

#### **共同支持的筛选条件**

电影和电视剧都支持的筛选条件包括：
- 基础参数：页码、排序方式
- 分类筛选：包含/排除分类
- 评分筛选：评分范围、投票数
- 语言筛选：原始语言
- 关键词筛选：包含/排除关键词
- 公司筛选：制作公司
- 人员筛选：演职人员
- 成人内容：是否包含成人内容

#### **电影专用筛选条件**

电影特有的筛选条件包括：
- **日期筛选**：首映日期、上映日期
- **地区筛选**：指定地区，影响上映日期
- **上映类型**：首映、影院上映、数字发行等
- **时长筛选**：最短和最长时长
- **认证筛选**：不同国家的认证等级
- **年份筛选**：发行年份
- **视频内容**：是否包含视频

#### **电视剧专用筛选条件**

电视剧特有的筛选条件包括：
- **日期筛选**：首播日期、播出日期
- **原产国筛选**：电视剧的原产国
- **播出状态**：正在播出、计划中、制作中等
- **类型筛选**：剧本剧、纪录片、新闻等
- **网络筛选**：播出网络

### 5. API 使用示例

#### **基础使用**

**获取热门电影**：
```javascript
const popularMovies = discoverMedia('movie', {
  sort_by: 'popularity.desc',
  page: 1
})
```

**获取高分电视剧**：
```javascript
const highRatedTvShows = discoverMedia('tv', {
  'vote_average.gte': 8.0,
  'vote_count.gte': 100,
  sort_by: 'vote_average.desc',
  page: 1
})
```

#### **复杂筛选**

**获取2023年评分7分以上的动作电影**：
```javascript
const actionMovies = discoverMedia('movie', {
  with_genres: '28', // 动作片
  'vote_average.gte': 7.0,
  'primary_release_date.gte': '2023-01-01',
  'primary_release_date.lte': '2023-12-31',
  sort_by: 'vote_average.desc',
  page: 1
})
```

**获取正在播出的高分电视剧**：
```javascript
const onAirTvShows = discoverMedia('tv', {
  with_status: '0', // 正在播出
  'vote_average.gte': 8.0,
  'vote_count.gte': 100,
  sort_by: 'vote_average.desc',
  page: 1
})
```

#### **便捷方法使用**

**获取特定分类的电影**：
```javascript
const actionMovies = getMoviesByGenre(28, 1, {
  'vote_average.gte': 7.0,
  sort_by: 'popularity.desc'
})
```

**获取高分电影**：
```javascript
const highRatedMovies = getHighRatedMovies(1, 8.0)
```

### 6. 错误处理和优化

#### **错误处理策略**

1. **参数验证**：在发送请求前验证参数的有效性
2. **类型检查**：使用 TypeScript 确保类型安全
3. **错误响应**：处理 API 限制和错误响应
4. **重试机制**：对网络错误进行重试

#### **性能优化**

1. **缓存策略**：对分类、公司等静态数据进行缓存
2. **分页加载**：支持大量数据的分页显示
3. **按需加载**：只在需要时获取数据
4. **请求合并**：合并相似的请求减少 API 调用

#### **用户体验优化**

1. **加载状态**：提供加载指示器
2. **错误提示**：友好的错误信息
3. **空状态处理**：无结果时的友好提示
4. **实时预览**：筛选条件的实时预览

### 7. 扩展性设计

#### **新筛选条件支持**

API 设计支持轻松添加新的筛选条件：
- 在 `DiscoverParams` 接口中添加新参数
- 在筛选器组件中添加对应的 UI 控件
- 在参数转换逻辑中处理新参数

#### **新排序方式支持**

支持添加新的排序方式：
- 在排序选项中添加新的排序方式
- 确保 TMDB API 支持该排序方式
- 更新排序选项的类型定义

#### **新媒体类型支持**

设计支持扩展到其他媒体类型：
- 通用的 `discoverMedia` 接口
- 类型安全的参数处理
- 可扩展的响应类型

### 8. 总结

我们的 API 接口设计具有以下特点：

**完整性**：支持 TMDB Discover API 的所有功能
**类型安全**：完整的 TypeScript 类型定义
**易用性**：提供便捷方法和清晰的接口
**可扩展性**：支持新功能和媒体类型
**性能优化**：内置缓存和错误处理
**用户友好**：良好的错误处理和加载状态

这种设计确保了 discover 页面能够提供强大而灵活的筛选功能，同时保持良好的用户体验和代码可维护性。

## 用户体验设计

### 1. 筛选流程
1. **进入页面** - 根据 URL 参数或默认值初始化筛选条件
2. **调整筛选** - 用户修改筛选条件，实时显示变化状态
3. **应用筛选** - 点击应用按钮，更新 URL 并重新获取数据
4. **重置筛选** - 一键重置所有筛选条件

### 2. 视觉反馈
- **筛选变化** - 应用按钮高亮显示
- **加载状态** - 骨架屏和加载动画
- **空状态** - 无结果时的友好提示
- **错误状态** - 加载失败时的重试选项

### 3. 交互优化
- **防抖处理** - 避免频繁的 API 请求
- **缓存机制** - 缓存筛选结果
- **渐进增强** - 支持无 JavaScript 的基础功能

## 页面跳转和导航设计

### 1. 页面间跳转关系

#### **主要跳转路径**
```
首页 (/)
├── 发现页面 (/discover/movie, /discover/tv)
│   ├── 详情页 (/movie/[id], /tv/[id])
│   │   ├── 演职员页 (/movie/[id]/credits, /tv/[id]/credits)
│   │   ├── 图片集页 (/movie/[id]/gallery, /tv/[id]/gallery)
│   │   └── 相似内容 (跳转到其他详情页)
│   └── 演员卡片 → 演员详情页 (/actors/[id])
├── 搜索页面 (/search)
│   ├── 搜索结果 → 详情页
│   └── 演员结果 → 演员详情页
└── 演员页面 (/actors)
    └── 演员详情页 (/actors/[id])
        └── 作品列表 → 详情页
```

#### **导航层级结构**
```
Level 1: 主导航 (Header)
├── 首页
├── 电影 (下拉菜单)
│   ├── 最新电影 → /discover/movie
│   ├── 热门电影 → /discover/movie?sort_by=popularity.desc
│   ├── 即将上映 → /discover/movie?sort_by=release_date.asc
│   ├── 正在上映 → /discover/movie?sort_by=release_date.desc
│   └── 高分电影 → /discover/movie?sort_by=vote_average.desc&vote_average.gte=7
├── 电视剧 (下拉菜单)
│   ├── 最新剧集 → /discover/tv
│   ├── 热门剧集 → /discover/tv?sort_by=popularity.desc
│   ├── 正在播出 → /discover/tv?with_status=0
│   ├── 高分剧集 → /discover/tv?sort_by=vote_average.desc&vote_average.gte=7
│   └── 今日播出 → /discover/tv?air_date.gte=${today}&air_date.lte=${today}
├── 演员 → /actors
└── 搜索 → /search

Level 2: 发现页面内部导航
├── 筛选条件变化 → 更新 URL 参数
├── 分页跳转 → 保持筛选条件
├── 视图切换 → 本地状态
└── 媒体卡片点击 → 详情页

Level 3: 详情页内部导航
├── 返回按钮 → 来源页面
├── 演职员链接 → 演职员页
├── 图片集链接 → 图片集页
├── 相似内容 → 其他详情页
└── 演员头像 → 演员详情页
```

### 2. 组件跳转设计

#### **MediaCard 组件跳转**
```javascript
// 跳转到详情页
const navigateToDetail = () => {
  const route = props.isMovie ? `/movie/${props.item.id}` : `/tv/${props.item.id}`
  navigateTo(route)
}
```

#### **MediaListItem 组件跳转**
```javascript
// 跳转到详情页
const navigateToDetail = () => {
  const mediaType = props.isMovie ? 'movie' : 'tv'
  navigateTo(`/${mediaType}/${props.item.id}`)
}
```

#### **MediaPersonCard 组件跳转**
```javascript
// 跳转到演员详情页
const navigateToDetail = () => {
  navigateTo(`/actors/${props.person.id}`)
}
```

#### **MediaPageHeader 组件返回**
```vue
<NuxtLink 
  :to="backTo"
  class="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium mb-6 transition-all duration-200 backdrop-blur-sm group"
>
  <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
  </svg>
  返回详情
</NuxtLink>
```

### 3. 页面跳转实现

#### **发现页面内部跳转**
```javascript
// 页面跳转处理
const changePage = (page) => {
  if (page < 1 || page > (list.value?.data.value?.total_pages || 1)) return
  
  // 构建新的查询参数，保持筛选条件
  const filterQuery = filtersToQuery(filters.value)
  const newQuery = { ...filterQuery }
  
  if (page === 1) {
    // 第1页时移除 page 参数
    delete newQuery.page
  } else {
    // 其他页面添加 page 参数
    newQuery.page = page
  }
  
  // 导航到新页面
  navigateTo({
    query: newQuery
  }, { replace: true })
}

// 应用筛选
const applyFilters = async () => {
  // 更新初始状态
  initialFilters.value = JSON.parse(JSON.stringify(filters.value))
  
  // 构建新的查询参数
  const filterQuery = filtersToQuery(filters.value)
  const newQuery = { ...filterQuery }
  
  // 重置到第一页
  delete newQuery.page
  
  navigateTo({
    query: newQuery
  }, { replace: true })
}
```

#### **搜索页面跳转**
```javascript
// 处理页面跳转
const handlePageChange = (page) => {
  if (page < 1 || page > totalPages.value) return
  
  const newQuery = { ...route.query }
  
  if (page === 1) {
    delete newQuery.page
  } else {
    newQuery.page = page
  }
  
  navigateTo({
    query: newQuery
  }, { replace: true })
}
```

#### **演员页面跳转**
```javascript
// 页面跳转处理
const handlePageChange = (page) => {
  if (page < 1 || page > (actors.value?.data.value?.total_pages || 1)) return
  
  // 更新 URL 参数
  const newQuery = { ...route.query }
  
  if (page === 1) {
    delete newQuery.page
  } else {
    newQuery.page = page
  }
  
  // 导航到新页面
  navigateTo({
    query: newQuery
  }, { replace: true })
}

// 导航到演员详情页
const navigateToActor = (actorId) => {
  navigateTo(`/actors/${actorId}`)
}
```

### 4. 页面状态保持

#### **URL 参数保持**
```javascript
// 保持筛选条件在 URL 中
const filtersToQuery = (filters) => {
  const query = {}
  
  // 只添加非默认值的参数
  if (filters.sort_by !== defaultSort) {
    query.sort_by = filters.sort_by
  }
  
  if (filters.with_genres.length > 0) {
    query.with_genres = filters.with_genres.join(',')
  }
  
  if (filters['vote_average.gte'] > 0) {
    query['vote_average.gte'] = filters['vote_average.gte']
  }
  
  // ... 其他参数转换
  return query
}
```

#### **页面状态恢复**
```javascript
// 从 URL 参数恢复页面状态
const getInitialFilters = () => {
  return {
    sort_by: route.query.sort_by || defaultSort,
    with_genres: route.query.with_genres ? route.query.with_genres.split(',').map(Number) : [],
    'vote_average.gte': route.query['vote_average.gte'] ? parseFloat(route.query['vote_average.gte']) : 0,
    // ... 其他参数恢复
  }
}
```

### 5. 移动端导航优化

#### **移动端菜单**
```vue
<!-- 移动端菜单 -->
<div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 py-4">
  <div class="space-y-4">
    <!-- 移动端搜索框 -->
    <div class="px-3">
      <SearchBox
        v-model="mobileSearchQuery"
        placeholder="搜索..."
        :show-search-button="false"
        @search="handleMobileSearch"
      />
    </div>

    <!-- 移动端导航链接 -->
    <div class="space-y-2">
      <NuxtLink to="/" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">首页</NuxtLink>
      <NuxtLink to="/discover/movie" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">电影</NuxtLink>
      <NuxtLink to="/discover/tv" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">电视剧</NuxtLink>
      <NuxtLink to="/actors" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">演员</NuxtLink>
      <NuxtLink to="/search" class="block py-2 text-gray-700 hover:text-red-600 transition-colors">搜索</NuxtLink>
    </div>
  </div>
</div>
```

### 6. 错误处理

#### **404 页面处理**
```javascript
// 处理不存在的媒体
if (!detail.data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${mediaTypeText.value}不存在`
  })
}
```

#### **错误边界**
```vue
<template>
  <div v-if="error" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-red-600 text-6xl mb-4">😞</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">页面加载失败</h2>
      <p class="text-gray-600 mb-4">{{ error.message }}</p>
      <button 
        @click="handleError"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        重新加载
      </button>
    </div>
  </div>
</template>
```

## 技术实现

### 1. 组件结构
```
pages/discover/[type].vue
├── 页面头部 (动态标题、筛选按钮)
├── 筛选侧边栏 (各种筛选控件)
├── 主要内容区域 (结果展示、分页)
└── 吸顶按钮 (应用筛选)
```

### 2. 关键方法
```javascript
// 初始化筛选条件
const getInitialFilters = () => { /* ... */ }

// 应用筛选
const applyFilters = async () => { /* ... */ }

// 重置筛选
const resetFilters = () => { /* ... */ }

// 获取数据
const fetchData = async () => { /* ... */ }

// 页面跳转
const changePage = (page) => { /* ... */ }
```

### 3. 计算属性
```javascript
// 排序选项
const sortOptions = computed(() => {
  return type === 'movie' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS
})

// 页面标题
const pageTitle = computed(() => {
  // 根据筛选条件生成动态标题
})

// 分类数据
const genres = computed(() => {
  return type === 'movie' ? genreStore.movieGenres : genreStore.tvGenres
})
```

## 性能优化

### 1. 数据获取
- **按需加载** - 只在需要时获取数据
- **分页加载** - 支持大量数据的分页显示
- **缓存策略** - 缓存分类数据和筛选结果

### 2. 渲染优化
- **虚拟滚动** - 大量数据时的性能优化
- **懒加载** - 图片和组件的懒加载
- **防抖处理** - 用户输入时的性能优化

### 3. 内存管理
- **组件卸载** - 及时清理监听器和定时器
- **数据清理** - 避免内存泄漏
- **缓存清理** - 定期清理过期缓存

## 扩展性设计

### 1. 新筛选条件
- **评分范围** - 支持最高评分筛选
- **时长筛选** - 支持电影时长范围
- **关键词筛选** - 支持关键词搜索
- **演员筛选** - 支持特定演员筛选

### 2. 新排序方式
- **票房排序** - 按票房收入排序
- **收藏排序** - 按收藏数量排序
- **评论排序** - 按评论数量排序

### 3. 新视图模式
- **时间线视图** - 按时间线展示
- **地图视图** - 按地区展示
- **网络视图** - 按关联关系展示


## 总结

Discover 页面是一个功能强大且复杂的页面，通过合理的架构设计和用户体验优化，为用户提供了优秀的电影和电视剧发现体验。该页面的设计充分考虑了可扩展性、性能和可维护性，为后续功能扩展奠定了良好的基础。 