# 骨架屏组件设计文档

## 概述

骨架屏（Skeleton Screen）是一种加载状态的UI模式，在数据加载时显示内容的大致轮廓，提供更好的用户体验。

## 设计目标

1. **提升用户体验**：减少用户等待时的焦虑感
2. **保持视觉连续性**：骨架屏与真实内容保持一致的布局
3. **可复用性**：在不同页面和场景中重复使用
4. **可配置性**：支持不同的变体和布局配置

## 架构设计

### 方案对比

#### 方案一：在 MediaCard 组件内部处理骨架屏
```vue
<!-- components/Media/Card.vue -->
<template>
  <div v-if="loading" class="animate-pulse">
    <!-- 骨架屏内容 -->
  </div>
  <div v-else>
    <!-- 正常卡片内容 -->
  </div>
</template>
```

**优点：**
- 组件职责单一，MediaCard 负责所有卡片相关的显示
- 使用简单，只需要传递 `loading` prop
- 骨架屏样式与真实卡片完全一致

**缺点：**
- MediaCard 组件变得复杂，需要处理两种状态
- 骨架屏逻辑与业务逻辑耦合
- 难以在不同场景下复用骨架屏

#### 方案二：独立的骨架屏组件（推荐）
```vue
<!-- 使用独立的骨架屏组件 -->
<SkeletonGrid v-if="loading" :count="12" variant="movie" />
<div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  <MediaCard v-for="item in items" :key="item.id" :item="item" />
</div>
```

**优点：**
- 关注点分离，骨架屏有独立的组件
- 高度可复用，可以在任何地方使用
- 更容易维护和扩展
- 符合单一职责原则

**缺点：**
- 需要额外的组件文件
- 使用时需要引入两个组件

## 组件设计

### 1. SkeletonCard 组件

基础骨架卡片组件，支持不同的变体。

**Props:**
- `variant`: 卡片变体类型 ('movie', 'tv', 'person', 'compact')
- `showExtra`: 是否显示额外信息占位符

**变体说明:**
- `movie`: 电影卡片，2:3 比例海报
- `tv`: 电视剧卡片，2:3 比例海报  
- `person`: 演员卡片，2:3 比例头像
- `compact`: 紧凑卡片，16:9 比例

### 2. SkeletonGrid 组件

网格布局的骨架屏组件，用于显示多个骨架卡片。

**Props:**
- `cols`: 网格列数配置 `{ sm: 2, md: 4, lg: 6 }`
- `count`: 骨架卡片数量
- `variant`: 卡片变体类型
- `showExtra`: 是否显示额外信息

### 3. SkeletonList 组件

列表布局的骨架屏组件，用于演员列表、评论列表等。

**Props:**
- `count`: 列表项数量
- `variant`: 列表项变体 ('actor', 'comment', 'review')

## 使用场景

### 1. 电影/电视剧列表
```vue
<SkeletonGrid 
  v-if="movies.pending.value"
  :count="12"
  variant="movie"
  :cols="{ sm: 2, md: 4, lg: 6 }"
/>
```

### 2. 演员列表
```vue
<SkeletonList 
  v-if="actors.pending.value"
  :count="20"
  variant="actor"
/>
```

### 3. 搜索结果
```vue
<SkeletonGrid 
  v-if="searchResults.pending.value"
  :count="8"
  variant="compact"
  :cols="{ sm: 1, md: 2, lg: 3 }"
/>
```

### 4. 详情页区块
```vue
<SkeletonGrid 
  v-if="similarMovies.pending.value"
  :count="6"
  variant="movie"
  :cols="{ sm: 2, md: 3, lg: 4 }"
/>
```

## 样式规范

### 颜色规范
- 占位符颜色: `bg-gray-300`
- 动画效果: `animate-pulse`

### 尺寸规范
- 电影海报: `aspect-[2/3]`
- 紧凑卡片: `aspect-[16/9]`
- 标题占位符: `h-4`
- 副标题占位符: `h-3`

### 间距规范
- 卡片间距: `gap-4`
- 内容间距: `space-y-1`
- 海报底部间距: `mb-2`

## 实现计划

1. **第一阶段**: 实现 SkeletonCard 基础组件
2. **第二阶段**: 实现 SkeletonGrid 网格组件
3. **第三阶段**: 实现 SkeletonList 列表组件
4. **第四阶段**: 在现有页面中应用骨架屏组件
5. **第五阶段**: 优化和扩展功能

## 文件结构

```
components/
├── Skeleton/
│   ├── Card.vue          # 基础骨架卡片
│   ├── Grid.vue          # 网格骨架屏
│   └── List.vue          # 列表骨架屏
```

## 最佳实践

1. **保持一致性**: 骨架屏样式与真实内容保持一致
2. **合理数量**: 根据实际内容数量设置骨架项数量
3. **响应式设计**: 支持不同屏幕尺寸的布局
4. **性能优化**: 避免过多的骨架项影响性能
5. **可访问性**: 考虑屏幕阅读器的支持

## 扩展计划

- **自定义动画**: 支持不同的加载动画效果
- **主题支持**: 支持深色模式的骨架屏
- **更多变体**: 根据业务需求添加更多卡片变体
- **智能骨架**: 根据数据结构自动生成骨架屏

## 已完成的实现

### 1. SkeletonCard 组件 (`components/Skeleton/Card.vue`)
- ✅ 支持多种变体：movie, tv, person, compact
- ✅ 可配置的额外信息显示
- ✅ 响应式设计
- ✅ 统一的动画效果

### 2. SkeletonGrid 组件 (`components/Skeleton/Grid.vue`)
- ✅ 灵活的网格布局配置
- ✅ 支持不同屏幕尺寸的响应式列数
- ✅ 可配置的卡片数量和变体
- ✅ 复用 SkeletonCard 组件

### 3. SkeletonList 组件 (`components/Skeleton/List.vue`)
- ✅ 支持演员列表、评论列表等变体
- ✅ 模拟真实列表项的布局
- ✅ 可配置的列表项数量

### 4. 页面应用
- ✅ 首页：热门电影、电视剧、最新动态区域
- ✅ 演员列表页面：演员网格布局
- ✅ 演职员页面：演员列表和剧组列表

## 使用示例

### 在首页中使用
```vue
<!-- 热门电影区域 -->
<SkeletonGrid 
  v-if="popularMovies.pending.value"
  :count="12"
  variant="movie"
  :cols="{ sm: 2, md: 4, lg: 6 }"
/>
```

### 在演员列表中使用
```vue
<SkeletonGrid 
  v-if="actors?.pending.value"
  :count="20"
  variant="person"
  :cols="{ sm: 2, md: 3, lg: 4, xl: 5 }"
  :show-extra="true"
/>
```

### 在演职员页面中使用
```vue
<!-- 演员列表骨架屏 -->
<SkeletonList 
  :count="15"
  variant="actor"
/>
```

## 技术特点

1. **组件化设计**: 高度可复用的组件架构
2. **类型安全**: 使用 TypeScript 进行类型检查
3. **响应式布局**: 支持不同屏幕尺寸的适配
4. **性能优化**: 轻量级实现，不影响页面性能
5. **一致性**: 与现有设计系统保持一致 