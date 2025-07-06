<!-- 
  列表骨架屏组件
  用于在数据加载时显示列表布局的内容轮廓
-->
<template>
  <div class="space-y-4">
    <div 
      v-for="n in count" 
      :key="n"
      class="animate-pulse"
    >
      <!-- 演员列表项 -->
      <div v-if="variant === 'actor'" class="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <!-- 头像占位符 -->
        <div class="flex-shrink-0">
          <div class="w-16 h-16 bg-gray-300 rounded-lg"></div>
        </div>
        <!-- 内容占位符 -->
        <div class="ml-4 flex-1">
          <div class="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
          <div class="bg-gray-300 h-3 rounded w-1/2"></div>
        </div>
        <!-- 额外信息占位符 -->
        <div class="text-sm">
          <div class="bg-gray-300 h-3 w-16 rounded"></div>
        </div>
      </div>

      <!-- 评论列表项 -->
      <div v-else-if="variant === 'comment'" class="bg-white rounded-lg shadow-sm p-4">
        <!-- 用户信息占位符 -->
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <div class="bg-gray-300 h-4 rounded w-24"></div>
          <div class="ml-auto bg-gray-300 h-3 rounded w-16"></div>
        </div>
        <!-- 评论内容占位符 -->
        <div class="space-y-2">
          <div class="bg-gray-300 h-3 rounded w-full"></div>
          <div class="bg-gray-300 h-3 rounded w-3/4"></div>
          <div class="bg-gray-300 h-3 rounded w-1/2"></div>
        </div>
      </div>

      <!-- 通用列表项 -->
      <div v-else class="bg-white rounded-lg shadow-sm p-4">
        <div class="space-y-2">
          <div class="bg-gray-300 h-4 rounded w-3/4"></div>
          <div class="bg-gray-300 h-3 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props 定义
const props = defineProps({
  // 列表项数量
  count: {
    type: Number,
    default: 10
  },
  // 列表项变体类型
  variant: {
    type: String,
    default: 'actor',
    validator: (value) => ['actor', 'comment', 'review'].includes(value)
  }
})
</script> 