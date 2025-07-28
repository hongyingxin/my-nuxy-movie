<!--
  视频网格骨架屏组件
  用于在视频数据加载时显示视频网格的轮廓
-->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="n in count"
      :key="n"
      class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse"
    >
      <!-- 视频缩略图占位符 -->
      <div class="aspect-video bg-gray-300 dark:bg-gray-600 relative">
        <!-- 播放按钮占位符 -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-gray-400 dark:bg-gray-500 rounded-full p-4">
            <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded" />
          </div>
        </div>
        <!-- 视频时长占位符 -->
        <div
          class="absolute bottom-2 right-2 bg-gray-400 dark:bg-gray-500 rounded px-2 py-1"
        >
          <div class="w-8 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>

      <!-- 视频信息占位符 -->
      <div class="p-4 space-y-3">
        <!-- 标题占位符 -->
        <div class="space-y-2">
          <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-3/4" />
          <div class="bg-gray-300 dark:bg-gray-600 h-4 rounded w-1/2" />
        </div>

        <!-- 视频类型和日期占位符 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded" />
            <div class="bg-gray-300 dark:bg-gray-600 h-3 w-16 rounded" />
          </div>
          <div class="bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Props 定义
  interface Props {
    /** 骨架卡片数量 */
    count?: number
  }

  withDefaults(defineProps<Props>(), {
    count: 6,
  })
</script>
