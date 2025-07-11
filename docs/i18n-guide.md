# Nuxt i18n 多语言集成指南

## 概述

本文档记录了在 Nuxt 3 项目中集成 `@nuxtjs/i18n` 模块的完整过程，包括安装、配置、实现以及遇到的问题和解决方案。

## 目录

- [安装和配置](#安装和配置)
- [语言文件结构](#语言文件结构)
- [语言切换组件](#语言切换组件)
- [状态管理](#状态管理)
- [页面集成](#页面集成)
- [遇到的问题](#遇到的问题)
- [最佳实践](#最佳实践)

## 安装和配置

### 1. 安装依赖

```bash
pnpm add @nuxtjs/i18n
```

### 2. Nuxt 配置

在 `nuxt.config.ts` 中添加模块配置：

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  i18n: {
    // 支持的语言
    locales: [
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
        file: 'zh.ts',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts',
      },
    ],

    // 默认语言
    defaultLocale: 'zh',

    // 语言文件目录
    langDir: 'language/',

    // 策略：无前缀 URL
    strategy: 'no_prefix',

    // 自动导入
    lazy: true,

    // 检测用户语言
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // 自动导入 useI18n
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n'],
      },
    ],
  },
})
```

## 语言文件结构

### 目录结构

```
language/
├── en.ts    # 英文语言文件
└── zh.ts    # 中文语言文件
```

### 语言文件示例

```typescript
// language/zh.ts
export default {
  // 通用
  common: {
    view: '查看',
    retry: '重试',
    share: '分享',
    clear: '清除',
  },

  // 导航
  navigation: {
    home: '首页',
    movies: '电影',
    tvShows: '电视剧',
    actors: '演员',
    search: '搜索',
    discover: '发现',
  },

  // 首页
  home: {
    pageTitle: 'Nuxt Movie - 发现精彩影视',
    pageDescription: '探索最新电影、电视剧和演员信息',
    todayTrending: '今日热门',
    movie: '电影',
    tvShow: '电视剧',
    popularity: '人气指数',
    watchNow: '立即观看',
    learnMore: '了解更多',
    loadingContent: '正在加载内容...',
    popularMovies: '热门电影',
    popularTvShows: '热门电视剧',
    latestUpdates: '最新动态',
    viewMore: '查看更多',
  },

  // 媒体类型
  media: {
    movies: '电影',
    tvShows: '电视剧',
    actors: '演员',
  },

  // 搜索
  search: {
    title: '搜索',
    placeholder: '搜索电影、电视剧、演员...',
    type: '类型',
    year: '年份',
    allYears: '所有年份',
    includeAdult: '包含成人内容',
    clearFilters: '清除筛选',
    searching: '搜索中...',
    results: '搜索结果',
    foundResults: '找到 {count} 个结果',
    totalPages: '共 {pages} 页',
    noResults: '没有找到相关结果',
    tryDifferent: '请尝试不同的关键词',
    startSearch: '开始搜索',
    enterKeywords: '请输入搜索关键词',
    searchFailed: '搜索失败，请重试',
  },

  // 发现页面
  discover: {
    filter: '筛选',
    filterConditions: '筛选条件',
    applyFilters: '应用筛选',
    sortBy: '排序方式',
    genres: '类型',
    minRating: '最低评分',
    releaseDate: '上映日期',
    airDate: '播出日期',
    startDatePlaceholder: '开始日期',
    endDatePlaceholder: '结束日期',
    filterDescription: '使用筛选条件找到您喜欢的内容',
    popularityNote: '注意：人气排序可能包含较新的内容',
    language: '语言',
    region: '地区',
    regionNote: '选择地区以获取本地化的内容',
    releaseType: '发行类型',
  },

  // 详情页
  detail: {
    loadingDetails: '正在加载{type}详情...',
    peopleRated: '人评分',
    watchTrailer: '观看预告片',
    addToFavorites: '添加到收藏',
    overview: '简介',
    cast: '演员',
    viewAll: '查看全部',
    photos: '剧照',
    viewAllImages: '查看全部图片',
    similar: '相似',
    details: '详细信息',
    status: '状态',
    originalLanguage: '原始语言',
    budget: '预算',
    revenue: '收入',
    releaseDate: '上映日期',
    seasons: '季数',
    episodes: '集数',
    firstAirDate: '首播日期',
    lastAirDate: '最后播出日期',
    productionCompanies: '制作公司',
    rating: '评分',
    keywords: '关键词',
    loadingFailed: '加载失败',
    loadingFailedMessage: '无法加载详细信息',
    reload: '重新加载',
  },

  // 演员页面
  actors: {
    title: '演员',
    description: '探索知名演员和他们的作品',
    loadingActors: '正在加载演员信息...',
    knownFor: '代表作',
    gender: '性别',
    filmography: '作品集',
    popularity: '人气',
    addToFavorites: '添加到收藏',
    birthDate: '出生日期',
    birthPlace: '出生地',
    occupation: '职业',
    imdb: 'IMDb',
    biography: '传记',
    careerTimeline: '职业生涯时间线',
    loadFailed: '加载失败',
    failedToLoadActorDetails: '无法加载演员详细信息',
    reload: '重新加载',
    viewDetails: '查看详情',
  },

  // 部门
  department: {
    Production: '制作',
    Directing: '导演',
    Writing: '编剧',
    Sound: '音效',
    Camera: '摄影',
    Editing: '剪辑',
    Art: '美术',
    CostumeMakeUp: '服装化妆',
    VisualEffects: '视觉效果',
    Lighting: '灯光',
    Creator: '创作者',
    Actors: '演员',
  },

  // 错误页面
  error: {
    serverError: '服务器错误',
    pageNotFound: '页面未找到',
    accessDenied: '访问被拒绝',
    serviceUnavailable: '服务不可用',
    unexpectedError: '意外错误',
  },

  // 分页
  pagination: {
    previous: '上一页',
    next: '下一页',
    first: '首页',
    last: '末页',
    page: '第 {page} 页',
    of: '共 {total} 页',
    showing: '显示第 {start} 到 {end} 条，共 {total} 条',
  },
}
```

## 语言切换组件

### 组件实现

```vue
<!-- components/Common/LanguageSwitcher.vue -->
<template>
  <div class="relative">
    <!-- 桌面端：下拉菜单 -->
    <div class="hidden md:block">
      <button
        ref="dropdownTrigger"
        class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        @click="toggleDropdown"
      >
        <span class="w-5 h-5 rounded-full overflow-hidden">
          <img
            :src="currentLocaleFlag"
            :alt="currentLocaleName"
            class="w-full h-full object-cover"
          />
        </span>
        <span class="hidden lg:inline">{{ currentLocaleName }}</span>
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- 下拉菜单 -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            class="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            @click="switchLanguage(locale.code)"
          >
            <span class="w-5 h-5 rounded-full overflow-hidden">
              <img
                :src="getLocaleFlag(locale.code)"
                :alt="locale.name"
                class="w-full h-full object-cover"
              />
            </span>
            <span>{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale"
              class="w-4 h-4 text-red-600 ml-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端：按钮组 -->
    <div class="md:hidden flex space-x-1">
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        class="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
        :class="
          locale.code === currentLocale
            ? 'bg-red-600 text-white'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        "
        @click="switchLanguage(locale.code)"
      >
        <span class="w-4 h-4 rounded-full overflow-hidden">
          <img
            :src="getLocaleFlag(locale.code)"
            :alt="locale.name"
            class="w-full h-full object-cover"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { useLanguageStore } from '~/stores/language'

  // 获取语言 store
  const languageStore = useLanguageStore()

  // 响应式数据
  const isDropdownOpen = ref(false)
  const dropdownTrigger = ref(null)

  // 计算属性
  const currentLocale = computed(() => languageStore.currentLocale)
  const availableLocales = computed(() => languageStore.availableLocales)
  const currentLocaleName = computed(() => {
    const locale = availableLocales.value.find(
      l => l.code === currentLocale.value
    )
    return locale?.name || 'Unknown'
  })
  const currentLocaleFlag = computed(() => getLocaleFlag(currentLocale.value))

  // 方法
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  const switchLanguage = locale => {
    languageStore.switchLanguage(locale)
    isDropdownOpen.value = false
  }

  const getLocaleFlag = localeCode => {
    const flags = {
      zh: '/images/flags/zh.svg',
      en: '/images/flags/en.svg',
    }
    return flags[localeCode] || flags.en
  }

  // 点击外部关闭下拉菜单
  onClickOutside(dropdownTrigger, () => {
    isDropdownOpen.value = false
  })
</script>
```

## 状态管理

### Pinia Store

```typescript
// stores/language.ts
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  // 状态
  const currentLocale = ref('zh')

  // 可用语言列表
  const availableLocales = ref([
    {
      code: 'zh',
      iso: 'zh-CN',
      name: '中文',
      file: 'zh.ts',
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.ts',
    },
  ])

  // 切换语言
  const switchLanguage = (locale: string) => {
    if (availableLocales.value.find(l => l.code === locale)) {
      currentLocale.value = locale
      // 这里可以添加其他逻辑，比如保存到 localStorage
    }
  }

  // 获取当前语言
  const getCurrentLocale = () => currentLocale.value

  // 获取可用语言列表
  const getAvailableLocales = () => availableLocales.value

  return {
    currentLocale: readonly(currentLocale),
    availableLocales: readonly(availableLocales),
    switchLanguage,
    getCurrentLocale,
    getAvailableLocales,
  }
})
```

## 页面集成

### 在页面中使用

```vue
<template>
  <div>
    <h1>{{ $t('home.pageTitle') }}</h1>
    <p>{{ $t('home.pageDescription') }}</p>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  // 获取 i18n 实例
  const { t } = useI18n()

  // SEO 配置 - 注意使用函数形式
  useHead(() => ({
    title: t('home.pageTitle'),
    meta: [
      {
        name: 'description',
        content: t('home.pageDescription'),
      },
    ],
  }))
</script>
```

## 遇到的问题

### 1. useI18n 必须在 setup 函数顶部调用

**问题描述**：

```
Must be called at the top of a setup function
```

**原因**：
在 `definePageMeta` 或 `useHead` 中直接使用 `t` 函数，但这些函数可能在 setup 函数外部执行。

**解决方案**：

```typescript
// ❌ 错误方式
definePageMeta({
  title: t('search.title'),
  description: t('search.enterKeywords'),
})

// ✅ 正确方式
definePageMeta({
  title: 'search.title',
  description: 'search.enterKeywords',
})

// ✅ 或者使用函数形式
useHead(() => ({
  title: t('home.pageTitle'),
  meta: [
    {
      name: 'description',
      content: t('home.pageDescription'),
    },
  ],
}))
```

### 2. 自动导入重复警告

**问题描述**：

```
WARN  Duplicated imports "useI18n", the one from "vue-i18n" has been ignored
```

**原因**：
在 `nuxt.config.ts` 中配置了自动导入，但在某些文件中又手动导入了 `useI18n`。

**解决方案**：
移除手动导入，依赖自动导入：

```typescript
// ❌ 不需要手动导入
import { useI18n } from 'vue-i18n'

// ✅ 直接使用，自动导入会处理
const { t } = useI18n()
```

### 3. ESLint 配置问题

**问题描述**：
语言文件 `.ts` 被 ESLint 忽略，导致配置警告。

**解决方案**：
更新 ESLint 配置：

```javascript
// eslint.config.mjs
export default withNuxt({
  rules: {
    'no-unused-vars': 'error',
  },
})
```

### 4. 未使用变量错误

**问题描述**：
导入的变量没有被使用，导致 ESLint 错误。

**解决方案**：
移除未使用的导入：

```typescript
// ❌ 未使用的导入
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// ✅ 只保留需要的导入
import { getPersonDetail, getPersonCredits } from '~/api/person'
```

## 最佳实践

### 1. 语言文件组织

- 按功能模块组织翻译键
- 使用嵌套结构提高可读性
- 保持键名简洁明了

### 2. 组件设计

- 响应式设计，支持桌面端和移动端
- 使用图标和国旗增强用户体验
- 提供清晰的视觉反馈

### 3. 状态管理

- 使用 Pinia 管理语言状态
- 提供只读状态，避免外部修改
- 支持持久化存储

### 4. SEO 优化

- 使用函数形式的 `useHead`
- 为不同语言提供正确的 meta 信息
- 支持语言检测和重定向

### 5. 性能优化

- 使用懒加载语言文件
- 避免在 setup 函数外部使用 `t` 函数
- 合理使用计算属性缓存翻译结果

## 总结

通过以上步骤，我们成功在 Nuxt 3 项目中集成了完整的多语言支持。关键是要注意 `useI18n` 的使用时机，以及正确处理自动导入和手动导入的关系。通过合理的架构设计，我们实现了可维护、可扩展的多语言解决方案。
