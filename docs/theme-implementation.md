# 主题功能实现文档

## 概述

本项目实现了完整的明亮和暗黑主题切换功能，支持三种模式：

- **明亮模式**：使用明亮主题
- **暗黑模式**：使用暗黑主题
- **跟随系统**：根据系统主题设置自动切换

## 架构设计

### 1. 类型定义 (`types/theme.ts`)

```typescript
/** 主题模式枚举 */
export type ThemeMode = 'light' | 'dark' | 'system'

/** 主题状态 */
export interface ThemeState {
  /** 当前主题模式 */
  mode: ThemeMode
  /** 实际应用的主题（根据系统偏好计算得出） */
  current: 'light' | 'dark'
  /** 是否已初始化 */
  initialized: boolean
}
```

### 2. 常量定义 (`constants/theme.ts`)

```typescript
/** 主题切换选项 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'theme.lightMode',
    icon: 'sun',
    description: 'theme.lightModeDescription',
  },
  // ...
]

/** 默认主题模式 */
export const DEFAULT_THEME_MODE = 'system' as const
```

### 3. 工具函数 (`utils/theme.ts`)

提供主题相关的工具函数：

- `supportsDarkMode()`: 检测系统是否支持暗黑模式
- `getSystemTheme()`: 获取系统主题偏好
- `watchSystemTheme()`: 监听系统主题变化
- `applyTheme()`: 应用主题到 DOM
- `calculateCurrentTheme()`: 计算实际应用的主题

### 4. 状态管理 (`stores/theme.ts`)

使用 Pinia 管理主题状态：

```typescript
export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: DEFAULT_THEME_MODE as ThemeMode,
    current: 'light' as 'light' | 'dark',
    initialized: false,
  }),

  getters: {
    getMode: state => state.mode,
    getCurrent: state => state.current,
    isDark: state => state.current === 'dark',
    isLight: state => state.current === 'light',
    isSystem: state => state.mode === 'system',
  },

  actions: {
    initialize() {
      /* 初始化主题 */
    },
    setTheme(mode: ThemeMode) {
      /* 设置主题 */
    },
    toggleTheme() {
      /* 切换主题 */
    },
    updateCurrentTheme() {
      /* 更新当前主题 */
    },
    watchSystemTheme() {
      /* 监听系统主题 */
    },
  },

  persist: true, // 持久化存储
})
```

### 5. 组件实现

#### 主题切换器 (`components/Common/ThemeSwitcher.vue`)

提供完整的主题切换界面，包括：

- 下拉菜单选择主题模式
- 图标和描述
- 选中状态指示

#### 简单切换按钮 (`components/Common/ThemeToggle.vue`)

提供简单的主题切换按钮，适用于移动端。

### 6. 样式配置

#### Tailwind 配置 (`tailwind.config.ts`)

```typescript
export default {
  darkMode: 'class', // 启用基于 class 的暗黑模式
  theme: {
    extend: {
      colors: {
        primary: {
          // 自定义颜色变量
        },
      },
    },
  },
}
```

#### CSS 样式 (`assets/css/tailwind.css`)

```css
/* 主题切换动画 */
* {
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

/* 暗黑模式滚动条样式 */
.dark ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
```

## 使用方法

### 1. 在组件中使用主题

```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- 内容 -->
  </div>
</template>

<script setup>
  const themeStore = useThemeStore()

  // 检查当前主题
  console.log(themeStore.getCurrent) // 'light' | 'dark'
  console.log(themeStore.isDark) // boolean
  console.log(themeStore.isLight) // boolean
</script>
```

### 2. 切换主题

```vue
<template>
  <button @click="toggleTheme">切换主题</button>
</template>

<script setup>
  const themeStore = useThemeStore()

  const toggleTheme = () => {
    themeStore.toggleTheme()
  }

  // 或者设置特定主题
  const setLightTheme = () => {
    themeStore.setTheme('light')
  }

  const setDarkTheme = () => {
    themeStore.setTheme('dark')
  }

  const setSystemTheme = () => {
    themeStore.setTheme('system')
  }
</script>
```

### 3. 使用主题切换组件

```vue
<template>
  <!-- 完整主题切换器 -->
  <CommonThemeSwitcher />

  <!-- 简单切换按钮 -->
  <CommonThemeToggle />
</template>
```

## 多语言支持

主题功能支持多语言，翻译键定义在语言文件中：

```typescript
// language/zh.ts
theme: {
  switchTheme: '切换主题',
  lightMode: '明亮模式',
  darkMode: '暗黑模式',
  systemMode: '跟随系统',
  lightModeDescription: '使用明亮主题',
  darkModeDescription: '使用暗黑主题',
  systemModeDescription: '跟随系统主题设置',
}
```

## 特性

### 1. 自动检测系统主题

- 自动检测系统是否支持暗黑模式
- 监听系统主题变化
- 在系统模式下自动跟随系统设置

### 2. 持久化存储

- 使用 Pinia 持久化插件
- 主题设置保存在 cookies 中
- 页面刷新后保持主题设置

### 3. 平滑过渡动画

- CSS transition 实现平滑的主题切换动画
- 防止页面闪烁
- 自定义滚动条样式

### 4. 响应式设计

- 桌面端：完整主题切换器
- 移动端：简单切换按钮
- 适配不同屏幕尺寸

### 5. 无障碍支持

- 提供 aria-label 属性
- 支持键盘导航
- 语义化的 HTML 结构

## 最佳实践

### 1. 使用 Tailwind 暗黑模式类

```vue
<!-- 推荐 -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
    标题
  </h1>
  <p class="text-gray-600 dark:text-gray-300">
    内容
  </p>
</div>
```

### 2. 避免硬编码颜色

```vue
<!-- 不推荐 -->
<div class="bg-white text-black"></div>
```

### 3. 使用主题状态

```vue
<script setup>
  const themeStore = useThemeStore()

  // 根据主题状态显示不同内容
  const themeText = computed(() => {
    return themeStore.isDark ? '暗黑模式' : '明亮模式'
  })
</script>
```

### 4. 组件设计原则

- 组件应该支持暗黑模式
- 使用 Tailwind 的 dark: 前缀
- 保持颜色对比度
- 测试不同主题下的显示效果

## 扩展功能

### 1. 自定义主题色

可以在 `tailwind.config.ts` 中定义自定义主题色：

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef2f2',
        100: '#fee2e2',
        // ...
      },
    },
  },
}
```

### 2. 主题预设

可以添加更多主题预设，如：

- 高对比度主题
- 护眼主题
- 自定义主题

### 3. 主题同步

可以实现多设备间的主题同步：

- 使用 localStorage 存储
- 云端同步
- 用户偏好设置

## 注意事项

1. **SSR 兼容性**：确保在服务端渲染时正确处理主题
2. **性能优化**：避免频繁的主题切换操作
3. **可访问性**：确保暗黑模式下的对比度符合标准
4. **测试覆盖**：在不同设备和浏览器中测试主题功能
