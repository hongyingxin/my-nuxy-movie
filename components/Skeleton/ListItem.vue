<!--
  媒体列表项骨架屏组件
  用于在数据加载时显示媒体列表项的轮廓
-->
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse"
  >
    <!-- 卡片内容布局 - 左侧海报，右侧信息 -->
    <div class="flex space-x-4">
      <!-- 海报图片占位符 -->
      <div
        class="w-16 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg flex-shrink-0"
      />

      <!-- 媒体信息区域占位符 -->
      <div class="flex-1">
        <!-- 标题占位符 -->
        <div class="bg-gray-300 dark:bg-gray-600 h-5 rounded w-3/4 mb-2" />

        <!-- 简介占位符 - 2行 -->
        <div class="space-y-1 mb-2">
          <div class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-full" />
          <div class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-2/3" />
        </div>

        <!-- 元信息占位符 -->
        <div class="flex items-center space-x-4">
          <div class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-12" />
          <div class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-16" />
          <div
            v-if="isMovie"
            class="bg-gray-300 dark:bg-gray-600 h-3 rounded w-20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Props 定义
  defineProps({
    // 是否为电影类型 - 用于显示不同的信息（如时长）
    isMovie: {
      type: Boolean,
      default: true,
    },
  })
</script>
