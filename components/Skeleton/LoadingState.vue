<!--
  简单加载状态组件
  用于详情页等复杂页面的加载状态显示
-->
<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"
      />
      <p class="text-gray-600 dark:text-gray-400">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    message: {
      type: String,
      default: '加载中...',
    },
  })
</script>
