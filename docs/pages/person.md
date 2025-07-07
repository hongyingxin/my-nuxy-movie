# 演员模块设计文档

## 🎭 **演员相关 API 接口**

基于 [TMDB API 文档](https://developer.themoviedb.org/reference/intro/getting-started)，演员模块可以使用以下 API 接口：

### **1. 演员详情 (People)**
- **GET /person/{person_id}** - 获取演员基本信息
- **GET /person/{person_id}/images** - 获取演员照片
- **GET /person/{person_id}/external_ids** - 获取演员外部ID（IMDB等）

### **2. 演员作品 (Credits)**
- **GET /person/{person_id}/combined_credits** - 获取演员所有作品（电影+电视剧）
- **GET /person/{person_id}/movie_credits** - 获取演员电影作品
- **GET /person/{person_id}/tv_credits** - 获取演员电视剧作品

### **3. 演员列表**
- **GET /person/popular** - 获取热门演员列表

### **4. 从电影/电视剧获取演员**
- **GET /movie/{movie_id}/credits** - 获取电影演员表
- **GET /tv/{tv_id}/credits** - 获取电视剧演员表

## 🎯 **演员模块功能构思**

### **1. 演员详情页**
```
/actor/{id}
```
**功能特性：**
- 演员基本信息（姓名、生日、出生地、简介等）
- 演员照片画廊
- 作品时间线（按年份排序）
- 热门作品展示
- 社交媒体链接

### **2. 演员列表页**
```
/actors
```
**功能特性：**
- 热门演员排行榜
- 按字母排序浏览
- 搜索功能
- 分页加载

### **3. 演员搜索页**
```
/search/actor
```
**功能特性：**
- 实时搜索
- 搜索结果高亮
- 搜索历史记录

### **4. 演员作品页**
```
/actor/{id}/works
```
**功能特性：**
- 电影作品列表
- 电视剧作品列表
- 按年份/类型筛选
- 作品评分和角色信息

## 📊 **数据结构分析**

### **演员基本信息**
```json
{
  "id": 123,
  "name": "演员姓名",
  "birthday": "1980-01-01",
  "deathday": null,
  "place_of_birth": "出生地",
  "biography": "演员简介",
  "profile_path": "/path/to/image.jpg",
  "known_for_department": "Acting",
  "popularity": 123.45
}
```

### **演员作品**
```json
{
  "cast": [
    {
      "id": 123,
      "title": "电影名称",
      "character": "角色名",
      "release_date": "2023-01-01",
      "vote_average": 8.5,
      "poster_path": "/path/to/poster.jpg"
    }
  ],
  "crew": [
    {
      "id": 456,
      "title": "电影名称",
      "job": "导演",
      "department": "Directing"
    }
  ]
}
```

## 🎨 **UI/UX 设计构思**

### **演员详情页布局**
1. **Hero 区域**：演员照片 + 基本信息
2. **作品时间线**：按年份展示作品
3. **热门作品**：评分最高的作品展示
4. **照片画廊**：演员生活照和剧照
5. **相关演员**：合作过的演员推荐

### **演员列表页布局**
1. **筛选栏**：按字母、性别、年龄筛选
2. **网格布局**：演员头像 + 姓名 + 代表作
3. **无限滚动**：分页加载更多演员

### **搜索功能**
1. **实时搜索**：输入时即时显示结果
2. **搜索建议**：热门搜索词
3. **结果高亮**：匹配的文本高亮显示

## ⚡ **技术实现考虑**

### **API 调用策略**
- 使用 `useInfiniteScroll` 实现演员列表分页
- 缓存演员详情数据，避免重复请求
- 图片懒加载优化性能

### **数据管理**
- 创建演员相关的 API 函数
- 使用 Pinia 管理演员状态
- 实现演员数据的本地缓存

### **性能优化**
- 演员照片使用不同尺寸
- 实现虚拟滚动（如果演员列表很长）
- 预加载热门演员数据

## 🚀 **开发计划**

### **第一阶段：基础功能** ✅
1. ✅ 创建演员详情页 (`/actor/{id}`)
2. ✅ 实现演员基本信息展示
3. ✅ 添加演员作品列表
4. ✅ 创建演员列表页 (`/actors`)
5. ✅ 实现热门演员列表展示
6. ✅ 添加无限滚动加载功能

### **第二阶段：增强功能**
1. 实现演员照片画廊
2. 添加作品时间线
3. 实现相关演员推荐

### **第三阶段：列表和搜索**
1. ✅ 创建演员列表页 (`/actors`)
2. 实现演员搜索功能
3. 添加筛选和排序功能

### **第四阶段：优化和完善**
1. 性能优化
2. 用户体验改进
3. 错误处理和边界情况

## 📝 **API 函数设计**

### **演员详情相关**
```typescript
// 获取演员基本信息
export function getPersonDetail(personId: number) {
  return useHttp({
    url: `/person/${personId}`,
    method: 'GET'
  })
}

// 获取演员照片
export function getPersonImages(personId: number) {
  return useHttp({
    url: `/person/${personId}/images`,
    method: 'GET'
  })
}

// 获取演员作品
export function getPersonCredits(personId: number) {
  return useHttp({
    url: `/person/${personId}/combined_credits`,
    method: 'GET'
  })
}
```

### **演员列表相关**
```typescript
// 获取热门演员
export function getPopularPeople(page: number = 1) {
  return useHttp({
    url: '/person/popular',
    method: 'GET',
    params: { page }
  })
}

// 搜索演员
export function searchPeople(query: string, page: number = 1) {
  return useHttp({
    url: '/search/person',
    method: 'GET',
    params: { query, page }
  })
}
```

## 🎯 **页面路由设计**

```typescript
// 演员相关路由
{
  path: '/actor/:id',
  component: () => import('~/pages/actor/[id].vue'),
  name: 'actor-detail'
},
{
  path: '/actors',
  component: () => import('~/pages/actors/index.vue'),
  name: 'actors-list'
},
{
  path: '/search/actor',
  component: () => import('~/pages/search/actor.vue'),
  name: 'actor-search'
}
```

## 📱 **响应式设计考虑**

### **移动端优化**
- 演员列表使用单列布局
- 详情页信息垂直排列
- 照片画廊支持滑动浏览

### **桌面端优化**
- 演员列表使用多列网格
- 详情页信息水平布局
- 照片画廊支持缩略图预览

### **平板端优化**
- 演员列表使用双列布局
- 详情页信息混合布局
- 照片画廊支持触摸操作

## 🔍 **SEO 优化**

### **页面标题和描述**
- 演员详情页：`{演员姓名} - 演员详情 - Nuxt Movie`
- 演员列表页：`热门演员 - Nuxt Movie`
- 演员搜索页：`搜索演员 - Nuxt Movie`

### **结构化数据**
- 使用 JSON-LD 标记演员信息
- 包含演员作品和评分信息
- 添加面包屑导航标记

### **图片优化**
- 演员照片使用合适的尺寸
- 添加 alt 属性描述
- 实现图片懒加载

## 🎨 **设计系统集成**

### **组件复用**
- 使用现有的 `MediaCard` 组件展示作品
- 复用 `MediaPageHeader` 组件
- 使用 `useInfiniteScroll` 实现分页

### **样式一致性**
- 遵循现有的颜色主题
- 使用统一的间距和字体
- 保持交互效果一致性

### **图标和插图**
- 使用统一的图标系统
- 添加适当的加载状态
- 设计空状态插图 