# TypeScript 类型添加指南

## 基本原则

1. **类型文件组织**
   - 页面相关类型定义放在 `types/pages/` 目录下
   - 公共类型定义放在 `types/common/` 目录下
   - 接口类型定义放在 `types/apiType/` 目录下
   - 按功能模块组织类型文件
   - 类型文件命名要与页面文件名对应（如 `home.ts` 对应 `pages/index.vue`）
   - 补充类型的过程中不要删除原有的代码注释
   - 新增的类型必须是有使用到的，禁止使用any

2. **类型添加顺序**

   ```typescript
   // 1. 导入必要的类型
   import type { AsyncData } from 'nuxt/app'
   import type { TrendingItem } from '~/types/apiType'

   // 2. 定义页面数据类型
   export interface HomePageData {
     popularMovies: AsyncData<MovieListResponse, Error>
   }

   // 3. 定义计算属性或特定组件类型
   export type CurrentHeroItem = Partial<TrendingItem> & {
     // 必需的属性
     id: number
     overview: string
     // 可选的属性
     title?: string
   }
   ```

## 需要添加类型的场景

1. **API 响应数据**

   ```typescript
   // 使用 as 断言确保类型正确
   const popularMovies = getPopularMovies(1) as HomePageData['popularMovies']
   ```

2. **ref 响应式数据**

   ```typescript
   // 明确指定 ref 的类型
   const currentIndex = ref<number>(0)
   const favorites = ref<Set<number>>(new Set())
   ```

3. **计算属性**

   ```typescript
   // 为复杂的计算属性添加类型
   const currentItem = computed<CurrentHeroItem>(() => {
     return data.value || {}
   })
   ```

4. **定时器/工具类型**
   ```typescript
   // 使用 ReturnType 获取正确的类型
   let interval: ReturnType<typeof setInterval> | null = null
   ```

## 不需要添加类型的场景

1. **简单的事件处理函数**

   ```typescript
   // 不需要类型标注
   const handleClick = () => {
     counter.value++
   }
   ```

2. **Vue 生命周期钩子**

   ```typescript
   // 钩子函数不需要类型标注
   onMounted(() => {
     // ...
   })
   ```

3. **有明确类型推导的场景**
   ```typescript
   // TypeScript 可以正确推导类型
   const title = ref('Hello') // 自动推导为 ref<string>
   ```

## 类型添加技巧

1. **复用类型**

   ```typescript
   // 使用类型索引访问
   type MovieData = HomePageData['popularMovies']

   // 使用 Partial 使所有属性可选
   type PartialItem = Partial<TrendingItem>
   ```

2. **类型收窄**

   ```typescript
   // 使用交叉类型添加必需属性
   type RequiredItem = Partial<BaseItem> & {
     id: number
     name: string
   }
   ```

3. **工具类型使用**

   ```typescript
   // ReturnType 获取函数返回值类型
   type TimerType = ReturnType<typeof setInterval>

   // Partial 使属性可选
   type OptionalItem = Partial<TrendingItem>
   ```

## 常见问题解决

1. **类型不匹配**
   - 检查原始类型定义
   - 确保必需属性存在
   - 使用类型断言或类型收窄

2. **类型过于复杂**
   - 拆分为小型接口
   - 使用类型别名简化
   - 只保留必要的类型定义

3. **类型重复**
   - 抽取共用类型
   - 使用类型继承
   - 使用类型组合

## 注意事项

1. 避免过度类型设计
2. 优先使用类型推导
3. 保持类型定义简洁
4. 确保类型安全性
5. 遵循项目类型管理规范

## 相关文档

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Vue 3 TypeScript 支持](https://vuejs.org/guide/typescript/overview.html)
- [Nuxt 3 TypeScript 指南](https://nuxt.com/docs/guide/concepts/typescript)
