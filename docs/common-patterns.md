# 快速参考手册

## 📋 **概述**

本文档记录项目中常用的代码模式、组件和最佳实践，帮助你快速了解项目结构和实现方式。

---

## ⚙️ **项目配置**

### **1. 包管理器**

```bash
# 本项目使用 pnpm 作为包管理器
# 安装依赖
pnpm install

# 添加新依赖
pnpm add package-name

# 添加开发依赖
pnpm add -D package-name

# 升级依赖
pnpm update package-name@latest

# 启动开发服务器
pnpm run dev
```

### **2. 项目插件和模块**

#### **核心模块**

```javascript
// nuxt.config.ts
modules: [
  '@nuxtjs/tailwindcss', // Tailwind CSS 支持
  '@nuxt/image', // 图片优化模块
  '@pinia/nuxt', // Pinia 状态管理
  'pinia-plugin-persistedstate/nuxt', // Pinia 持久化
]
```

#### **主要依赖**

```json
{
  "dependencies": {
    "nuxt": "^3.17.5", // Nuxt 3 框架
    "vue": "^3.5.16", // Vue 3
    "vue-router": "^4.5.1", // Vue Router
    "@nuxt/image": "^1.10.0", // 图片优化
    "@pinia/nuxt": "^0.11.1", // Pinia 集成
    "pinia": "^3.0.3", // 状态管理
    "pinia-plugin-persistedstate": "^4.4.1", // 状态持久化
    "photoswipe": "5.4.4" // 图片查看器
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.14.0" // Tailwind CSS
  }
}
```

#### **插件使用说明**

**Tailwind CSS**

- 自动配置，无需额外设置
- 支持响应式设计和自定义主题
- 使用 `@apply` 指令或直接使用类名

**Nuxt Image**

- 提供图片优化和响应式图片
- 支持多种格式（webp, avif, jpeg, jpg）
- 配置了不同屏幕尺寸的断点

**Pinia 状态管理**

- 用于全局状态管理
- 支持持久化存储
- 自动导入，无需手动导入

**PhotoSwipe**

- 用于图片画廊和查看器
- 支持手势操作和键盘导航
- 已在全局配置中导入样式

### **3. PhotoSwipe 样式导入最佳实践**

```javascript
// ✅ 推荐：在 nuxt.config.ts 中全局导入
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
    'photoswipe/style.css', // 使用官方映射路径
  ],
})

// ✅ 页面中只需要导入 JS 模块
// pages/[type]/[id]/gallery.vue
import PhotoSwipeLightbox from 'photoswipe/lightbox'
// 不需要在页面中导入 CSS，因为已经在 Nuxt 配置中全局导入了

// ❌ 避免：直接引用内部路径
// 'photoswipe/dist/photoswipe.css'  // 不推荐
```

**为什么这样更好：**

- 使用 PhotoSwipe 官方提供的 `./style.css` 映射路径
- 如果包内部结构变化，只要保持映射关系，代码就不需要修改
- 在 Nuxt 配置中全局导入，避免在每个页面重复导入
- 符合包管理的最佳实践

---

## 🔄 **数据获取模式**

### **1. 标准 API 请求模式**

```javascript
// ✅ 推荐：直接使用 useHttp 返回的 AsyncData
const data = getApiFunction(params)

// 在模板中直接使用
// data.data.value - 数据
// data.pending.value - 加载状态
// data.error.value - 错误状态
// data.refresh() - 刷新方法
```

**❌ 无效的请求**

```javascript
// ❌ 不要这样做：在 onMounted 中使用请求是不会调用的
onMounted(async () => {
  const data = getApiFunction(params)
})
```

**❌ 避免的复杂化模式：**

```javascript
// ❌ 不要这样做：不必要的包装
const data = ref(null)
const pending = ref(false)
const error = ref(null)

const fetchData = async () => {
  pending.value = true
  try {
    const result = getApiFunction(params)
    await result
    data.value = result
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
}
```

## 🖼️ **图片处理**

### **1. 图片 URL 生成函数**

```javascript
// 已实现的工具函数
import { getPosterUrl, getBackdropUrl, getProfileUrl } from '~/utils/image'

// 使用方式
getPosterUrl(path, 'medium') // 海报图片
getBackdropUrl(path, 'medium') // 背景图片
getProfileUrl(path, 'medium') // 头像图片
```

### **2. 图片错误处理**

```javascript
// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target
  img.src = '/images/default-profile.png' // 设置默认图片
}

// 在模板中使用
<img
  :src="getProfileUrl(actor.profile_path, 'medium')"
  @error="handleImageError"
/>
```

### **3. 占位符图片**

- 已实现本地 SVG 占位符，无需网络请求
- 自动回退：当 TMDB 图片不可用时显示占位符
- 支持不同尺寸和类型

### **4. 统一错误处理模式**

项目使用统一的图片错误处理函数，避免重复代码和不一致的行为。

#### 使用方式

```vue
<!-- 在模板中直接使用内联方式 -->
<img
  :src="image.getPosterUrl(item.poster_path)"
  :alt="item.title"
  @error="event => image.handleImageError(event, 'poster')"
/>

<img
  :src="image.getProfileUrl(actor.profile_path)"
  :alt="actor.name"
  @error="event => image.handleImageError(event, 'profile')"
/>

<img
  :src="image.getBackdropUrl(item.backdrop_path)"
  :alt="item.title"
  @error="event => image.handleImageError(event, 'backdrop')"
/>
```

#### 支持的图片类型

- `poster`: 海报图片，自动回退到占位符
- `profile`: 头像图片，自动回退到占位符
- `backdrop`: 背景图片，自动回退到占位符

#### 优势

- **简洁直观**: 直接调用 `image.handleImageError(event, 'poster')`
- **类型安全**: 自动根据图片类型设置正确的占位符
- **一致性**: 所有组件使用相同的错误处理逻辑
- **维护性**: 集中管理占位符图片

---

## 🛠️ **工具函数**

### **1. 命名空间使用方式（推荐）**

```javascript
// 使用 common 命名空间，避免与页面方法名冲突
// 无需手动导入，Nuxt 3 自动导入支持

// 使用方式
common.formatDate('2023-12-25') // 返回: '2023/12/25'
common.formatPopularity(123.456) // 返回: '123.5'
common.getGenderText(1) // 返回: '女'
common.formatBudget(1500000) // 返回: '$1.5M'
common.getYear('2023-12-25') // 返回: '2023'
common.formatRuntime(125) // 返回: '2h 5m'
```

## 📱 **响应式设计**

### **1. 网格布局**

```vue
<!-- 响应式网格 -->
<div
  class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
>
  <!-- 内容 -->
</div>
```

### **2. 图片比例**

```vue
<!-- 海报比例 2:3 -->
<div class="aspect-[2/3]">
  <img class="w-full h-full object-cover" />
</div>

<!-- 背景比例 16:9 -->
<div class="aspect-video">
  <img class="w-full h-full object-cover" />
</div>
```

---

## 🎯 **SEO 配置**

### **1. 动态标题和描述**

```javascript
useHead(() => ({
  title: data.data.value
    ? `${data.data.value.title} - Nuxt Movie`
    : '页面标题 - Nuxt Movie',
  meta: [
    {
      name: 'description',
      content: data.data.value?.description || '页面描述',
    },
  ],
}))
```

---

## 📝 **注意事项**

### **1. 避免重复实现**

- 检查是否已有相同的功能
- 优先使用现有的工具函数和组件
- 保持代码一致性

### **2. 性能优化**

- 使用 `loading="lazy"` 进行图片懒加载
- 合理使用防抖，避免频繁请求
- 使用计算属性缓存计算结果

### **3. 用户体验**

- 提供加载状态和错误处理
- 使用搜索建议提升用户体验
- 支持键盘导航和快捷键

### **4. 代码维护**

- 遵循项目命名规范
- 添加适当的注释
- 使用 TypeScript 类型定义

## 📝 **TypeScript 类型添加模式**

### **3. 最佳实践**

参考这个文档内容 [typescript-guide.md](./typescript-guide.md)

## 多语言（i18n）相关最佳实践

- 所有语言切换都必须通过 Pinia store 的 `switchLanguage` 方法进行，不允许在组件或页面中直接操作 `$i18n`。这样可以保证 store 状态和 Nuxt i18n 状态始终同步，避免出现语言状态不一致的问题。
