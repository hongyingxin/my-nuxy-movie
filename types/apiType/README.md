# API 类型定义

本项目在 `types/apiType/` 目录下提供了完整的 TMDB API 类型定义，按功能模块进行分类组织。

## 📁 目录结构

```
types/apiType/
├── common.ts          # 通用类型定义
├── movie.ts           # 电影相关类型
├── tv.ts              # 电视剧相关类型
├── person.ts          # 演员相关类型
├── discover.ts        # 发现页相关类型
├── genre.ts           # 分类相关类型
├── trending.ts        # 趋势内容相关类型
├── search.ts          # 搜索相关类型
├── index.ts           # 统一导出入口
└── README.md          # 使用说明
```

## 🚀 快速开始

### 导入类型

```typescript
// 导入所有类型
import type { MovieItem, TvShowItem, PersonItem } from '~/types/apiType'

// 导入特定模块类型
import type { MovieDetail, MoviePaginatedResponse } from '~/types/apiType/movie'
import type { DiscoverParams, SortOption } from '~/types/apiType/discover'
```

### 在 API 函数中使用

```typescript
// api/movie.ts
import type { MoviePaginatedResponse, MovieDetail } from '~/types/apiType'

export const getPopularMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/popular',
    method: 'GET',
    params: { page }
  })
}

export const getMovieDetail = (id: number) => {
  return useHttp<MovieDetail>({
    url: `/movie/${id}`,
    method: 'GET'
  })
}
```

### 在组件中使用

```vue
<script setup lang="ts">
import type { MovieItem, TvShowItem } from '~/types/apiType'

interface Props {
  movies: MovieItem[]
  tvShows: TvShowItem[]
}

defineProps<Props>()
</script>
```

## 📋 类型分类

### 1. 通用类型 (`common.ts`)

基础类型定义，包含所有模块共用的类型：

- `MediaType` - 媒体类型 ('movie' | 'tv')
- `BaseMediaItem` - 基础媒体项目
- `MovieItem` / `TvShowItem` / `PersonItem` - 具体媒体项目
- `PaginatedResponse<T>` - 分页响应
- `CreditsResponse` - 演职员信息
- `VideosResponse` / `ImagesResponse` - 视频和图片
- 各种辅助类型

### 2. 电影类型 (`movie.ts`)

电影相关的详细类型：

- `MovieDetail` - 电影详情
- `MoviePaginatedResponse` - 电影分页响应
- `MovieSearchResult` - 电影搜索结果
- `MovieRatingRequest` - 电影评分请求
- 各种电影列表响应类型

### 3. 电视剧类型 (`tv.ts`)

电视剧相关的详细类型：

- `TvShowDetail` - 电视剧详情
- `TvShowPaginatedResponse` - 电视剧分页响应
- `SeasonDetail` / `EpisodeDetail` - 季数和集数详情
- `TvShowSearchResult` - 电视剧搜索结果
- 各种电视剧列表响应类型

### 4. 演员类型 (`person.ts`)

演员相关的详细类型：

- `PersonDetail` - 演员详情
- `PersonCreditsResponse` - 演员作品
- `PersonSearchResult` - 演员搜索结果
- `PersonTaggedImage` - 演员标签图片
- 各种演员作品类型

### 5. 发现页类型 (`discover.ts`)

发现页筛选和排序相关类型：

- `DiscoverParams` - 发现页筛选参数
- `SortOption` - 排序选项
- `FilterOption` / `FilterGroup` - 筛选器选项
- 各种便捷方法参数类型

### 6. 分类类型 (`genre.ts`)

分类相关的类型：

- `Genre` - 分类基础类型
- `GenreResponse` - 分类响应
- `GenreMap` - 分类映射
- `GenreFilterOption` - 分类筛选选项

### 7. 趋势内容类型 (`trending.ts`)

趋势内容相关类型：

- `TrendingItem` - 趋势内容项目
- `TrendingResponse` - 趋势内容响应
- `TrendingTimeWindow` - 时间窗口
- `TrendingCategory` - 趋势分类

### 8. 搜索类型 (`search.ts`)

搜索相关类型：

- `SearchParams` - 搜索参数
- `SearchResult` - 搜索结果
- `SearchSuggestion` - 搜索建议
- `SearchHistory` - 搜索历史

## 🛠️ 工具类型

在 `index.ts` 中提供了一些有用的工具类型：

```typescript
// 提取响应类型中的项目类型
type MovieItems = ExtractItemType<MoviePaginatedResponse>

// 创建可选字段类型
type OptionalMovie = MakeOptional<MovieItem, 'overview' | 'poster_path'>

// 创建必需字段类型
type RequiredMovie = MakeRequired<MovieItem, 'id' | 'title'>

// 创建只读字段类型
type ReadonlyMovie = MakeReadonly<MovieItem, 'id'>
```

## 🔧 最佳实践

### 1. 类型安全

```typescript
// ✅ 推荐：使用具体类型
const movies = ref<MovieItem[]>([])
const movieDetail = ref<MovieDetail | null>(null)

// ❌ 避免：使用 any
const movies = ref<any[]>([])
```

### 2. 响应类型

```typescript
// ✅ 推荐：为 API 函数指定返回类型
export const getMovies = () => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/popular',
    method: 'GET'
  })
}
```

### 3. 组件 Props

```typescript
// ✅ 推荐：使用类型定义 Props
interface Props {
  movie: MovieItem
  loading?: boolean
}

defineProps<Props>()
```

### 4. 事件处理

```typescript
// ✅ 推荐：为事件处理器指定类型
const handleMovieClick = (movie: MovieItem) => {
  navigateTo(`/movie/${movie.id}`)
}
```

## 📝 扩展类型

如果需要添加新的类型定义：

1. 在对应的模块文件中添加类型
2. 在 `index.ts` 中导出新类型
3. 更新此文档说明新类型的用途

## 🔗 相关链接

- [TMDB API 文档](https://developer.themoviedb.org/docs)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Vue 3 TypeScript 支持](https://vuejs.org/guide/typescript/overview.html) 