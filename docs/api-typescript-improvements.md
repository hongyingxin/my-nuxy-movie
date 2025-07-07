 # API TypeScript 类型完善

本文档记录了为项目 API 函数添加完整 TypeScript 类型定义的改进。

## 🎯 改进目标

- 为所有 API 函数添加完整的 TypeScript 类型定义
- 提高代码的类型安全性和开发体验
- 统一使用项目中已定义的类型
- 添加详细的 JSDoc 注释

## 📋 改进内容

### 1. 电影 API (`api/movie.ts`)

**改进前：**
```typescript
export const getPopularMovies = (page = 1) => {
  return useHttp({
    url: '/movie/popular',
    method: 'GET',
    params: { page }
  })
}
```

**改进后：**
```typescript
import type { MoviePaginatedResponse } from '~/types/apiType'

/**
 * 获取热门电影
 * @param page 页码，默认1
 * @returns 热门电影列表
 */
export const getPopularMovies = (page = 1) => {
  return useHttp<MoviePaginatedResponse>({
    url: '/movie/popular',
    method: 'GET',
    params: { page }
  })
}
```

**类型覆盖：**
- `MoviePaginatedResponse` - 电影分页响应
- `MovieDetail` - 电影详情
- `MovieSearchResponse` - 电影搜索结果
- `CreditsResponse` - 演职员信息
- `VideosResponse` - 视频列表
- `ImagesResponse` - 图片列表
- `MovieRatingResponse` - 评分响应

### 2. 电视剧 API (`api/tv.ts`)

**类型覆盖：**
- `TvShowPaginatedResponse` - 电视剧分页响应
- `TvShowDetail` - 电视剧详情
- `TvShowSearchResponse` - 电视剧搜索结果
- `SeasonResponse` - 季详情
- `EpisodeResponse` - 集详情

### 3. 演员 API (`api/person.ts`)

**类型覆盖：**
- `PersonDetail` - 演员详情
- `PersonImagesResponse` - 演员图片
- `PersonCreditsResponse` - 演员作品
- `PersonMovieCreditsResponse` - 演员电影作品
- `PersonTvCreditsResponse` - 演员电视剧作品
- `ExternalIds` - 外部ID
- `PersonPaginatedResponse` - 演员分页响应
- `PersonSearchResponse` - 演员搜索结果

### 4. 发现页 API (`api/discover.ts`)

**类型覆盖：**
- `DiscoverParams` - 发现页筛选参数
- `MovieDiscoverResponse` - 电影发现响应
- `TvShowDiscoverResponse` - 电视剧发现响应
- `MediaType` - 媒体类型

**新增功能：**
- 添加了详细的排序选项描述
- 统一了参数类型定义

### 5. 分类 API (`api/genre.ts`)

**类型覆盖：**
- `MovieGenreResponse` - 电影分类响应
- `TvGenreResponse` - 电视剧分类响应
- `MovieDiscoverResponse` - 电影发现响应
- `TvShowDiscoverResponse` - 电视剧发现响应

### 6. 趋势内容 API (`api/trending.ts`)

**类型覆盖：**
- `TrendingResponse` - 趋势内容响应
- `TrendingParams` - 趋势内容参数
- `TrendingMediaType` - 趋势媒体类型
- `TrendingTimeWindow` - 趋势时间窗口

**新增功能：**
- 添加了通用的 `getTrending` 函数
- 支持指定媒体类型和时间窗口

### 7. 详情页 API (`api/detail.ts`)

**类型覆盖：**
- `MediaType` - 媒体类型
- `MovieDetail | TvShowDetail` - 媒体详情
- `CreditsResponse` - 演职员信息
- `VideosResponse` - 视频列表
- `ImagesResponse` - 图片列表
- `MoviePaginatedResponse | TvShowPaginatedResponse` - 分页响应
- `MovieSearchResponse | TvShowSearchResponse` - 搜索结果
- `MovieRatingResponse` - 评分响应

## 🚀 改进效果

### 1. 类型安全
- 所有 API 函数都有明确的返回类型
- 参数类型得到严格检查
- 编译时错误检测

### 2. 开发体验
- 完整的 IntelliSense 支持
- 详细的 JSDoc 注释
- 统一的类型导入

### 3. 代码质量
- 消除了重复的类型定义
- 统一使用项目中的类型
- 提高了代码可维护性

### 4. 错误预防
- 编译时类型检查
- 运行时类型安全
- 更好的错误提示

## 📝 使用示例

### 在组件中使用

```vue
<script setup lang="ts">
import { getPopularMovies } from '~/api/movie'
import type { MovieItem } from '~/types/apiType'

const { data: movies } = await getPopularMovies(1)
const movieList = computed(() => movies.value?.results || [])
</script>
```

### 在页面中使用

```vue
<script setup lang="ts">
import { getMovieDetail } from '~/api/movie'
import type { MovieDetail } from '~/types/apiType'

const route = useRoute()
const { data: movie } = await getMovieDetail(Number(route.params.id))
</script>
```

### 在组合式函数中使用

```typescript
export const useMovieSearch = () => {
  const searchMovies = async (query: string, page = 1) => {
    const { data } = await getMoviesByQuery(query, page)
    return data.value
  }
  
  return { searchMovies }
}
```

## 🔧 最佳实践

### 1. 类型导入
```typescript
// ✅ 推荐：从统一入口导入
import type { MovieItem, TvShowItem } from '~/types/apiType'

// ❌ 避免：直接导入具体文件
import type { MovieItem } from '~/types/apiType/movie'
```

### 2. 函数注释
```typescript
/**
 * 获取热门电影
 * @param page 页码，默认1
 * @returns 热门电影列表
 */
export const getPopularMovies = (page = 1) => {
  // ...
}
```

### 3. 错误处理
```typescript
export const rateMovie = (id: number, rating: number) => {
  if (rating < 0.5 || rating > 10) {
    throw new Error('Rating must be between 0.5 and 10')
  }
  // ...
}
```

## 📚 相关文档

- [API 类型定义](./types/apiType/README.md)
- [通用模式和最佳实践](./common-patterns.md)
- [代码规范](./code-standards.md)