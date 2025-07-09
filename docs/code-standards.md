# 代码注释标准

本文档定义了项目中所有代码的注释标准，确保代码的可读性和可维护性。

## 📋 注释检查清单

### Vue 组件检查清单

#### ✅ Props 注释

- [ ] 每个 prop 都有 JSDoc 注释
- [ ] 注释说明 prop 的用途和类型
- [ ] 复杂 prop 提供使用示例

```javascript
const props = defineProps({
  /** 当前页码 */
  currentPage: {
    type: Number,
    required: true,
  },
  /** 是否在页面切换时自动滚动到顶部 */
  scrollToTop: {
    type: Boolean,
    default: true,
  },
})
```

#### ✅ Events 注释

- [ ] 每个事件都有 JSDoc 注释
- [ ] 明确标注事件参数类型
- [ ] 说明事件触发的时机

```javascript
const emit = defineEmits([
  /** 页码变化事件
   * @param {number} page - 新的页码
   */
  'page-change',
  /** 每页条数变化事件
   * @param {number} pageSize - 新的每页条数
   */
  'page-size-change',
])
```

#### ✅ Methods 注释

- [ ] 每个方法都有 JSDoc 注释
- [ ] 明确标注参数类型和说明
- [ ] 说明方法的功能和返回值
- [ ] 复杂逻辑提供实现说明

```javascript
/**
 * 处理页码变化
 * @param {number} page - 目标页码
 */
const handlePageChange = page => {
  // 验证页码范围
  if (page < 1 || page > props.totalPages) return

  // 触发页码变化事件
  emit('page-change', page)
}
```

#### ✅ 计算属性注释

- [ ] 每个计算属性都有 JSDoc 注释
- [ ] 明确标注返回值类型
- [ ] 说明计算逻辑

```javascript
/**
 * 计算当前应该显示的页码范围
 * @returns {number[]} 要显示的页码数组
 */
const visiblePages = computed(() => {
  // 计算逻辑...
})
```

### Composables 检查清单

#### ✅ 主函数注释

- [ ] 完整的 JSDoc 文档
- [ ] 详细的返回值说明
- [ ] 提供使用示例
- [ ] 说明功能和用途

````javascript
/**
 * 屏幕尺寸检测 composable
 * 提供响应式的屏幕尺寸信息和设备类型判断
 *
 * @returns {Object} 屏幕尺寸相关的响应式数据和方法
 * @returns {Ref<number>} screenWidth - 屏幕宽度（只读）
 * @returns {ComputedRef<boolean>} isMobile - 是否为移动端 (< 640px)
 *
 * @example
 * ```javascript
 * const { screenWidth, isMobile } = useScreenSize()
 * if (isMobile.value) {
 *   // 移动端逻辑
 * }
 * ```
 */
export const useScreenSize = () => {
  // 实现...
}
````

#### ✅ 内部方法注释

- [ ] 每个内部方法都有注释
- [ ] 说明方法的用途
- [ ] 标注参数和返回值

```javascript
/**
 * 更新屏幕尺寸信息
 * 在客户端环境下获取当前窗口的宽度和高度
 */
const updateSize = () => {
  if (process.client) {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
  }
}
```

### 工具函数检查清单

#### ✅ 函数注释

- [ ] 完整的 JSDoc 文档
- [ ] 详细的参数说明
- [ ] 明确的返回值类型
- [ ] 提供使用示例
- [ ] 说明函数用途

```javascript
/**
 * 格式化日期字符串
 * @param {string} dateString - 日期字符串，格式为 'YYYY-MM-DD'
 * @param {string} [separator='/'] - 分隔符，默认为 '/'
 * @returns {string} 格式化后的日期字符串，格式为 'YYYY/MM/DD'
 *
 * @example
 * formatDate('2023-12-25') // 返回: '2023/12/25'
 * formatDate('2023-12-25', '-') // 返回: '2023-12-25'
 */
export const formatDate = (dateString, separator = '/') => {
  // 实现逻辑...
}
```

## 🎯 注释质量要求

### 1. 准确性

- 注释必须准确描述代码功能
- 参数说明要与实际参数一致
- 返回值类型要与实际返回值一致

### 2. 完整性

- 所有公共 API 必须有注释
- 复杂逻辑必须有说明
- 不明显的代码必须有解释

### 3. 可读性

- 使用中文注释便于理解
- 注释要简洁明了
- 避免冗余和重复信息

### 4. 一致性

- 使用统一的 JSDoc 格式
- 保持注释风格一致
- 遵循项目的注释约定

## 📝 常见注释模式

### 条件渲染注释

```javascript
/**
 * 是否显示起始省略号
 * @returns {boolean} 当第一个显示的页码大于1时显示省略号
 */
const showStartEllipsis = computed(() => {
  return visiblePages.value[0] > 1
})
```

### 事件处理注释

```javascript
/**
 * 处理快速跳转
 * 验证输入的页码并执行跳转
 */
const handleQuickJump = () => {
  const page = parseInt(jumpPage.value)

  // 验证页码有效性和范围
  if (
    page &&
    page >= 1 &&
    page <= props.totalPages &&
    page !== props.currentPage
  ) {
    handlePageChange(page)
  } else {
    // 重置为当前页
    jumpPage.value = props.currentPage
  }
}
```

### 响应式数据注释

```javascript
/** 快速跳转输入的页码 */
const jumpPage = ref(props.currentPage)

/** 屏幕宽度 */
const screenWidth = ref(0)
```

## 🔍 代码审查要点

### 创建新组件时

- [ ] 检查所有 props 是否有注释
- [ ] 检查所有 events 是否有注释
- [ ] 检查所有 methods 是否有注释
- [ ] 检查所有计算属性是否有注释
- [ ] 检查响应式数据是否有注释（如果用途不明确）

### 修改现有组件时

- [ ] 更新相关注释以反映代码变化
- [ ] 确保新添加的功能有完整注释
- [ ] 检查注释是否仍然准确

### 代码审查时

- [ ] 重点关注注释的完整性
- [ ] 检查注释的准确性
- [ ] 确保注释格式符合规范
- [ ] 验证使用示例是否正确

## 📚 参考资源

- [JSDoc 官方文档](https://jsdoc.app/)
- [Vue 3 组件文档](https://vuejs.org/guide/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- 项目中的 `CommonPagination.vue` 和 `useScreenSize.ts` 作为注释标准示例
