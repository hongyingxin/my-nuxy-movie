# 常用模式和组件文档

## 📋 **概述**
本文档记录项目中常用的代码模式、组件和最佳实践，避免重复实现和忘记已有功能。

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

### **2. PhotoSwipe 样式导入最佳实践**
```javascript
// ✅ 推荐：在 nuxt.config.ts 中全局导入
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
    'photoswipe/style.css'  // 使用官方映射路径
  ]
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

### **2. 分页数据获取**
```javascript
// 当前页码
const currentPage = ref(1)

// 获取数据
const data = getApiFunction(currentPage.value)

// 跳转页面
const goToPage = (page) => {
  if (page < 1 || page > data.data.value?.total_pages) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听路由参数
const route = useRoute()
watch(() => route.query.page, (newPage) => {
  if (newPage) {
    const page = parseInt(newPage)
    if (page > 0) {
      currentPage.value = page
    }
  }
}, { immediate: true })

// 更新 URL
watch(currentPage, (newPage) => {
  navigateTo({
    query: { ...route.query, page: newPage }
  }, { replace: true })
})
```

---

## 🖼️ **图片处理**

### **1. 图片 URL 生成函数**
```javascript
// 已实现的工具函数
import { getPosterUrl, getBackdropUrl, getProfileUrl } from '~/utils/image'

// 使用方式
getPosterUrl(path, 'medium')     // 海报图片
getBackdropUrl(path, 'medium')   // 背景图片  
getProfileUrl(path, 'medium')    // 头像图片
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

---

## 🎨 **UI 组件模式**

### **1. 加载状态**
```vue
<!-- 加载状态 -->
<div v-if="data.pending.value" class="text-center py-12">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
  <p class="text-gray-600">加载中...</p>
</div>
```

### **2. 错误状态**
```vue
<!-- 错误状态 -->
<div v-else-if="data.error.value" class="text-center py-12">
  <div class="text-red-600 text-6xl mb-4">😞</div>
  <h2 class="text-2xl font-bold text-gray-800 mb-2">加载失败</h2>
  <p class="text-gray-600 mb-4">无法获取数据，请稍后重试</p>
  <button 
    @click="data.refresh"
    class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
  >
    重新加载
  </button>
</div>
```

### **3. 分页组件**
```vue
<!-- 分页组件 -->
<div v-if="data.data.value.total_pages > 1" class="flex justify-center">
  <div class="flex items-center space-x-2 bg-white rounded-lg shadow-sm px-4 py-2">
    <!-- 上一页 -->
    <button 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- 页码 -->
    <div class="flex items-center space-x-1">
      <button 
        v-for="page in visiblePages" 
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
        :class="page === currentPage ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
      >
        {{ page }}
      </button>
    </div>

    <!-- 下一页 -->
    <button 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage >= data.data.value.total_pages"
      class="px-3 py-1 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  </div>
</div>
```

### **4. 卡片悬停效果**
```vue
<!-- 卡片悬停效果 -->
<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
  <!-- 图片悬停缩放 -->
  <img 
    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />
  
  <!-- 悬停遮罩 -->
  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
    <div class="text-white text-center">
      <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
      <span class="text-sm font-medium">查看详情</span>
    </div>
  </div>
</div>
```

---

## 🛠️ **工具函数**

### **1. 日期格式化**
```javascript
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  return new Date(dateString).toLocaleDateString('zh-CN')
}
```

### **2. 人气指数格式化**
```javascript
const formatPopularity = (popularity) => {
  if (!popularity) return 'N/A'
  return popularity.toFixed(0)
}
```

### **3. 文本截断**
```javascript
// 使用 Tailwind CSS 的 line-clamp 类
// line-clamp-1, line-clamp-2, line-clamp-3
```

---

## 📱 **响应式设计**

### **1. 网格布局**
```vue
<!-- 响应式网格 -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

## 🔗 **导航模式**

### **1. 页面跳转**
```javascript
// 跳转到详情页
const navigateToDetail = (id) => {
  navigateTo(`/detail/${id}`)
}

// 跳转到列表页
const navigateToList = () => {
  navigateTo('/list')
}
```

### **2. 返回上一页**
```javascript
const goBack = () => {
  navigateTo(-1)
}
```

---

## 🎯 **SEO 配置**

### **1. 动态标题和描述**
```javascript
useHead(() => ({
  title: data.data.value ? `${data.data.value.title} - Nuxt Movie` : '页面标题 - Nuxt Movie',
  meta: [
    { 
      name: 'description', 
      content: data.data.value?.description || '页面描述' 
    }
  ]
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
- 合理使用 `computed` 和 `watch`
- 避免不必要的响应式包装

### **3. 错误处理**
- 始终处理 API 请求错误
- 提供用户友好的错误信息
- 实现重试机制

### **4. 类型安全**
- 使用 TypeScript 类型定义
- 避免 `any` 类型
- 为函数参数添加类型注解

---

## 📚 **相关文档**
- [演员模块设计](./person.md)
- [API 接口文档](./api.md)
- [组件库文档](./components.md) 