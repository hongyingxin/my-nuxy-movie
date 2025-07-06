# 组件目录结构

本目录包含按功能和用途组织的所有 Vue 组件。

## 目录结构

```
components/
├── layout/          # 布局组件 (头部、底部、导航)
├── ui/              # 可复用的 UI 组件 (按钮、评分、表单)
├── media/           # 媒体相关组件 (卡片、播放器、画廊)
├── skeleton/        # 骨架屏组件 (加载状态)
├── common/          # 通用/共享组件
└── README.md        # 本文件
```

## 组件分类

### 📐 布局组件 (`layout/`)
定义整体页面结构和布局的组件。

- **AppHeader.vue** - 主导航头部，包含 logo、菜单和搜索
- **AppFooter.vue** - 网站底部，包含链接、社交媒体和版权信息

### 🎨 UI 组件 (`ui/`)
可在整个应用程序中使用的可复用用户界面组件。

- **MovieRating.vue** - 带百分比的圆形评分显示
- **Button.vue** - 可复用按钮组件 (未来)
- **Modal.vue** - 模态框/对话框组件 (未来)
- **Loading.vue** - 加载旋转器组件 (未来)

### 🎬 媒体组件 (`media/`)
专门与媒体内容相关的组件 (电影、电视剧等)。

- **MediaCard.vue** - 电影/电视剧卡片，包含海报、标题和评分
- **MediaListItem.vue** - 媒体列表项，用于列表视图显示
- **MediaRating.vue** - 媒体评分组件
- **MediaPageHeader.vue** - 媒体页面头部组件
- **MediaGrid.vue** - 媒体卡片网格布局 (未来)
- **MediaPlayer.vue** - 视频播放器组件 (未来)
- **MediaGallery.vue** - 图片画廊组件 (未来)

### ⚡ 骨架屏组件 (`skeleton/`)
用于显示加载状态的骨架屏组件。

- **SkeletonCard.vue** - 基础骨架卡片组件
- **SkeletonGrid.vue** - 网格布局骨架屏
- **SkeletonList.vue** - 列表布局骨架屏（用于演员、评论等）
- **SkeletonListItem.vue** - 媒体列表项骨架屏（用于媒体列表视图）
- **SkeletonLoadingState.vue** - 简单加载状态组件

### 🔧 通用组件 (`common/`)
不属于其他类别的共享组件。

- **Icon.vue** - 图标组件 (未来)
- **Tooltip.vue** - 工具提示组件 (未来)
- **Breadcrumb.vue** - 面包屑导航组件 (未来)

## 命名约定

- **布局组件**: `Layout[组件名]` (例如: `LayoutAppHeader`)
- **UI 组件**: `Ui[组件名]` (例如: `UiMovieRating`)
- **媒体组件**: `Media[组件名]` (例如: `MediaCard`)
- **骨架屏组件**: `Skeleton[组件名]` (例如: `SkeletonCard`)
- **通用组件**: `Common[组件名]` (例如: `CommonIcon`)

**Nuxt 3 自动导入规则:**
- 子目录中的组件会自动导入，目录名作为前缀
- `components/layout/AppHeader.vue` → `<LayoutAppHeader />`
- `components/ui/MovieRating.vue` → `<UiMovieRating />`
- `components/media/MediaCard.vue` → `<MediaCard />` (媒体目录无前缀)
- `components/skeleton/SkeletonCard.vue` → `<SkeletonCard />` (骨架屏目录无前缀)
- `components/common/Icon.vue` → `<CommonIcon />`

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
<LayoutAppHeader />
<LayoutAppFooter />

<!-- UI 组件 -->
<UiMovieRating :score="8.5" />

<!-- 媒体组件 -->
<MediaCard :item="movie" />
<MediaListItem :item="movie" :is-movie="true" />

<!-- 骨架屏组件 -->
<SkeletonGrid :count="12" variant="movie" />
<SkeletonLoadingState message="加载中..." />

<!-- 通用组件 -->
<CommonIcon name="star" />
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