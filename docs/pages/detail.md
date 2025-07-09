# 电影/电视剧详情页设计文档

## 📋 **概述**

基于 [TMDB F1电影详情页](https://www.themoviedb.org/movie/911430-f1-the-movie) 的设计，我们创建了一个通用的电影和电视剧详情页系统。

电影/电视剧详情页是应用的核心页面之一，提供完整的内容信息展示。采用动态路由设计，支持电影和电视剧两种类型，包含主详情页、演职员页和图片集页三个子页面。

**页面路径**:

- 主详情页: `/movie/[id]`、`/tv/[id]`
- 演职员页: `/movie/[id]/credits`、`/tv/[id]/credits`
- 图片集页: `/movie/[id]/gallery`、`/tv/[id]/gallery`

**文件位置**: `pages/[type]/[id]/`

## 🎨 **页面结构**

### **1. 主详情页 (`index.vue`)**

#### **Hero 区域**

- **背景图片**: 使用电影/电视剧的背景图片，带渐变遮罩
- **海报展示**: 左侧显示高清海报
- **基本信息**: 标题、年份、时长/季数、评分
- **分类标签**: 年龄分级、时长、类型标签
- **操作按钮**: 观看预告片、收藏

#### **主要内容区域 (左侧)**

- **简介**: 电影/电视剧的详细描述
- **演职员**: 主要演员和角色信息 (前8个)
- **媒体**: 剧照、海报、视频的标签页展示
- **相似内容**: 推荐相关电影/电视剧 (前6个)

#### **右侧边栏**

- **详细信息**: 状态、语言、制作公司等
- **评分展示**: 星级评分和评分人数
- **电影特有**: 预算、票房、关键词
- **电视剧特有**: 季数、集数、播出日期、季数详情

### **2. 演职员页 (`credits.vue`)**

#### **页面布局**

- **页面标题**: 使用 `MediaPageHeader` 组件
- **左侧区域**: 完整演员列表 (3列布局)
- **右侧区域**: 按部门分组的剧组成员 (1列布局)

#### **演员列表**

- **头像展示**: 演员头像和基本信息
- **角色信息**: 饰演角色和部门
- **交互功能**: 点击跳转到演员详情页

#### **剧组成员**

- **部门分组**: 制作、导演、编剧、音效等
- **职位信息**: 具体职位和工作内容
- **中文翻译**: 部门名称本地化显示

### **3. 图片集页 (`gallery.vue`)**

#### **页面布局**

- **页面标题**: 使用 `MediaPageHeader` 组件
- **分类标签**: 海报、剧照分类切换
- **瀑布流展示**: 响应式图片网格
- **无限滚动**: 自动加载更多图片

#### **PhotoSwipe 集成**

- **灯箱功能**: 点击图片全屏查看
- **手势支持**: 滑动切换、缩放等
- **键盘导航**: 支持键盘操作

## 🔧 **技术实现**

### **动态路由设计**

```javascript
// 路由参数
const route = useRoute()
const mediaType = route.params.type // 'movie' 或 'tv'
const mediaId = parseInt(route.params.id)

// 计算属性
const isTv = computed(() => mediaType === 'tv')
const mediaTypeText = computed(() => (isTv.value ? '电视剧' : '电影'))
```

### **API 数据获取**

**统一接口**: 使用 `/api/detail.ts` 中的通用API接口

```javascript
// 主要数据源
const detail = getDetail(mediaType, mediaId) // 基本信息
const credits = getCredits(mediaType, mediaId) // 演职员信息
const videos = getVideos(mediaType, mediaId) // 视频信息
const similar = getSimilar(mediaType, mediaId) // 相似内容
const images = getImages(mediaType, mediaId) // 图片信息
```

### **组件使用**

```vue
<!-- 页面标题组件 -->
<MediaPageHeader
  :backdrop_path="detail.data.value?.backdrop_path"
  :title="`${detail.data.value?.title || detail.data.value?.name} 的演职员`"
  :back-to="`/${mediaType}/${mediaId}`"
/>

<!-- 骨架屏组件 -->
<SkeletonLoadingState
  v-if="detail.pending.value"
  :message="`加载${mediaTypeText}详情中...`"
/>

<!-- 媒体卡片组件 -->
<MediaCard
  v-for="item in similar.data.value.results.slice(0, 6)"
  :key="item.id"
  :item="item"
  :is-movie="!isTv"
/>
```

### **媒体标签页系统**

```javascript
// 媒体标签页配置
const mediaTabs = [
  { id: 'backdrops', name: '剧照' },
  { id: 'posters', name: '海报' },
  { id: 'videos', name: '视频' },
]

// 标签页切换
const activeMediaTab = ref('backdrops')

// 获取媒体数量
const getMediaCount = type => {
  switch (type) {
    case 'backdrops':
      return images.data.value?.backdrops?.length || 0
    case 'posters':
      return images.data.value?.posters?.length || 0
    case 'videos':
      return videos.data.value?.results?.length || 0
    default:
      return 0
  }
}
```

## 🎯 **功能特性**

### **1. 响应式设计**

- **桌面端**: 3列布局，完整信息展示
- **平板端**: 2列布局，优化空间利用
- **移动端**: 单列布局，垂直堆叠

### **2. 加载状态管理**

- **骨架屏**: 数据加载时显示骨架屏
- **错误处理**: 优雅的错误状态展示
- **刷新功能**: 支持重新加载数据

### **3. 图片优化**

- **懒加载**: 使用 `loading="lazy"`
- **响应式图片**: 不同屏幕尺寸加载不同尺寸
- **占位符**: 图片加载失败时显示占位符

### **4. 交互体验**

- **悬停效果**: 卡片和按钮的悬停动画
- **平滑过渡**: CSS transition 动画
- **键盘支持**: 支持键盘导航

## 📱 **响应式适配**

### **移动端 (< 640px)**

- Hero 高度: 自适应
- 布局: 单列垂直堆叠
- 图片网格: 2列
- 文本大小: 较小尺寸

### **平板端 (640px - 1024px)**

- 布局: 2列布局
- 图片网格: 3列
- 文本大小: 中等尺寸

### **桌面端 (≥ 1024px)**

- 布局: 3列布局 (2:1)
- 图片网格: 4列
- 文本大小: 大尺寸
- 完整功能: 所有交互功能

## 🎨 **设计规范**

### 参考TMDB设计

- 大背景图片 + 渐变遮罩
- 海报 + 信息布局
- 评分星级展示
- 分类标签设计

### **颜色方案**

- **主色调**: 红色 (#DC2626)
- **背景色**: 浅灰色 (#F9FAFB)
- **文字色**: 深灰色 (#1F2937)
- **强调色**: 黄色 (#F59E0B)

### **间距规范**

- **页面边距**: 24px (移动端) / 32px (桌面端)
- **区域间距**: 32px (py-8)
- **卡片间距**: 16px (gap-4)
- **按钮间距**: 12px (gap-3)

### **字体规范**

- **主标题**: 24px / 32px (移动端/桌面端)
- **Hero 标题**: 36px / 60px
- **副标题**: 18px / 20px
- **正文**: 14px / 16px

## 🔄 **性能优化**

### **1. 数据优化**

- **并行请求**: 多个 API 同时请求
- **缓存策略**: 利用 Nuxt 的缓存机制
- **按需加载**: 只加载必要的数据

### **2. 图片优化**

- **懒加载**: 使用 `loading="lazy"`
- **响应式图片**: 不同屏幕尺寸加载不同尺寸
- **占位符**: 图片加载失败时显示占位符

### **3. 交互优化**

- **防抖处理**: 避免频繁的状态更新
- **平滑动画**: 使用 CSS transition
- **键盘支持**: 支持键盘导航

## 📝 **SEO 配置**

```javascript
// 动态 SEO 配置
useHead(() => ({
  title: detail.data.value
    ? `${detail.data.value.title || detail.data.value.name} - Nuxt Movie`
    : `${mediaTypeText.value}详情 - Nuxt Movie`,
  meta: [
    {
      name: 'description',
      content:
        detail.data.value?.overview || `发现精彩${mediaTypeText.value}详情`,
    },
  ],
}))
```

## 🚀 **扩展功能**

### **PhotoSwipe 灯箱**

```javascript
// 图片集页面的灯箱功能
import PhotoSwipeLightbox from 'photoswipe/lightbox'

// 初始化灯箱
const initPhotoSwipe = () => {
  lightbox = new PhotoSwipeLightbox({
    gallery: '.pswp-gallery',
    children: 'a',
    pswpModule: () => import('photoswipe'),
  })
  lightbox.init()
}
```

### **无限滚动**

```javascript
// 图片集页面的无限滚动
const {
  currentPage,
  isLoading,
  hasMore,
  observerTarget,
  loadMore,
  reset,
  setHasMore,
} = useInfiniteScroll(
  async page => {
    // 加载更多图片逻辑
  },
  computed(() => images.data.value?.[activeTab.value]?.length || 0),
  {
    pageSize: 20,
    rootMargin: '100px',
    threshold: [0, 0.1, 0.3, 0.5, 1.0],
  }
)
```

## 📋 **维护说明**

### **数据更新**

- 定期检查 API 数据质量
- 监控图片加载性能
- 确保演职员信息的准确性

### **性能监控**

- 监控页面加载速度
- 检查图片加载性能
- 优化 API 请求效率

### **用户体验**

- 收集用户反馈
- 优化交互流程
- 提升页面可用性

### **代码维护**

- 保持组件复用性
- 统一错误处理
- 优化代码结构
