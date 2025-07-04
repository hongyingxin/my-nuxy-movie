# 组件目录结构

本目录包含按功能和用途组织的所有 Vue 组件。

## 目录结构

```
components/
├── layout/          # 布局组件 (头部、底部、导航)
├── ui/              # 可复用的 UI 组件 (按钮、评分、表单)
├── media/           # 媒体相关组件 (卡片、播放器、画廊)
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
- **MediaGrid.vue** - 媒体卡片网格布局 (未来)
- **MediaPlayer.vue** - 视频播放器组件 (未来)
- **MediaGallery.vue** - 图片画廊组件 (未来)

### 🔧 通用组件 (`common/`)
不属于其他类别的共享组件。

- **Icon.vue** - 图标组件 (未来)
- **Tooltip.vue** - 工具提示组件 (未来)
- **Breadcrumb.vue** - 面包屑导航组件 (未来)

## 命名约定

- **布局组件**: `Layout[组件名]` (例如: `LayoutAppHeader`)
- **UI 组件**: `Ui[组件名]` (例如: `UiMovieRating`)
- **媒体组件**: `Media[组件名]` (例如: `MediaCard`)
- **通用组件**: `Common[组件名]` (例如: `CommonIcon`)

**Nuxt 3 自动导入规则:**
- 子目录中的组件会自动导入，目录名作为前缀
- `components/layout/AppHeader.vue` → `<LayoutAppHeader />`
- `components/ui/MovieRating.vue` → `<UiMovieRating />`
- `components/media/MediaCard.vue` → `<MediaCard />` (媒体目录无前缀)
- `components/common/Icon.vue` → `<CommonIcon />`

## 使用示例

```vue
<!-- 布局组件 -->
<LayoutAppHeader />
<LayoutAppFooter />

<!-- UI 组件 -->
<UiMovieRating :score="8.5" />

<!-- 媒体组件 -->
<MediaCard :item="movie" />

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